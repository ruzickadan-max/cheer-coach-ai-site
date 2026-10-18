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

  function loadState() {
    try {
      const stored = JSON.parse(localStorage.getItem(KEY) || "{}");
      return {
        plans: Array.isArray(stored.plans) ? stored.plans : [],
        customCards: Array.isArray(stored.customCards) ? stored.customCards : []
      };
    } catch {
      return { plans: [], customCards: [] };
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
  }
  function showView(name) {
    $$(".view").forEach(view => view.classList.toggle("active", view.id === `view-${name}`));
    $$(".nav-item").forEach(button => button.classList.toggle("active", button.dataset.view === name));
    const labels = { home: "Přehled", library: "Knihovna karet", planner: "Plánovač", rules: "Pravidla & zdroje", settings: "Nastavení" };
    $("#crumb-current").textContent = labels[name] || labels.home;
    $(".sidebar").classList.remove("open");
    if (name === "planner") renderPlans();
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
        <div class="tile-art"><span class="tile-level">${escapeHtml(card.levelLabel || card.levels.join(" · "))}</span><div class="tile-name">${escapeHtml(card.title.toUpperCase())}</div><span class="tile-tag">${escapeHtml(card.disciplineLabel.toUpperCase())}</span></div>
        <div class="tile-body"><div class="tile-meta"><span class="area-pill">${escapeHtml(card.disciplineLabel)}</span><span class="verify-pill"><span></span>${escapeHtml(card.statusLabel)}</span></div><h3>${escapeHtml(card.title)}</h3><p>${escapeHtml(card.variant)}</p><div class="tile-foot"><span>ÚROVEŇ / RÁMEC</span><strong>${escapeHtml(card.levelLabel || card.levels.join(" / "))}</strong></div></div>
      </article>`).join("") : `<div class="no-results">Žádná karta neodpovídá hledání.<br><button class="text-button" id="empty-reset">Vymazat filtry</button></div>`;
  }
  function listMarkup(items, ordered = false) {
    const tag = ordered ? "ol" : "ul";
    return `<${tag}>${items.map(item => `<li>${escapeHtml(item)}</li>`).join("")}</${tag}>`;
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
        <section class="detail-section full"><h3>Drily</h3>${card.drills.map(drill => `<p><strong>${escapeHtml(drill.title)}.</strong> ${escapeHtml(drill.body)}</p>`).join("")}</section>
        <section class="detail-section"><h3>Kritéria připravenosti</h3>${listMarkup(card.readiness)}</section>
        <section class="detail-section"><h3>Koučovací body</h3>${listMarkup(card.coaching)}</section>
        <section class="detail-section danger full"><h3>Stop-kritéria · zastav při</h3>${listMarkup(card.stopCriteria)}</section>
        <section class="detail-section"><h3>Regrese</h3><p>${escapeHtml(card.regression)}</p></section>
        <section class="detail-section safe"><h3>Bezpečný sestup</h3><p>${escapeHtml(card.safeExit)}</p></section>
        <section class="detail-section detail-sources full"><h3>Zdroje pravidel</h3>${card.sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer">${escapeHtml(source.title)} ↗ <small>· ${escapeHtml(source.season)} · kontrola ${escapeHtml(formatDate(source.checked))}</small></a>`).join("")}<p>${escapeHtml(card.rulesNote)}</p><div class="detail-date">Obsah karty zkontrolován: ${escapeHtml(formatDate(card.updatedAt))}</div></section>
      </div>`;
    $("#card-dialog").showModal();
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
      return `<div class="upcoming-item"><div class="date-box"><b>${escapeHtml(day)}</b><small>${escapeHtml(month)}</small></div><div><strong>${escapeHtml(plan.name)}</strong><small>${escapeHtml(planDuration(plan))} min · ${count} ${blockWord}</small></div><span class="item-arrow">→</span></div>`;
    }).join("") : `<div class="empty-state"><div><div class="empty-symbol">✳</div>Zatím nemáš uložený žádný nadcházející trénink.<br>Vytvoř plán a přidej první blok.</div></div>`;
    updateCounts();
  }
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
      schemaVersion: 1,
      exportedAt: new Date().toISOString(),
      plans: state.plans,
      cards,
      customCards: state.customCards
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
    return { plans: data.plans, customCards: data.customCards };
  }
  function readBackup(file) {
    const reader = new FileReader();
    reader.onload = () => {
      try {
        pendingImport = parseBackup(JSON.parse(String(reader.result)));
        const plans = pendingImport.plans.length;
        const customCards = pendingImport.customCards.length;
        $("#import-summary").textContent = `Záloha obsahuje ${plans} ${plans === 1 ? "plán" : plans >= 2 && plans <= 4 ? "plány" : "plánů"} a ${customCards} ${customCards === 1 ? "vlastní kartu" : customCards >= 2 && customCards <= 4 ? "vlastní karty" : "vlastních karet"}. Nahradí aktuální plány a vlastní karty; výchozí knihovna zůstane zachovaná.`;
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

  $("#today-label").textContent = new Intl.DateTimeFormat("cs-CZ", { weekday: "short", day: "numeric", month: "short", year: "numeric" }).format(new Date());
  $("#mobile-menu").addEventListener("click", () => $(".sidebar").classList.toggle("open"));
  $$(".nav-item").forEach(button => button.addEventListener("click", () => showView(button.dataset.view)));
  $$('[data-goto="planner"]').forEach(button => button.addEventListener("click", () => showView("planner")));
  $("#new-plan").addEventListener("click", () => openPlanDialog());
  $("#new-plan-home").addEventListener("click", () => openPlanDialog());
  $("#new-plan-small").addEventListener("click", () => openPlanDialog());
  $("#add-block").addEventListener("click", () => addBlockRow());
  $("#export-button").addEventListener("click", exportAll);
  $("#search-input").addEventListener("input", renderLibrary);
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
  $("#settings-import").addEventListener("change", event => {
    const file = event.target.files && event.target.files[0];
    if (file) readBackup(file);
  });
  $("#confirm-import-data").addEventListener("click", () => {
    if (!pendingImport) return;
    state.plans = pendingImport.plans;
    state.customCards = pendingImport.customCards;
    pendingImport = null;
    saveState();
    cards = [...(window.CHEER_CARDS || []), ...state.customCards];
    renderPlans();
    renderLibrary();
    updateCounts();
    $("#import-data-dialog").close();
    toast("Záloha byla načtena do tohoto prohlížeče.");
  });
  $("#clear-data-button").addEventListener("click", () => $("#clear-data-dialog").showModal());
  $("#confirm-clear-data").addEventListener("click", () => {
    localStorage.removeItem(KEY);
    state.plans = [];
    state.customCards = [];
    cards = [...(window.CHEER_CARDS || [])];
    renderPlans();
    renderLibrary();
    updateCounts();
    $("#clear-data-dialog").close();
    toast("Uložené plány a vlastní karty byly smazány.");
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
  renderPlans();
  updateCounts();

  if ("serviceWorker" in navigator && window.isSecureContext) {
    navigator.serviceWorker.register("./service-worker.js").catch(() => {
      // Offline support is progressive enhancement; the app remains usable without it.
    });
  }
})();
