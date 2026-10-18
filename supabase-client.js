/* Optional, dependency-free Supabase Auth + PostgREST client for this prototype. */
(function attachSupabaseClient(root) {
  "use strict";

  const SESSION_KEY = "cheer-coach-ai.supabase-session.v1";

  class SupabaseRequestError extends Error {
    constructor(message, status, code = "") {
      super(message);
      this.name = "SupabaseRequestError";
      this.status = status;
      this.code = code;
    }
  }

  class SupabaseSyncClient {
    constructor(config, options = {}) {
      const url = String(config?.url || "").trim().replace(/\/$/, "");
      const publishableKey = String(config?.publishableKey || "").trim();
      if (!url || !publishableKey) throw new Error("Chybí URL projektu nebo veřejný publishable klíč.");
      const parsed = new URL(url);
      if (parsed.protocol !== "https:" && parsed.hostname !== "localhost" && parsed.hostname !== "127.0.0.1") {
        throw new Error("Adresa Supabase musí používat HTTPS.");
      }
      this.url = url;
      this.publishableKey = publishableKey;
      this.fetch = options.fetch || root.fetch.bind(root);
      this.storage = options.storage || root.sessionStorage;
      this.session = this.readSession();
      this.refreshing = null;
    }

    readSession() {
      try {
        const value = JSON.parse(this.storage?.getItem(SESSION_KEY) || "null");
        return value?.access_token && value?.refresh_token && value?.user?.id ? value : null;
      } catch {
        return null;
      }
    }

    writeSession(session) {
      const expiry = Number(session.expires_at);
      const safeSession = {
        access_token: session.access_token,
        refresh_token: session.refresh_token,
        expires_at: expiry ? (expiry < 1_000_000_000_000 ? expiry * 1000 : expiry) : (Date.now() + (Number(session.expires_in) || 3600) * 1000),
        user: { id: session.user.id, email: session.user.email || "" }
      };
      this.session = safeSession;
      this.storage?.setItem(SESSION_KEY, JSON.stringify(safeSession));
      return safeSession.user;
    }

    clearSession() {
      this.session = null;
      this.storage?.removeItem(SESSION_KEY);
    }

    async parseResponse(response) {
      const body = await response.text();
      let data = null;
      if (body) {
        try { data = JSON.parse(body); } catch { data = null; }
      }
      if (!response.ok) {
        const message = data?.msg || data?.message || data?.error_description || data?.error || `HTTP ${response.status}`;
        throw new SupabaseRequestError(String(message), response.status, String(data?.code || ""));
      }
      return data;
    }

    async authRequest(path, payload, bearer = "") {
      const headers = { apikey: this.publishableKey, "Content-Type": "application/json" };
      if (bearer) headers.Authorization = `Bearer ${bearer}`;
      const response = await this.fetch(`${this.url}/auth/v1/${path}`, {
        method: "POST", headers, body: JSON.stringify(payload || {})
      });
      return this.parseResponse(response);
    }

    async login(email, password) {
      const normalizedEmail = String(email || "").trim();
      if (!normalizedEmail || !String(password || "")) throw new Error("Zadej e-mail a heslo.");
      const session = await this.authRequest("token?grant_type=password", { email: normalizedEmail, password: String(password) });
      if (!session?.access_token || !session?.refresh_token || !session?.user?.id) throw new Error("Supabase nevrátil platnou přihlašovací relaci.");
      return this.writeSession(session);
    }

    async refreshSession() {
      if (!this.session?.refresh_token) throw new Error("Přihlas se k synchronizaci.");
      if (this.refreshing) return this.refreshing;
      this.refreshing = this.authRequest("token?grant_type=refresh_token", { refresh_token: this.session.refresh_token })
        .then(session => this.writeSession(session))
        .catch(error => { this.clearSession(); throw error; })
        .finally(() => { this.refreshing = null; });
      await this.refreshing;
      return this.session;
    }

    async ensureSession() {
      if (!this.session) throw new Error("Nejdřív se přihlas.");
      if (this.session.expires_at < Date.now() + 30_000) await this.refreshSession();
      return this.session;
    }

    async getUser() {
      const session = await this.ensureSession();
      const response = await this.fetch(`${this.url}/auth/v1/user`, {
        headers: { apikey: this.publishableKey, Authorization: `Bearer ${session.access_token}` }
      });
      let user;
      try { user = await this.parseResponse(response); }
      catch (error) { if (error.status === 401) this.clearSession(); throw error; }
      if (!user?.id) throw new Error("Přihlášení se nepodařilo ověřit.");
      this.session.user = { id: user.id, email: user.email || "" };
      this.storage?.setItem(SESSION_KEY, JSON.stringify(this.session));
      return this.session.user;
    }

    async authorizedFetch(path, init = {}) {
      let session = await this.ensureSession();
      const headers = { apikey: this.publishableKey, Authorization: `Bearer ${session.access_token}`, ...(init.headers || {}) };
      let response = await this.fetch(`${this.url}${path}`, { ...init, headers });
      if (response.status === 401) {
        await this.refreshSession();
        session = await this.ensureSession();
        response = await this.fetch(`${this.url}${path}`, { ...init, headers: { ...headers, Authorization: `Bearer ${session.access_token}` } });
      }
      if (response.status === 401) this.clearSession();
      return this.parseResponse(response);
    }

    async readState() {
      const user = await this.getUser();
      const query = new URLSearchParams({ select: "payload,revision,updated_at", owner_id: `eq.${user.id}` });
      const rows = await this.authorizedFetch(`/rest/v1/coach_state?${query.toString()}`);
      if (!Array.isArray(rows)) throw new Error("Odpověď databáze nemá očekávaný formát.");
      return rows[0] || null;
    }

    async createState(payload) {
      const user = await this.getUser();
      const rows = await this.authorizedFetch("/rest/v1/coach_state", {
        method: "POST",
        headers: { "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({ owner_id: user.id, payload, revision: 1 })
      });
      if (!Array.isArray(rows) || !rows[0]) throw new Error("Nový cloudový záznam nebyl uložen.");
      return rows[0];
    }

    async updateState(payload, expectedRevision) {
      const user = await this.getUser();
      const query = new URLSearchParams({ owner_id: `eq.${user.id}`, revision: `eq.${expectedRevision}` });
      const rows = await this.authorizedFetch(`/rest/v1/coach_state?${query.toString()}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Prefer: "return=representation" },
        body: JSON.stringify({ payload, revision: expectedRevision + 1, updated_at: new Date().toISOString() })
      });
      if (!Array.isArray(rows) || !rows[0]) {
        throw new SupabaseRequestError("Data na serveru mezitím změnilo jiné zařízení. Stáhni aktuální verzi a rozhodni se znovu.", 409, "revision_conflict");
      }
      return rows[0];
    }

    async logout() {
      try {
        if (this.session?.access_token) await this.authRequest("logout", {}, this.session.access_token);
      } finally {
        this.clearSession();
      }
    }
  }

  root.CheerSupabase = Object.freeze({ SupabaseSyncClient, SupabaseRequestError, SESSION_KEY });
})(typeof window !== "undefined" ? window : globalThis);
