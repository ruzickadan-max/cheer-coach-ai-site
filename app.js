(() => {
  const KEY = "cheer-coach-ai.v1";
  const state = loadState();
  let cards = [...(window.CHEER_CARDS || []), ...state.customCards];
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escapeHtml = value => String(value ?? "").replace(/[&<>"']/g, char => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char]));
  const formatDate = (iso, options = { day: "numeric", month: "short", year: "numeric" }) => {
    if (!iso) return "—";
    const date = new Date(`${iso}T12:00:00`);
    return Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("cs-CZ", options).format(date);
  };
  const todayIso = () => new Date().toLocaleDateString("en-CA");
  function safeHttpsUrl(value) {
    try { const url = new URL(value); return url.protocol === "https:" ? url.href : ""; } catch { return ""; }
  }

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        plans: Array.isArray(stored.plans) ? stored.plans : [],
        customCards: Array.isArray(stored.customCards) ? stored.customCards : [],
        mediaItems: Array.isArray(stored.mediaItems) ? stored.mediaItems : [],
        groups: Array.isArray(stored.groups) ? stored.groups : [],
        routines: Array.isArray(stored.routines) ? stored.routines : []
      };
    } catch {
      return { plans: [], customCards: [], mediaItems: [], groups: [], routines: [] };
    }
  }
  function saveState() {
    localStorage.setItem(KEY, JSON.stringify(state));
    updateCounts();
  }
  function toast(message) {
    const el = $("#toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
  }
  function updateCounts() {
    $("#stat-plans").textContent = state.plans.length;
    $("#nav-card-count").textContent = cards.length;
    $("#library-total").textContent = cards.length;
    $("#plans-count").textContent = state.plans.length;
    $("#stat-cards").textContent = String(cards.length).padStart(2, "0");
    const settingsCount = $("#settings-plan-count");
    if (settingsCount) settingsCount.textContent = state.plans.length;
    const customCount = $("#settings-card-count");
    if (customCount) customCount.textContent = state.customCards.length;
    const groupsCount = $("#stat-groups");
    if (groupsCount) groupsCount.textContent = state.groups.length;
  }
  function showView(name) {
    $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));
    $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === name));
    $$(".mobile-tabbar [data-view]").forEach(button => button.classList.toggle("active", button.dataset.view === name));
    const labels = { home: "Přehled", library: "Prvky a drily", media: "Videa a odkazy", groups: "Skupiny stuntu", planner: "Tréninky", routines: "Tvorba sestavy", rules: "Pravidla & zdroje", settings: "Nastavení" };
    $("#crumb-current").textContent = labels[name] || labels.home;
    $(".sidebar").classList.remove("open");
    if (name === "planner") renderPlans();
    if (name === "media") renderMedia();
    if (name === "groups") renderGroups();
    if (name === "routines") renderRoutines();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function renderLibrary() {
    const term = $("#search-input").value.trim().toLocaleLowerCase("cs");
    const area = $("#area-filter").value;
    const level = $("#level-filter").value;
    const found = cards.filter(card => {
      const matchesTerm = `${card.title} ${card.variant} ${card.disciplineLabel}`.toLocaleLowerCase("cs").includes(term);
      const matchesArea = area === "all" || card.discipline === area;
      const matchesLevel = level === "all" || card.levels.includes(level);
      return matchesTerm && matchesArea && matchesLevel;
    });
    $("#library-grid").innerHTML = found.length ? found.map(card => `
      <article class="card-tile" data-open-card="${escapeHtml(card.id)}" tabindex="0" role="button" aria-label="Otevřít kartu ${escapeHtml(card.title)}">
        <div class="skill-card-meta"><span class="area-pill">${escapeHtml(card.disciplineLabel)}</span><span class="verify-pill"><span></span>${escapeHtml(card.statusLabel)}</span></div>
        <h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.variant)}</p>
        <div class="skill-card-bottom"><span>RÁMEC</span><strong>${escapeHtml(card.levelLabel || card.levels.join(" · ") || "Úroveň ověřit")}</strong><span class="skill-card-arrow" aria-hidden="true">→</span></div>
      </article>`).join("") : `<div class="no-results">Žádná karta neodpovídá hledání.<br><button class="text-button" id="empty-reset">Vymazat filtry</button></div>`;
  }
  function listMarkup(items, ordered = false) {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
  }
  function mediaPreviewMarkup(item, compact = false) {
    const url = safeHttpsUrl(item.url);
    if (!url) return "";
    let parsed;
    try { parsed = new URL(url); } catch { return ""; }
    const host = parsed.hostname.toLowerCase().replace(/^www\./, "");
    let embed = "";
    let platform = "";
    let video = false;
    if (host === "youtu.be" || ["youtube.com", "m.youtube.com", "youtube-nocookie.com"].includes(host)) {
      const id = host === "youtu.be" ? parsed.pathname.split("/").filter(Boolean)[0] : parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:shorts|embed|live)\/([^/?]+)/)?.[1];
      if (id && /^[\w-]{11}$/.test(id)) { embed = `https://www.youtube.com/embed/${id}?playsinline=1&controls=1&rel=0`; platform = "YouTube"; }
    } else if (["vimeo.com", "player.vimeo.com"].includes(host)) {
      const id = parsed.pathname.match(/\/(?:video\/)?(\d+)/)?.[1];
      if (id) { embed = `https://player.vimeo.com/video/${id}`; platform = "Vimeo"; }
    } else if (["tiktok.com", "m.tiktok.com"].includes(host)) {
      const id = parsed.pathname.match(/\/video\/(\d+)/)?.[1];
      if (id) { embed = `https://www.tiktok.com/player/v1/${id}?controls=1`; platform = "TikTok"; }
    } else if (["facebook.com", "m.facebook.com", "fb.watch"].includes(host)) {
      const path = parsed.pathname.toLowerCase();
      const hasVideo = /\/(?:videos?|reel|reels|watch|share\/(?:r|v))(?:\/|$)/.test(path) || path === "/video.php" || parsed.searchParams.has("v");
      if (hasVideo || /\/posts?\/|\/permalink\.php|\/share\/p\//.test(path)) {
        const permalink = new URL(url);
        if (permalink.hostname === "m.facebook.com") permalink.hostname = "www.facebook.com";
        const endpoint = hasVideo ? "video" : "post";
        embed = `https://www.facebook.com/plugins/${endpoint}.php?href=${encodeURIComponent(permalink.href)}&show_text=0&width=560`;
        platform = "Facebook";
      }
    } else if (["instagram.com", "m.instagram.com"].includes(host)) {
      const match = parsed.pathname.match(/^\/(p|reel|reels|tv)\/([\w-]+)\/?$/i);
      if (match) {
        const kind = match[1].toLowerCase() === "reels" ? "reel" : match[1].toLowerCase();
        const permalink = `https://www.instagram.com/${kind}/${match[2]}/`;
        platform = "Instagram";
        return `<div class="instagram-media-card${compact ? " compact" : ""}"><div class="instagram-source-label"><span class="instagram-glyph" aria-hidden="true">◎</span><span>Instagram <small>· vložený přehrávač</small></span></div><div class="media-preview instagram-preview${compact ? " compact" : ""}"><blockquote class="instagram-media" data-instgrm-permalink="${escapeHtml(permalink)}" data-instgrm-version="14"><a href="${escapeHtml(permalink)}" target="_blank" rel="noopener noreferrer">Zobrazit příspěvek na Instagramu</a></blockquote></div><a class="instagram-play-link" href="${escapeHtml(permalink)}" target="_blank" rel="noopener noreferrer"><span aria-hidden="true">↗</span> Otevřít příspěvek na Instagramu</a></div>`;
      }
    }
    if (!embed && /\.(mp4|webm|mov|m4v)(?:$|\?)/i.test(`${parsed.pathname}${parsed.search}`)) video = true;
    if (embed) return `<div class="media-preview${compact ? " compact" : ""}${platform === "Facebook" ? " facebook-preview" : ""}"><iframe src="${escapeHtml(embed)}" title="Náhled: ${escapeHtml(item.title)} (${platform})" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe></div>`;
    if (video) return `<div class="media-preview${compact ? " compact" : ""}"><video controls playsinline preload="metadata" aria-label="Přehrát: ${escapeHtml(item.title)}"><source src="${escapeHtml(url)}">Přehrávání tohoto formátu tento prohlížeč nepodporuje.</video></div>`;
    return `<a class="media-preview-fallback" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer"><span>↗</span><strong>Náhled není pro tento zdroj dostupný</strong><small>Otevřít na původním webu</small></a>`;
  }
  function cardMediaMarkup(card, drillIndex = null) {
    const linked = state.mediaItems.filter(item => item.cardId === card.id && (drillIndex === null ? item.drillIndex === null || item.drillIndex === undefined || item.drillIndex === "" : Number(item.drillIndex) === drillIndex));
    if (!linked.length) return "";
    return `<div class="linked-media-list">${linked.map(item => `<article class="linked-media"><h4>${escapeHtml(item.title)}</h4>${mediaPreviewMarkup(item, true)}${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}<a href="${escapeHtml(safeHttpsUrl(item.url))}" target="_blank" rel="noopener noreferrer">Otevřít původní zdroj ↗</a></article>`).join("")}</div>`;
  }
  function processInstagramEmbeds() {
    if (!document.querySelector("blockquote.instagram-media")) return;
    if (window.instgrm?.Embeds?.process) {
      window.instgrm.Embeds.process();
      return;
    }
    let script = document.getElementById("instagram-embed-script");
    if (script) return;
    script = document.createElement("script");
    script.id = "instagram-embed-script";
    script.async = true;
    script.src = "https://www.instagram.com/embed.js";
    script.onload = () => window.instgrm?.Embeds?.process();
    document.head.append(script);
  }
  function openCard(id) {
    const card = cards.find(item => item.id === id);
    if (!card) return;
    const isCustom = state.customCards.some(item => item.id === card.id);
    $("#card-dialog-content").innerHTML = `
      <div class="detail-head"><div><div class="eyebrow">${escapeHtml(card.disciplineLabel.toUpperCase())} · ${escapeHtml(card.levelLabel || card.levels.join(" / "))}</div><h2>${escapeHtml(card.title)}</h2><div class="detail-sub">${escapeHtml(card.variant)}</div></div><div class="detail-actions">${isCustom ? `<button class="button button-outline button-small" data-edit-card="${escapeHtml(card.id)}">Upravit</button><button class="button button-danger button-small" data-delete-card="${escapeHtml(card.id)}">Smazat</button>` : ""}<button class="detail-close" data-close="card-dialog" aria-label="Zavřít">×</button></div></div>
      <div class="detail-status"><strong>${escapeHtml(card.statusLabel)}.</strong> ${escapeHtml(card.use)} Legalitu je nutné ověřit pro konkrétní soutěž, věkovou skupinu a sezonu.</div>
      <div class="detail-grid">
        <section class="detail-section full"><h3>Cíl dovednosti</h3><p>${escapeHtml(card.goal)}</p></section>
        <section class="detail-section"><h3>Role</h3>${listMarkup(card.roles)}</section>
        <section class="detail-section"><h3>Předpoklady</h3>${listMarkup(card.prerequisites)}</section>
        <section class="detail-section"><h3>Prostor</h3><p>${escapeHtml(card.space)}</p></section>
        <section class="detail-section"><h3>Vybavení</h3><p>${escapeHtml(card.equipment)}</p></section>
        <section class="detail-section full"><h3>Progrese</h3>${listMarkup(card.progression, true)}<p>${escapeHtml(card.safetyNote)}</p></section>
        ${card.drills.map((drill, index) => `<section class="detail-section full drill-detail"><h3>${escapeHtml(drill.title)}</h3><p>${escapeHtml(drill.body)}</p>${cardMediaMarkup(card, index)}</section>`).join("")}
        ${cardMediaMarkup(card) ? `<section class="detail-section full"><h3>Videa k prvku</h3>${cardMediaMarkup(card)}</section>` : ""}
        <section class="detail-section"><h3>Kritéria připravenosti</h3>${listMarkup(card.readiness)}</section>
        <section class="detail-section"><h3>Koučovací body</h3>${listMarkup(card.coaching)}</section>
        <section class="detail-section danger full"><h3>Stop-kritéria · zastav při</h3>${listMarkup(card.stopCriteria)}</section>
        <section class="detail-section"><h3>Regrese</h3><p>${escapeHtml(card.regression)}</p></section>
        <section class="detail-section safe"><h3>Bezpečný sestup</h3><p>${escapeHtml(card.safeExit)}</p></section>
        <section class="detail-section detail-sources full"><h3>Zdroje a pravidla</h3>${card.sources.map(source => source.url ? `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} ↗ <small>· ${escapeHtml(source.season)} · kontrola ${escapeHtml(formatDate(source.checked))}</small></a>` : `<span class="detail-source-text">${escapeHtml(source.title)} <small>· ${escapeHtml(source.season)} · kontrola ${escapeHtml(formatDate(source.checked))}</small></span>`).join("")}<p>${escapeHtml(card.rulesNote)}</p><div class="detail-date">Obsah karty zkontrolován: ${escapeHtml(formatDate(card.updatedAt))}</div></section>
      </div>`;
    $("#card-dialog").showModal();
    processInstagramEmbeds();
  }
  function sortPlans() {
    return [...state.plans].sort((a, b) => (a.date || "").localeCompare(b.date || ""));
  }
  function planDuration(plan) {
    return Number(plan.duration) || (plan.blocks || []).reduce((total, block) => total + (Number(block.minutes) || 0), 0);
  }
  function renderPlanCard(plan) {
    const date = new Date(`${plan.date}T12:00:00`);
    const day = Number.isNaN(date.getTime()) ? "—" : new Intl.DateTimeFormat("cs-CZ", { day: "2-digit" }).format(date);
    const month = Number.isNaN(date.getTime()) ? "" : new Intl.DateTimeFormat("cs-CZ", { month: "short" }).format(date).replace(".", "");
    const count = (plan.blocks || []).length;
    return `<article class="plan-card"><div class="plan-date"><b>${escapeHtml(day)}</b><small>${escapeHtml(month)}</small></div><div class="plan-main"><h3>${escapeHtml(plan.name)}</h3><p>${escapeHtml(planDuration(plan))} min · ${count} ${count === 1 ? "blok" : count >= 2 && count <= 4 ? "bloky" : "bloků"} · ${escapeHtml(formatDate(plan.date))}</p></div><div class="plan-actions"><button class="plan-action" data-plan-action="export" data-id="${escapeHtml(plan.id)}" aria-label="Exportovat plán" title="Exportovat">⇩</button><button class="plan-action" data-plan-action="edit" data-id="${escapeHtml(plan.id)}" aria-label="Upravit plán" title="Upravit">✎</button><button class="plan-action" data-plan-action="delete" data-id="${escapeHtml(plan.id)}" aria-label="Smazat plán" title="Smazat">×</button></div></article>`;
  }
  function renderPlans() {
    const plans = sortPlans();
    $("#plans-list").innerHTML = plans.length ? plans.map(renderPlanCard).join("") : `<div class="empty-state"><div><div class="empty-symbol">✳</div>Zatím tu není žádný trénink.<br>Vytvoř si plán a začni skládat bloky.</div></div>`;
    const nextPlans = plans.filter(plan => plan.date >= todayIso()).slice(0, 3);
    $("#upcoming-list").innerHTML = nextPlans.length ? nextPlans.map(plan => {
      const date = new Date(`${plan.date}T12:00:00`);
      const day = new Intl.DateTimeFormat("cs-CZ", { day: "numeric" }).format(date);
      const month = new Intl.DateTimeFormat("cs-CZ", { month: "short" }).format(date).replace(".", "");
      const count = (plan.blocks || []).length;
      const blockWord = count === 1 ? "blok" : count >= 2 && count <= 4 ? "bloky" : "bloků";
      return `<button type="button" class="upcoming-item" data-edit-upcoming="${escapeHtml(plan.id)}" aria-label="Otevřít a upravit plán ${escapeHtml(plan.name)}"><span class="date-box"><b>${escapeHtml(day)}</b><small>${escapeHtml(month)}</small></span><span class="upcoming-copy"><strong>${escapeHtml(plan.name)}</strong><small>${escapeHtml(planDuration(plan))} min · ${count} ${blockWord}</small></span><span class="item-arrow">→</span></button>`;
    }).join("") : `<div class="empty-state"><div><div class="empty-symbol">✳</div>Zatím nemáš uložený žádný nadcházející trénink.<br>Vytvoř plán a přidej první blok.</div></div>`;
    updateCounts();
  }
  function renderMedia() {
    populateMediaCardOptions();
    const filter = $("#media-filter").value;
    const items = [...state.mediaItems].filter(item => safeHttpsUrl(item.url) && (filter === "all" || item.area === filter)).sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
    $("#media-count").textContent = state.mediaItems.length;
    $("#media-list").innerHTML = items.length ? items.map(item => { const url = safeHttpsUrl(item.url); const linkedCard = cards.find(card => card.id === item.cardId); const drill = linkedCard && item.drillIndex !== null && item.drillIndex !== undefined && item.drillIndex !== "" ? linkedCard.drills?.[Number(item.drillIndex)] : null; return `<article class="workspace-card media-card"><div class="workspace-card-top"><span class="area-pill">${item.area === "stunt" ? "Group stunt" : "Akrobacie"}</span><button class="plan-action" data-remove-media="${escapeHtml(item.id)}" aria-label="Odebrat odkaz">×</button></div>${mediaPreviewMarkup(item)}<h3>${escapeHtml(item.title)}</h3><p class="workspace-meta">${escapeHtml(linkedCard ? `${linkedCard.title}${drill ? ` · ${drill.title}` : ""}` : item.topic || "Bez přiřazeného prvku")} · přidáno ${escapeHtml(formatDate((item.createdAt || "").slice(0, 10)))}</p>${item.note ? `<p>${escapeHtml(item.note)}</p>` : ""}<a class="workspace-link" href="${escapeHtml(url)}" target="_blank" rel="noopener noreferrer">Otevřít zdroj ↗<small>${escapeHtml(url)}</small></a></article>`; }).join("") : `<div class="empty-state"><div><div class="empty-symbol">▷</div>Zatím tu nejsou uložené žádné odkazy.<br>Přidej první materiál ze zdroje, který smíš používat.</div></div>`;
    processInstagramEmbeds();
  }
  function renderMediaUrlPreview() {
    const panel = $("#media-live-preview");
    const container = $("#media-live-preview-content");
    const url = safeHttpsUrl($("#media-url").value.trim());
    if (!url) {
      panel.hidden = true;
      container.innerHTML = "";
      return;
    }
    const title = $("#media-title").value.trim() || "Video";
    panel.hidden = false;
    container.innerHTML = mediaPreviewMarkup({ url, title });
    processInstagramEmbeds();
  }
  function populateMediaCardOptions(selected = "") {
    const select = $("#media-card");
    const drillSelect = $("#media-drill");
    if (!select || !drillSelect) return;
    select.innerHTML = `<option value="">Bez přiřazení</option>${cards.map(card => `<option value="${escapeHtml(card.id)}">${escapeHtml(card.title)}</option>`).join("")}`;
    select.value = selected;
    const card = cards.find(item => item.id === selected);
    drillSelect.innerHTML = card ? `<option value="">Celý prvek / bez konkrétního drilu</option>${(card.drills || []).map((drill, index) => `<option value="${index}">${escapeHtml(drill.title)}</option>`).join("")}` : `<option value="">Nejprve vyber prvek</option>`;
    drillSelect.disabled = !card;
  }
  function renderGroups() {
    $("#group-count").textContent = state.groups.length;
    $("#groups-list").innerHTML = state.groups.length ? state.groups.map(group => `<article class="workspace-card"><div class="workspace-card-top"><span class="area-pill">Trenérská evidence</span><button class="plan-action" data-remove-group="${escapeHtml(group.id)}" aria-label="Odebrat skupinu">×</button></div><h3>${escapeHtml(group.name)}</h3>${group.roles?.length ? `<div class="role-tags">${group.roles.map(role => `<span>${escapeHtml(role)}</span>`).join("")}</div>` : `<p class="workspace-meta">Role zatím nejsou zapsané.</p>`}${group.note ? `<p>${escapeHtml(group.note)}</p>` : ""}<p class="workspace-meta">Vytvořeno ${escapeHtml(formatDate((group.createdAt || "").slice(0, 10)))}</p></article>`).join("") : `<div class="empty-state"><div><div class="empty-symbol">◎</div>Zatím neeviduješ žádnou stunt group.<br>Začni neidentifikujícím označením a rolemi.</div></div>`;
  }
  function renderRoutines() {
    $("#routine-count").textContent = state.routines.length;
    $("#routines-list").innerHTML = state.routines.length ? state.routines.map(routine => `<article class="workspace-card routine-card"><div class="workspace-card-top"><span class="area-pill">Koncept · ověřuje trenér</span><button class="plan-action" data-remove-routine="${escapeHtml(routine.id)}" aria-label="Odebrat osnovu">×</button></div><h3>${escapeHtml(routine.name)}</h3>${routine.goal ? `<p>${escapeHtml(routine.goal)}</p>` : ""}<ol class="routine-sequence">${routine.blocks.map(block => `<li>${escapeHtml(block)}</li>`).join("")}</ol>${routine.groups ? `<p class="workspace-meta">Skupiny: ${escapeHtml(routine.groups)}</p>` : ""}<p class="workspace-meta">Uloženo ${escapeHtml(formatDate((routine.createdAt || "").slice(0, 10)))}</p></article>`).join("") : `<div class="empty-state"><div><div class="empty-symbol">▤</div>Zatím tu není žádná osnova sestavy.<br>Přidej bloky v pořadí a dolaď je podle svého plánu.</div></div>`;
  }
  function newId() { return crypto.randomUUID ? crypto.randomUUID() : String(Date.now()); }
  function addBlockRow(block = {}) {
    const row = document.createElement("div");
    row.className = "block-row";
    row.innerHTML = `<input aria-label="Název bloku" placeholder="Např. Rozcvičení" value="${escapeHtml(block.name || "")}" required><input aria-label="Délka v minutách" type="number" min="5" step="5" placeholder="min" value="${escapeHtml(block.minutes ?? "")}" required><button type="button" class="remove-block" aria-label="Odebrat blok">×</button>`;
    row.querySelector(".remove-block").addEventListener("click", () => { row.remove(); showBlockHint(); });
    $("#block-editor").append(row);
    showBlockHint();
  }
  function showBlockHint() {
    const editor = $("#block-editor");
    const hint = $(".block-hint", editor);
    if (!editor.querySelector(".block-row") && !hint) editor.innerHTML = `<div class="block-hint">Zatím žádné bloky. Přidej první část tréninku.</div>`;
    else if (editor.querySelector(".block-row") && hint) hint.remove();
  }
  function openPlanDialog(plan = null) {
    $("#plan-form").reset();
    $("#plan-id").value = plan?.id || "";
    $("#plan-name").value = plan?.name || "";
    $("#plan-date").value = plan?.date || todayIso();
    $("#plan-duration").value = plan?.duration || 90;
    $("#plan-dialog-title").textContent = plan ? "Upravit trénink" : "Nový trénink";
    $("#block-editor").innerHTML = "";
    const blocks = plan?.blocks || [{ name: "Rozcvičení", minutes: 15 }, { name: "Hlavní část", minutes: 60 }, { name: "Cool down", minutes: 15 }];
    blocks.forEach(addBlockRow);
    $("#plan-dialog").showModal();
    setTimeout(() => $("#plan-name").focus(), 50);
  }
  function download(filename, data) {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }
  function exportAll() {
    download(`cheer-coach-ai-data-${todayIso()}.json`, {
      app: "Cheer Coach AI",
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
      plans: state.plans,
      cards,
      customCards: state.customCards,
      mediaItems: state.mediaItems,
      groups: state.groups,
      routines: state.routines
    });
    toast("Export dat je připraven.");
  }
  let pendingImport = null;
  function parseBackup(data) {
    if (!data || data.app !== "Cheer Coach AI" || !Array.isArray(data.plans) || !Array.isArray(data.customCards)) {
      throw new Error("Soubor neodpovídá záloze Cheer Coach AI.");
    }
    const validPlans = data.plans.every(plan => plan && typeof plan === "object" && typeof plan.name === "string" && Array.isArray(plan.blocks));
    const validCards = data.customCards.every(card => card && typeof card === "object" && typeof card.id === "string" && typeof card.title === "string" && Array.isArray(card.levels) && Array.isArray(card.sources));
    if (!validPlans || !validCards) throw new Error("Záloha obsahuje neplatný plán nebo vlastní kartu.");
    if (new Set(data.customCards.map(card => card.id)).size !== data.customCards.length) throw new Error("Záloha obsahuje duplicitní identifikátory karet.");
    const mediaItems = Array.isArray(data.mediaItems) ? data.mediaItems : [];
    const groups = Array.isArray(data.groups) ? data.groups : [];
    const routines = Array.isArray(data.routines) ? data.routines : [];
    const validMedia = mediaItems.every(item => item && typeof item.id === "string" && typeof item.title === "string" && typeof item.url === "string" && safeHttpsUrl(item.url));
    const validGroups = groups.every(group => group && typeof group.id === "string" && typeof group.name === "string" && Array.isArray(group.roles));
    const validRoutines = routines.every(routine => routine && typeof routine.id === "string" && typeof routine.name === "string" && Array.isArray(routine.blocks));
    if (!validMedia || !validGroups || !validRoutines) throw new Error("Záloha obsahuje neplatný odkaz, skupinu nebo osnovu sestavy.");
    return { plans: data.plans, customCards: data.customCards, mediaItems, groups, routines };
  }
  function readBackup(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        pendingImport = parseBackup(JSON.parse(String(reader.result)));
        const plans = pendingImport.plans.length;
        const customCards = pendingImport.customCards.length;
        $("#import-summary").textContent = `Záloha obsahuje ${plans} plánů, ${customCards} vlastních karet, ${pendingImport.mediaItems.length} mediálních odkazů, ${pendingImport.groups.length} skupin a ${pendingImport.routines.length} osnov sestav. Nahradí aktuální plány a vlastní karty i ostatní uložená data; výchozí knihovna zůstane zachovaná.`;
        $("#import-data-dialog").showModal();
      } catch (error) {
        pendingImport = null;
        toast(error instanceof SyntaxError ? "Soubor není platný JSON." : error.message);
      }
      $("#settings-import").value = "";
    };
    reader.onerror = () => toast("Soubor se nepodařilo přečíst.");
    reader.readAsText(file);
  }

  function splitLines(value) {
    return value.split("\n").map(line => line.trim()).filter(Boolean);
  }
  function openCardEditor(card = null) {
    const form = $("#card-form");
    form.reset();
    $("#card-id").value = card?.id || "";
    $("#card-form-title").textContent = card ? "Upravit vlastní kartu" : "Nová vlastní karta";
    $("#card-title").value = card?.title || "";
    $("#card-variant").value = card?.variant || "";
    $("#card-discipline").value = card?.discipline || "tumbling";
    $$('input[name="card-level"]', form).forEach(input => { input.checked = (card?.levels || []).includes(input.value); });
    $("#card-goal").value = card?.goal || "";
    $("#card-roles").value = (card?.roles || []).join("\n");
    $("#card-prerequisites").value = (card?.prerequisites || []).join("\n");
    $("#card-space").value = card?.space || "";
    $("#card-equipment").value = card?.equipment || "";
    $("#card-progression").value = (card?.progression || []).join("\n");
    $("#card-drills").value = (card?.drills || []).map(drill => `${drill.title} | ${drill.body}`).join("\n");
    $("#card-readiness").value = (card?.readiness || []).join("\n");
    $("#card-coaching").value = (card?.coaching || []).join("\n");
    $("#card-stop-criteria").value = (card?.stopCriteria || []).join("\n");
    $("#card-regression").value = card?.regression || "";
    $("#card-safe-exit").value = card?.safeExit || "";
    $("#card-source-title").value = card?.sources?.[0]?.title || "";
    $("#card-source-url").value = card?.sources?.[0]?.url || "";
    $("#card-source-season").value = card?.sources?.[0]?.season || "";
    $("#card-editor-dialog").showModal();
  }
  function saveCustomCard(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const id = $("#card-id").value;
    const title = $("#card-title").value.trim();
    const sourceUrl = $("#card-source-url").value.trim();
    if (sourceUrl && !/^https:\/\//i.test(sourceUrl)) {
      toast("Odkaz na zdroj musí začínat https://.");
      return;
    }
    const existing = state.customCards.find(card => card.id === id);
    const discipline = $("#card-discipline").value;
    const selectedLevels = $$("input[name='card-level']:checked", form).map(input => input.value);
    const sourceTitle = $("#card-source-title").value.trim();
    const sourceSeason = $("#card-source-season").value.trim();
    const card = {
      id: id || `custom-${crypto.randomUUID ? crypto.randomUUID() : Date.now()}`,
      title,
      variant: $("#card-variant").value.trim(),
      discipline,
      disciplineLabel: discipline === "stunt" ? "Group stunt" : "Akrobacie",
      levels: selectedLevels,
      levelLabel: selectedLevels.length ? `${selectedLevels.join(" · ")} · vlastní rámec` : "Úroveň ověřit",
      status: "draft",
      statusLabel: "Vlastní · ověřit",
      use: "Vlastní poznámka trenéra. Obsah ani legalita nebyly aplikací ověřeny.",
      goal: $("#card-goal").value.trim(),
      roles: splitLines($("#card-roles").value),
      prerequisites: splitLines($("#card-prerequisites").value),
      space: $("#card-space").value.trim(),
      equipment: $("#card-equipment").value.trim(),
      progression: splitLines($("#card-progression").value),
      drills: splitLines($("#card-drills").value).map(line => {
        const separator = line.indexOf("|");
        return separator < 0
          ? { title: line, body: "Doplň vlastní popis a před použitím posuď s odpovědným trenérem." }
          : { title: line.slice(0, separator).trim(), body: line.slice(separator + 1).trim() };
      }),
      readiness: splitLines($("#card-readiness").value),
      coaching: splitLines($("#card-coaching").value),
      stopCriteria: splitLines($("#card-stop-criteria").value),
      regression: $("#card-regression").value.trim(),
      safeExit: $("#card-safe-exit").value.trim(),
      safetyNote: "Vlastní obsah aplikace neověřuje. Přímý dohled odpovědného kvalifikovaného trenéra a potřebné spottery jsou nutné. Při bolesti, strachu, ztrátě kontroly nebo nejistotě aktivitu zastav; nepostupuj automaticky k náročnější dovednosti.",
      sources: sourceUrl ? [{ title: sourceTitle || "Vlastní zdroj – ověřit", url: sourceUrl, organization: "Uživatelský zdroj", season: sourceSeason || "Ověřit", note: "Aplikace neověřila obsah, aktuálnost ani použitelnost tohoto zdroje." }] : [],
      rulesNote: "Aplikace nepotvrzuje legalitu ani vhodnou úroveň. Ověř pravidla pro konkrétní soutěž, věkovou skupinu a sezonu v oficiálních dokumentech ČACH/ICU a nech obsah posoudit odpovědným trenérem.",
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (!card.prerequisites.length || !card.progression.length || !card.stopCriteria.length) {
      toast("Doplň alespoň jeden předpoklad, krok progrese a stop-kritérium.");
      return;
    }
    if (existing) state.customCards = state.customCards.map(item => item.id === id ? card : item);
    else state.customCards.push(card);
    cards = [...(window.CHEER_CARDS || []), ...state.customCards];
    saveState();
    renderLibrary();
    $("#card-editor-dialog").close();
    $("#card-dialog").close();
    toast(existing ? "Vlastní karta byla upravena." : "Vlastní karta byla uložena.");
  }

  function initCloudSync() {
    const config = window.CHEER_SUPABASE_CONFIG || {};
    if (!config.url && !config.publishableKey) return;
    const panel = $("#cloud-sync-panel");
    panel.hidden = false;
    const loginForm = $("#cloud-login-form");
    const sessionControls = $("#cloud-session-controls");
    const status = $("#cloud-sync-status");
    let client;
    try {
      client = new window.CheerSupabase.SupabaseSyncClient(config);
    } catch (error) {
      status.textContent = `Konfiguraci cloudu se nepodařilo načíst: ${error.message}`;
      return;
    }

    let currentUser = null;
    function setCloudUser(user) {
      currentUser = user;
      loginForm.hidden = Boolean(user);
      sessionControls.hidden = !user;
      $("#cloud-account-label").textContent = user ? `Přihlášený vlastník: ${user.email || "osobní účet"}` : "";
    }
    function cloudError(error) {
      if (error?.code === "revision_conflict" || error?.status === 409) return "Data na serveru se mezitím změnila. Načti aktuální verzi a zkus znovu.";
      if (error?.code === "23505") return "Záznam právě vytvořilo jiné zařízení. Načti cloudovou verzi a pokračuj z ní.";
      if (error?.status === 401) return "Přihlášení vypršelo nebo nebylo přijato. Přihlas se znovu.";
      if (error?.status === 403 || error?.status === 404 || error?.code === "42501") return "Server odmítl přístup. Zkontroluj databázovou migraci a pravidla RLS.";
      return `Synchronizace se nepodařila: ${error?.message || "neznámá chyba"}`;
    }
    function localPayload() {
      return { schemaVersion: 2, plans: state.plans, customCards: state.customCards, mediaItems: state.mediaItems, groups: state.groups, routines: state.routines };
    }
    async function readCloudState() {
      const row = await client.readState();
      if (!row) {
        status.textContent = "V cloudu zatím nejsou uložená data. Můžeš nahrát svá místní data.";
        return null;
      }
      status.textContent = `Cloudová verze ${row.revision} · změněno ${formatDate(row.updated_at?.slice(0, 10))}. Vyber načtení ze serveru nebo nahrání místních dat.`;
      return row;
    }
    loginForm.addEventListener("submit", async event => {
      event.preventDefault();
      const submit = loginForm.querySelector('[type="submit"]');
      submit.disabled = true;
      status.textContent = "Přihlašuji…";
      try {
        const user = await client.login($("#cloud-email").value, $("#cloud-password").value);
        $("#cloud-password").value = "";
        setCloudUser(user);
        await readCloudState();
      } catch (error) {
        status.textContent = cloudError(error);
      } finally {
        submit.disabled = false;
      }
    });
    $("#cloud-download").addEventListener("click", async () => {
      const button = $("#cloud-download");
      button.disabled = true;
      status.textContent = "Načítám cloudovou verzi…";
      try {
        const row = await client.readState();
        if (!row) {
          status.textContent = "V cloudu zatím nejsou data. Místní data zůstala beze změny.";
          return;
        }
        const imported = parseBackup({ app: "Cheer Coach AI", ...row.payload });
        if ((state.plans.length || state.customCards.length || state.mediaItems.length || state.groups.length || state.routines.length) && !window.confirm(`Načíst cloudovou verzi ${row.revision}? Nahradí místní data.`)) {
          status.textContent = "Načtení zrušeno. Místní data zůstala beze změny.";
          return;
        }
        state.plans = imported.plans;
        state.customCards = imported.customCards;
        state.mediaItems = imported.mediaItems;
        state.groups = imported.groups;
        state.routines = imported.routines;
        saveState();
        cards = [...(window.CHEER_CARDS || []), ...state.customCards];
        renderPlans();
        renderLibrary();
        renderMedia();
        renderGroups();
        renderRoutines();
        updateCounts();
        status.textContent = `Načtena cloudová verze ${row.revision} · změněno ${formatDate(row.updated_at?.slice(0, 10))}.`;
        toast("Cloudová data byla načtena.");
      } catch (error) {
        status.textContent = cloudError(error);
      } finally {
        button.disabled = false;
      }
    });
    $("#cloud-upload").addEventListener("click", async () => {
      const button = $("#cloud-upload");
      button.disabled = true;
      status.textContent = "Ověřuji cloudovou verzi…";
      try {
        const row = await client.readState();
        const payload = localPayload();
        if (row && JSON.stringify(row.payload) === JSON.stringify(payload)) {
          status.textContent = `Místní data už odpovídají cloudové verzi ${row.revision}.`;
          return;
        }
        const warning = row
          ? `Nahrát místní data jako novou verzi? Cloudová verze ${row.revision} z ${formatDate(row.updated_at?.slice(0, 10))} bude nahrazena.`
          : "Nahrát všechna místní data do cloudu?";
        if (!window.confirm(warning)) {
          status.textContent = "Nahrání zrušeno. Cloudová data zůstala beze změny.";
          return;
        }
        const saved = row ? await client.updateState(payload, row.revision) : await client.createState(payload);
        status.textContent = `Místní data jsou uložená v cloudu jako verze ${saved.revision} · ${formatDate(saved.updated_at?.slice(0, 10))}.`;
        toast("Data byla nahrána do cloudu.");
      } catch (error) {
        status.textContent = cloudError(error);
      } finally {
        button.disabled = false;
      }
    });
    $("#cloud-logout").addEventListener("click", async () => {
      $("#cloud-logout").disabled = true;
      try {
        await client.logout();
        setCloudUser(null);
        status.textContent = "Odhlášeno. Místní data zůstala v tomto prohlížeči.";
      } catch (error) {
        setCloudUser(null);
        status.textContent = `Odhlášeno z tohoto zařízení. ${cloudError(error)}`;
      } finally {
        $("#cloud-logout").disabled = false;
      }
    });
    $("#storage-description").textContent = "Plány a vlastní karty zůstávají uložené místně. Pokud je synchronizace nastavená, můžeš je ručně stáhnout nebo nahrát do soukromého cloudového účtu.";
    panel.hidden = false;
    if (client.session) {
      client.getUser().then(user => {
        setCloudUser(user);
        return readCloudState();
      }).catch(error => {
        client.clearSession();
        setCloudUser(null);
        status.textContent = cloudError(error);
      });
    }
  }

  $("#today-label").textContent = new Intl.DateTimeFormat("cs-CZ", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date());
  $("#mobile-menu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $("#mobile-more").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  const savedTheme = localStorage.getItem("cheer-coach-ai.theme");
  if (savedTheme !== "light") document.body.classList.add("theme-dark");
  $("#theme-toggle").addEventListener("click", () => {
    const dark = document.body.classList.toggle("theme-dark");
    localStorage.setItem("cheer-coach-ai.theme", dark ? "dark" : "light");
  });
  $$(".nav-item").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$(".mobile-tabbar [data-view]").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$('[data-goto]').forEach(button => button.addEventListener("click", () => showView(button.dataset.goto)));
  $$('[data-goto]').forEach(button => button.addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && button.getAttribute("role") === "link") { event.preventDefault(); showView(button.dataset.goto); }
  }));
  $("#new-plan").addEventListener("click", () => openPlanDialog());
  $("#new-plan-home").addEventListener("click", () => openPlanDialog());
  $("#new-plan-small").addEventListener("click", () => openPlanDialog());
  $("#add-block").addEventListener("click", () => addBlockRow());
  $("#export-button").addEventListener("click", exportAll);
  $("#search-input").addEventListener("input", renderLibrary);
  $("#media-filter").addEventListener("change", renderMedia);
  $("#media-url").addEventListener("input", renderMediaUrlPreview);
  $("#media-card").addEventListener("change", event => populateMediaCardOptions(event.target.value));
  $("#media-form").addEventListener("submit", event => {
    event.preventDefault();
    let url;
    try { url = new URL($("#media-url").value.trim()); } catch { toast("Zadej platný HTTPS odkaz."); return; }
    if (url.protocol !== "https:") { toast("Odkaz musí začínat https://."); return; }
    const cardId = $("#media-card").value;
    const drillValue = $("#media-drill").value;
    state.mediaItems.push({ id: newId(), title: $("#media-title").value.trim(), url: url.href, area: $("#media-area").value, topic: $("#media-topic").value.trim(), cardId: cardId || null, drillIndex: cardId && drillValue !== "" ? Number(drillValue) : null, note: $("#media-note").value.trim(), createdAt: new Date().toISOString() });
    saveState(); renderMedia(); event.target.reset(); $("#media-live-preview").hidden = true; $("#media-live-preview-content").innerHTML = ""; toast("Odkaz byl uložen.");
  });
  $("#group-form").addEventListener("submit", event => {
    event.preventDefault();
    state.groups.push({ id: newId(), name: $("#group-name").value.trim(), roles: splitLines($("#group-roles").value), note: $("#group-note").value.trim(), createdAt: new Date().toISOString() });
    saveState(); renderGroups(); event.target.reset(); toast("Skupina byla uložena.");
  });
  $("#routine-form").addEventListener("submit", event => {
    event.preventDefault();
    const blocks = splitLines($("#routine-blocks").value);
    if (!blocks.length) { toast("Přidej alespoň jeden blok sestavy."); return; }
    state.routines.push({ id: newId(), name: $("#routine-name").value.trim(), goal: $("#routine-goal").value.trim(), blocks, groups: $("#routine-groups").value.trim(), createdAt: new Date().toISOString() });
    saveState(); renderRoutines(); event.target.reset(); toast("Osnova sestavy byla uložena.");
  });
  document.addEventListener("click", event => {
    const upcoming = event.target.closest("[data-edit-upcoming]");
    if (upcoming) {
      const plan = state.plans.find(item => item.id === upcoming.dataset.editUpcoming);
      if (plan) { showView("planner"); openPlanDialog(plan); }
    }
    const removeMedia = event.target.closest("[data-remove-media]");
    const removeGroup = event.target.closest("[data-remove-group]");
    const removeRoutine = event.target.closest("[data-remove-routine]");
    if (removeMedia) { state.mediaItems = state.mediaItems.filter(item => item.id !== removeMedia.dataset.removeMedia); saveState(); renderMedia(); }
    if (removeGroup) { state.groups = state.groups.filter(item => item.id !== removeGroup.dataset.removeGroup); saveState(); renderGroups(); }
    if (removeRoutine) { state.routines = state.routines.filter(item => item.id !== removeRoutine.dataset.removeRoutine); saveState(); renderRoutines(); }
  });
  $("#area-filter").addEventListener("change", renderLibrary);
  $("#level-filter").addEventListener("change", renderLibrary);
  $("#reset-filters").addEventListener("click", () => { $("#search-input").value = ""; $("#area-filter").value = "all"; $("#level-filter").value = "all"; renderLibrary(); });
  $("#new-card").addEventListener("click", () => openCardEditor());
  $("#card-form").addEventListener("submit", saveCustomCard);
  $("#library-grid").addEventListener("click", event => {
    if (event.target.closest("#empty-reset")) { $("#reset-filters").click(); return; }
    const tile = event.target.closest("[data-open-card]");
    if (tile) openCard(tile.dataset.openCard);
  });
  $("#library-grid").addEventListener("keydown", event => {
    if ((event.key === "Enter" || event.key === " ") && event.target.matches("[data-open-card]")) { event.preventDefault(); openCard(event.target.dataset.openCard); }
  });
  document.addEventListener("click", event => {
    const open = event.target.closest("[data-open-card]");
    if (open && !open.closest("#library-grid")) openCard(open.dataset.openCard);
    const closer = event.target.closest("[data-close]");
    if (closer) $(`#${closer.dataset.close}`).close();
    const editCard = event.target.closest("[data-edit-card]");
    if (editCard) openCardEditor(state.customCards.find(card => card.id === editCard.dataset.editCard));
    const deleteCard = event.target.closest("[data-delete-card]");
    if (deleteCard) {
      const card = state.customCards.find(item => item.id === deleteCard.dataset.deleteCard);
      if (card) {
        $("#delete-card-name").textContent = card.title;
        $("#pending-card-delete").value = card.id;
        $("#delete-card-dialog").showModal();
      }
    }
  });
  document.addEventListener("keydown", event => {
    const open = event.target.closest?.("[data-open-card]");
    if (!open || open.closest("#library-grid") || event.target !== open) return;
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openCard(open.dataset.openCard);
    }
  });
  $("#plan-form").addEventListener("submit", event => {
    event.preventDefault();
    const blocks = $$(".block-row", $("#block-editor")).map(row => {
      const [name, minutes] = row.querySelectorAll("input");
      return { name: name.value.trim(), minutes: Number(minutes.value) };
    }).filter(block => block.name && block.minutes > 0);
    if (!blocks.length) { toast("Přidej alespoň jeden blok tréninku."); return; }
    const currentId = $("#plan-id").value;
    const existing = state.plans.find(plan => plan.id === currentId);
    const plan = {
      id: currentId || (crypto.randomUUID ? crypto.randomUUID() : String(Date.now())),
      name: $("#plan-name").value.trim(),
      date: $("#plan-date").value,
      duration: Number($("#plan-duration").value),
      blocks,
      createdAt: existing?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    if (existing) state.plans = state.plans.map(item => item.id === currentId ? plan : item);
    else state.plans.push(plan);
    saveState();
    renderPlans();
    $("#plan-dialog").close();
    toast(existing ? "Plán byl upraven." : "Trénink byl uložen.");
  });
  let pendingDelete = null;
  $("#plans-list").addEventListener("click", event => {
    const button = event.target.closest("[data-plan-action]");
    if (!button) return;
    const plan = state.plans.find(item => item.id === button.dataset.id);
    if (!plan) return;
    if (button.dataset.planAction === "edit") openPlanDialog(plan);
    if (button.dataset.planAction === "delete") { pendingDelete = plan.id; $("#confirm-dialog").showModal(); }
    if (button.dataset.planAction === "export") { download(`trenink-${plan.date || todayIso()}-${plan.name.toLocaleLowerCase("cs").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")}.json`, plan); toast("Plán byl exportován."); }
  });
  $("#confirm-delete").addEventListener("click", () => {
    state.plans = state.plans.filter(plan => plan.id !== pendingDelete);
    pendingDelete = null;
    saveState();
    renderPlans();
    $("#confirm-dialog").close();
    toast("Plán byl smazán.");
  });
  $("#settings-export").addEventListener("click", exportAll);
  initCloudSync();
  $("#settings-import").addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (file) readBackup(file);
  });
  $("#confirm-import-data").addEventListener("click", () => {
    if (!pendingImport) return;
    state.plans = pendingImport.plans;
    state.customCards = pendingImport.customCards;
    state.mediaItems = pendingImport.mediaItems;
    state.groups = pendingImport.groups;
    state.routines = pendingImport.routines;
    pendingImport = null;
    saveState();
    cards = [...(window.CHEER_CARDS || []), ...state.customCards];
    populateMediaCardOptions();
    renderPlans();
    renderLibrary();
    renderMedia();
    renderGroups();
    renderRoutines();
    updateCounts();
    $("#import-data-dialog").close();
    toast("Záloha byla načtena do tohoto prohlížeče.");
  });
  $("#clear-data-button").addEventListener("click", () => $("#clear-data-dialog").showModal());
  $("#confirm-clear-data").addEventListener("click", () => {
    localStorage.removeItem(KEY);
    state.plans = [];
    state.customCards = [];
    state.mediaItems = [];
    state.groups = [];
    state.routines = [];
    cards = [...(window.CHEER_CARDS || [])];
    renderPlans();
    renderLibrary();
    renderMedia();
    renderGroups();
    renderRoutines();
    updateCounts();
    $("#clear-data-dialog").close();
    toast("Uložená uživatelská data byla smazána.");
  });
  $("#confirm-delete-card").addEventListener("click", () => {
    const id = $("#pending-card-delete").value;
    state.customCards = state.customCards.filter(card => card.id !== id);
    cards = [...(window.CHEER_CARDS || []), ...state.customCards];
    saveState();
    renderLibrary();
    $("#delete-card-dialog").close();
    $("#card-dialog").close();
    toast("Vlastní karta byla smazána.");
  });
  ["plan-dialog", "card-dialog", "card-editor-dialog", "confirm-dialog", "clear-data-dialog", "delete-card-dialog", "import-data-dialog"].forEach(id => {
    const dialog = $(`#${id}`);
    dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  });

  renderLibrary();
  populateMediaCardOptions();
  renderPlans();
  updateCounts();

  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Offline support is progressive enhancement; the app remains usable without it.
    });
  }
})();
