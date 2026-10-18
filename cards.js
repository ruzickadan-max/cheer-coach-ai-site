// Redakční obsah karet je oddělen od aplikační logiky.
window.CHEER_CARDS = [
  {
    id: "extension",
    title: "Extension",
    variant: "Stabilní pozice flyerky ve stoje na plně natažených pažích bases",
    discipline: "stunt",
    disciplineLabel: "Group stunt",
    levels: [],
    levelLabel: "Úroveň ověřit",
    status: "draft",
    statusLabel: "Pravidla neověřena",
    use: "Rozvojová karta pro trenéra; úroveň a legalitu ověřit dle soutěže, věkové skupiny a aktuálních pravidel.",
    goal: "Skupina kontrolovaně přejde do stabilní, statické Extension z povoleného a zvládnutého nástupu; flyer udržuje pevnou pozici a bases drží kontrolovanou zátěž bez bolestivého přetížení. Dovednost se trénuje pouze po zvládnutí vstupních kritérií a bezpečného návratu dolů.",
    roles: [
      "Flyer: aktivně zpevňuje trup a nohy, drží dohodnutou polohu paží/hlavy a komunikuje při nejistotě.",
      "Bases: používají dohodnutý úchop a synchronní, trenérem určený pohyb; nezkouší zachraňovat neplánované pohyby individuálně.",
      "Back spot / front spot: pouze dle konstrukce a aktuálních pravidel; sledují konkrétní rizika a mají jasně určenou zodpovědnost.",
      "Trenér: kontroluje prostředí, připravenost, únavu, pravidla, spottery a plán bezpečného sestupu; dává jeden stručný pokyn najednou."
    ],
    prerequisites: [
      "Každý člen zná svou roli, úchop, hlasové povely a reakci na „stop“.",
      "Flyer zvládá základní polohu těla a stabilitu na zemi; bases zvládají koordinaci a kontrolu zátěže na nízké regresi.",
      "Skupina umí opakovaně dokončit předchozí, nižší variantu se stabilním úchopem a plánovaným bezpečným sestupem.",
      "Prostor je suchý, uklizený a bez překážek; povrch a vybavení odpovídají pravidlům a klubové bezpečnostní praxi.",
      "Členové jsou bez akutní bolesti, závratě nebo zjevné únavy zhoršující techniku. Trenér dodržuje interní postup pro zranění.",
      "Kvalifikovaný odpovědný trenér je přítomen a určil potřebné spottery na základě pravidel a rizik."
    ],
    equipment: "Používej pouze povrch a vybavení odpovídající pravidlům a klubové bezpečnostní praxi. Před sérií odstraň šperky a předměty, které se mohou zachytit. Počet bases a spotterů určí aktuální pravidla a odpovědný trenér.",
    space: "Suchý, uklizený prostor bez překážek. Povrch musí odpovídat pravidlům a klubové bezpečnostní praxi.",
    progression: [
      "Pozice bez zátěže: flyer nacvičí pevné tělo a dohodnutý tvar na zemi; bases si bez zátěže projdou synchronní signály a pozice rukou.",
      "Nízko položená kontrola: na podlaze/nízké bezpečné variantě natrénovat komunikaci, stabilní kontakt, zastavení a společný sestup.",
      "Zvládnutá nižší varianta: upevnit už naučenou pre-extension/nižší pozici, kterou skupina umí bezpečně držet a ukončit. Bez přidávání neznámého vstupu.",
      "Extension jako statická kontrola: pouze s přímým vedením trenéra, potřebným spottingem a schváleným vstupem. Krátké kontrolované držení, bez přechodů a bez přidaných triků.",
      "Konsolidace: opakovat v různých trénincích pouze při stejné kvalitě, bez bolesti a s předvídatelným sestupem. Jakákoli změna úchopu, skupiny či vstupu znamená návrat ke kontrole a regresi."
    ],
    drills: [
      { title: "Zpevnění na povel (flyer)", body: "Na zemi: trenér dá krátký povel „pevně“ a „uvolni“. 3–5 krátkých opakování, pauza dle potřeby. Sleduj klidné dýchání, pevné nohy a kontrolovanou polohu ramen; žádné bolestivé propínání. Regrese: pohodlný postoj před zrcadlem." },
      { title: "Synchronní signál (bases)", body: "Bases vedle sebe projdou slovní/gestové signály a pohyb do bezpečných prázdných pozic bez zvedání osoby. 4–6 pomalých opakování. Stejný povel, stejný rytmus, zastavení na povel trenéra. Regrese: jeden pohyb bez zátěže a bez rychlosti." },
      { title: "Stabilní úchop s lehkou zátěží", body: "Pouze v trenérem schválené, již bezpečně zvládnuté nízké pozici. Kvalifikovaný trenér určí variantu, spottery a sestup. 2–3 kvalitní krátká opakování; skončit dřív než nastoupí únava. Regrese: návrat na dril bez zátěže." },
      { title: "Pozoruj a pojmenuj", body: "Pozorovatel sleduje již známou nízkou variantu. Po ukončení pojmenuje jeden dobře zvládnutý bod a jeden cíl. Jeden pozorovatelný korekční bod najednou; zpětná vazba mimo pohyb." }
    ],
    readiness: [
      "Skupina konzistentně provede pouze již schválenou variantu bez ztráty úchopu a bez bolestivých reakcí.",
      "Každý člen reaguje na povely a umí bezpečně zastavit.",
      "Trenér má určené pozorovatelné kritérium kvality, potřebné spottery a plán sestupu.",
      "Aktuální pravidla soutěže, věkové skupiny a konkrétní provedení byly ověřeny v oficiálním zdroji."
    ],
    coaching: [
      "Ztráta pevné pozice flyerky: zastavit; vrátit se k pozici na zemi a kratší, lehčí sérii.",
      "Bases se pohybují nesynchronně: přerušit zátěž; nacvičit rytmus a signál bez osoby.",
      "Nejasný úchop či povel: nepokračovat, dokud skupina nemá jednu společnou dohodu.",
      "Klesající kontrola s únavou: ukončit sérii, dopřát pauzu nebo ukončit stunt blok.",
      "Trenér dává mnoho pokynů v pohybu: jeden stručný předem dohodnutý cue; rozbor až po bezpečném ukončení."
    ],
    stopCriteria: [
      "Bolest, úraz nebo strach/odmítnutí sportovce.",
      "Opakovaně nesynchronní pohyb, nestabilní úchop nebo neschopnost udržet předchozí regresi.",
      "Nedostatek spotterů, rušivé prostředí, únava zhoršující kontrolu nebo nejasná legalita prvku.",
      "Při ztrátě úchopu, neplánovaném náklonu, bolestivém pohybu, opožděné reakci nebo zmatku dej jasný stop-povel a přejdi na předem nacvičené bezpečné řešení pod vedením trenéra."
    ],
    regression: "Pokud kterékoli kritérium připravenosti chybí, zůstaň u regrese, nácviku techniky bez zátěže nebo konzultace s kvalifikovaným trenérem. Jakákoli změna úchopu, skupiny či vstupu znamená návrat ke kontrole a regresi.",
    safeExit: "Sestup musí být předem známou, skupinou zvládnutou součástí tréninku a musí odpovídat konkrétní variantě i pravidlům. Tato karta záměrně neurčuje techniku sestupu. Trenér ji zvolí, vysvětlí a nacvičí nejprve v bezpečné regresi. Při neplánované situaci tým používá pouze nacvičený postup pod vedením odpovědného trenéra; nikdo se nepokouší chytat nebo improvizovat mimo svou roli.",
    safetyNote: "Karta nepředepisuje pokus o nový stunt bez přímého dohledu. Výšku, počet bases/spotterů, přechody, bracing a dismount určují aktuální pravidla a odpovědný trenér. V případě nejistoty zvol nižší regresi. Počet úspěšných opakování sám o sobě není povolením postoupit.",
    sources: [
      { title: "ČACH – pravidla a dotaz na legalitu", url: "https://pravidla.cach.cz/", organization: "ČACH", season: "2026/2027", checked: "2026-10-18", note: "Přesná legalita tohoto provedení nebyla touto kartou stanovena." },
      { title: "ČACH – Věkové skupiny (příloha C), 2026/2027", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/sr-cach-2026_2027-priloha-c-vekove-skupiny.pdf", organization: "ČACH", season: "2026/2027", checked: "2026-10-18" },
      { title: "ČACH – Otevírané divize, 2026/2027", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/sr-cach-2026_2027-otevirane-divize.pdf", organization: "ČACH", season: "2026/2027", checked: "2026-10-18" },
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Mezinárodní zdroj, který nenahrazuje pravidla konkrétní soutěže ČACH." },
      { title: "ICU Europe – dokumenty", url: "https://cheerunion.org/europe/tools/", organization: "ICU Europe", season: "Ověřit konkrétní soutěž", checked: "2026-10-18" }
    ],
    rulesNote: "Odkazy byly ověřeny dne 18. 10. 2026; přesná legalita tohoto provedení nebyla touto kartou stanovena. Před soutěžním použitím zkontroluj aktuální pravidla ČACH/pořadatele nebo ICU/ECU pro konkrétní divizi a věk. Při nejasnosti odešli dotaz oficiální komisi.",
    updatedAt: "2026-10-18"
  },
  {
    id: "handstand-shape",
    title: "Stoj na rukou – tvar těla",
    variant: "Samostatný nácvik rovné, aktivní pozice bez odrazu do další dovednosti",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: ["L1"],
    levelLabel: "L1 · ICU Novice",
    status: "draft",
    statusLabel: "ČACH ověřit",
    use: "Nácvik tvaru na zemi; úroveň vychází z pravidel ICU Novice. Nejde o potvrzení soutěžní legality v ČACH.",
    goal: "Sportovec krátce udrží kontrolovanou pozici s oporou o ruce, aktivními rameny a bez bolesti. Karta se omezuje na statický tvar a bezpečný návrat na zem.",
    roles: ["Sportovec pracuje jen ve své bezpečné variantě a okamžitě hlásí bolest nebo nejistotu.", "Trenér dohlíží zblízka, volí regresi a nepřidává odraz, přemet ani přechod do jiné dovednosti."],
    prerequisites: ["Zvládnutý plank a opora o dlaně bez bolesti.", "Volná plocha, vhodný povrch a přítomný trenér, který vybere bezpečnou regresi.", "Sportovec rozumí povelu stop a zvládá kontrolované položení nohou zpět na zem."],
    equipment: "Podložka nebo vhodný gymnastický povrch; žádné pomůcky zvyšující výšku.",
    space: "Volná plocha bez překážek, suchý a rovný povrch.",
    progression: ["Tvar těla v planku a aktivní tlak dlaní do podložky.", "Nácvik přenosu váhy do rukou v nízké regresi zvolené trenérem.", "Krátké statické držení u stěny pouze tehdy, pokud trenér bezpečně zajistí prostor a návrat.", "Samostatná krátká výdrž jen po individuálním posouzení trenérem; bez navazování další dovednosti."],
    drills: [
      { title: "Aktivní opora", body: "V planku nebo kleku zatlač dlaněmi do podložky a vytlač ramena od uší bez bolesti. 3–5 krátkých opakování. Regrese: opora o vyvýšenou pevnou plochu." },
      { title: "Tvar u stěny", body: "Pouze v regresi určené trenérem: krátce najdi rovnou linii těla bez kopnutí a nacvič kontrolovaný návrat. Trenér stojí na dosah a může drill kdykoli ukončit. Regrese: nácvik tvaru na zemi." }
    ],
    readiness: ["Bezbolestná opora o ruce a kontrola ramen.", "Sportovec umí na povel zastavit a vrátit se bezpečnou známou cestou.", "Trenér individuálně posoudil vhodnost varianty a přítomnost dohledu."],
    coaching: ["Dlaně rozlož na podložce a tlač do ní.", "Udržuj klidné dýchání; nepokračuj při bolesti zápěstí, ramen, krku nebo zad.", "Dávej jeden stručný pokyn před opakováním; během nejistého pohybu sportovce nerozptyluj."],
    stopCriteria: ["Jakákoli bolest, strach nebo odmítnutí.", "Ztráta kontroly nad návratem, pokles ramen nebo opakované prohýbání.", "Nevhodný povrch, překážky nebo nepřítomnost dohledu trenéra."],
    regression: "Vrať se k planku, kleku nebo jiné variantě opory na zemi. Trenér může drill úplně vynechat; počet úspěšných opakování sám o sobě není důvod k postupu.",
    safeExit: "U statické varianty předem nacvič kontrolovaný návrat nohou na zem v regresi zvolené trenérem. Tato karta neurčuje záchrannou techniku ani neopravňuje k samostatnému pokusu.",
    safetyNote: "Přímý dohled trenéra je nutný. Nezkoušej nový prvek, odraz ani navázání další dovednosti bez osobního posouzení a odpovídajícího jištění.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, Novice standing/running tumbling", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "V dokumentu ICU je Novice označeno jako ekvivalent L1; v Novice jsou handstands povoleny. Týká se ICU, nikoli automaticky soutěží ČACH." },
      { title: "ČACH – Věkové skupiny (příloha C), sezona 2026/2027", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/sr-cach-2026_2027-priloha-c-vekove-skupiny.pdf", organization: "ČACH", season: "2026/2027", checked: "2026-10-18", note: "Věkovou skupinu pro konkrétní soutěž ověř v příloze a kartě soutěže." }
    ],
    rulesNote: "Ověřeno pouze vůči ICU 2027: Novice (ekvivalent L1 v dokumentu ICU) připouští handstand. ČACH, pořadatel, věková skupina a konkrétní soutěž mohou mít vlastní podmínky; aplikace legalitu nepotvrzuje.",
    updatedAt: "2026-10-18"
  },
  {
    id: "cartwheel-basics",
    title: "Přemet stranou – základní drily",
    variant: "Pomalý nácvik tvaru a přenosu váhy bez spojování do akrobatické řady",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: ["L1"],
    levelLabel: "L1 · ICU Novice",
    status: "draft",
    statusLabel: "ČACH ověřit",
    use: "Základní drily na zemi; pravidlový odkaz vychází z ICU Novice. Nejde o potvrzení soutěžní legality v ČACH ani o individuální doporučení sportovci.",
    goal: "Rozvíjet kontrolovanou oporu o ruce a postupné přenesení váhy v přípravné variantě zvolené trenérem. Plný přemet zařazuje pouze trenér po přímém posouzení.",
    roles: ["Sportovec provádí jen známou a bezbolestnou variantu.", "Trenér zvolí dril a případné jištění podle schopností sportovce; nevyžaduje pokus o plný skill."],
    prerequisites: ["Základní bezbolestná opora o dlaně.", "Nácvik na vhodném povrchu a pod přímým dohledem trenéra.", "Sportovec zná povel stop a umí počkat na pokyn."],
    equipment: "Vhodný gymnastický povrch; případné pomůcky vybírá trenér.",
    space: "Suchá volná dráha bez osob a překážek v okolí.",
    progression: ["Tvar výpadu a opora o ruce na zemi bez přenosu přes hlavu.", "Přenos váhy mezi rukama v nízké, pomalé regresi určené trenérem.", "Částečná varianta přes nízkou pomůcku jen tehdy, pokud ji vybral a jistí trenér.", "Plný přemet zařadit až po osobním posouzení trenéra a zvládnutí bezpečného ukončení."],
    drills: [
      { title: "Výpad a dosah", body: "Nacvič výchozí výpad a položení dlaní na zem bez odrazu. 3–5 pomalých opakování. Regrese: kratší dosah v pohodlném rozsahu." },
      { title: "Přenos váhy s oporou", body: "V trenérem zvolené nízké variantě přenes váhu do rukou a vrať se do výchozí pozice. Nepřekonávej rozsah, který sportovec bezpečně ovládá. Regrese: nácvik v kleku." }
    ],
    readiness: ["Bezbolestná opora o ruce a kontrolovaný návrat.", "Sportovec respektuje povely a necítí strach ani tlak k pokusu.", "Trenér osobně určil, zda je vhodné pokračovat v přípravě."],
    coaching: ["Vracej se k pomalému pohybu a jednomu cíli na opakování.", "Nespojuj dril s odrazem, rozběhem ani další dovedností.", "Přeruš při bolesti nebo ztrátě jistoty."],
    stopCriteria: ["Bolest, strach nebo neochota pokračovat.", "Ztráta kontroly nad oporou či návratem.", "Nedostatek prostoru, vhodného povrchu nebo přímého dohledu."],
    regression: "Zůstaň u výpadu, kleku a opory o dlaně na zemi. Nevyvozuj připravenost z počtu opakování.",
    safeExit: "V přípravných drilech se sportovec vrací do stabilní pozice na zemi. Plný přemet ani záchrannou techniku tato karta nepopisuje.",
    safetyNote: "Přímý dohled trenéra je nutný. Plný akrobatický prvek nezkoušej bez osobního posouzení, vhodného povrchu a odpovídajícího jištění.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, Novice standing/running tumbling", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Pravidla ICU Novice (ekvivalent L1 v tomto dokumentu) uvádějí cartwheels jako povolené. Nejde o potvrzení pro soutěže ČACH." },
      { title: "ČACH – Otevírané divize, sezona 2026/2027", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/sr-cach-2026_2027-otevirane-divize.pdf", organization: "ČACH", season: "2026/2027", checked: "2026-10-18", note: "Seznam otevřených divizí a kategorií ověř pro konkrétní soutěž; pořadatel může vypsat speciální divize." }
    ],
    rulesNote: "ICU 2027 Novice připouští cartwheels a v dokumentu odpovídá L1. Konkrétní soutěž ČACH, věk, povrch a případné výjimky ověř v oficiálních dokumentech; aplikace legalitu nepotvrzuje.",
    updatedAt: "2026-10-18"
  },
  {
    id: "stunt-callouts-ground",
    title: "Povely a synchronizace bez zátěže",
    variant: "Komunikace a společné zastavení při nácviku bez zvedání sportovce",
    discipline: "stunt",
    disciplineLabel: "Group stunt",
    levels: [],
    levelLabel: "Přípravný drill · bez úrovně",
    status: "draft",
    statusLabel: "Přípravný obsah · pravidla neověřena",
    use: "Pouze nácvik rolí a signálů na zemi bez nesení váhy jiné osoby. Nejde o nácvik nástupu do stuntu ani potvrzení soutěžní úrovně.",
    goal: "Členové skupiny si v klidném prostředí sjednotí krátké povely, reakci na „stop“ a pořadí komunikace. Karta končí u nácviku bez zátěže; jakýkoli stunt vyžaduje samostatné posouzení trenérem.",
    roles: [
      "Každý člen předem řekne svou roli a domluvený povel pro okamžité zastavení.",
      "Jeden určený člen vede pouze slovní signál; ostatní odpoví dohodnutým potvrzením.",
      "Trenér sleduje, zda všichni signálu rozumějí, a může cvičení kdykoli ukončit."
    ],
    prerequisites: [
      "Volná, suchá plocha bez překážek a dostatek prostoru mezi skupinami.",
      "Předem určené role a jeden srozumitelný povel pro zastavení.",
      "Žádné zvedání, opírání váhy člena o jinou osobu ani přechod do stunt prvku."
    ],
    equipment: "Vybavení není potřeba. Nepoužívej pomůcky ani kontakt, který by měnil drill na zatíženou pozici.",
    space: "Rovná, suchá a volná plocha. Skupina stojí v pohodlné vzdálenosti; žádná osoba není zvedaná ani podpíraná.",
    progression: [
      "Trenér skupině připomene role, krátký signál a povel „stop“; členové je vlastními slovy zopakují.",
      "Skupina si v běžném stoji nahlas projde dohodnuté pořadí signálů bez pohybové sekvence.",
      "Při zachování stejné bezpečné pozice přidá trenér pouze jeden jednoduchý signál; všichni jej zopakují a na „stop“ zůstanou stát.",
      "Drill ukonči shrnutím. Přechod k jakékoli zatížené nebo zvedané variantě tato karta nepokrývá a vyžaduje samostatné posouzení trenérem."
    ],
    drills: [
      { title: "Role jednou větou", body: "Každý člen v klidu pojmenuje svoji roli a odpovědnost za povel „stop“. Jedno krátké kolo; při nejasnosti role znovu vysvětli. Regrese: trenér role pouze ukáže a skupina je zopakuje." },
      { title: "Signál a potvrzení", body: "Určený člen řekne domluvený signál a každý odpoví jedním slovem. Proveď 2–4 pomalá kola bez pohybu a bez kontaktu. Regrese: trenér řídí signál a skupina pouze potvrzuje." },
      { title: "Zkouška zastavení", body: "Během běžného stoje trenér kdykoli řekne „stop“; všichni přeruší řeč a zůstanou v pohodlném stoji. 2–3 opakování. Nezaváděj překvapivý pohyb ani rychlost." }
    ],
    readiness: [
      "Všichni rozumějí svým rolím a dokážou bez váhání reagovat na povel „stop“.",
      "Skupina používá stručné, slyšitelné a jednotné signály.",
      "Trenér potvrzuje pouze připravenost ke komunikaci v tomto drillu, nikoli připravenost k provedení stuntu."
    ],
    coaching: [
      "Před cvičením stanov jediný povel pro okamžité zastavení.",
      "Mluvte zřetelně a vždy počkejte na potvrzení celé skupiny.",
      "Opravuj komunikaci mimo pohyb; nezvyšuj tempo, když si členové nejsou jistí."
    ],
    stopCriteria: [
      "Někdo neví, jaká je jeho role nebo co znamená povel „stop“.",
      "Zmatek, neslyšitelné signály, strach, bolest nebo odmítnutí účastníka.",
      "Drill se začne měnit na zvedání, zatěžování jiné osoby nebo nácvik stunt vstupu."
    ],
    regression: "Vrať se k rozhovoru v klidu: vyjasni role a společný povel, bez pohybové sekvence. Pokud skupina stále nemá shodu, cvičení ukonči.",
    safeExit: "Na povel „stop“ všichni zůstanou stát v pohodlné stabilní pozici a vyčkají na trenéra. Karta neobsahuje záchranný postup pro stunt, protože se v ní žádný stunt neprovádí.",
    safetyNote: "Přímý dohled trenéra. Tento drill nezahrnuje zvedání, zatížení ani podporu tělesné váhy jiné osoby. Nevyvozuj z něj připravenost k náročnějšímu prvku; každou další variantu musí samostatně posoudit odpovědný trenér a ověřit aktuální pravidla.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Zdroj zdůrazňuje kvalifikovaný dohled, prokázanou dovednost před progresí, vhodný povrch a plán reakce na úraz. Neověřuje legalitu tohoto drillu v ČACH." },
      { title: "ČACH – Platná bezpečnostní pravidla 2025/2026", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/platna-bezpecnostni-pravidla-2025_2026.pdf", organization: "ČACH", season: "2025/2026", checked: "2026-10-18", note: "Poslední zveřejněná příloha G na oficiálním rozcestníku v den kontroly; dokument požaduje bezpečnou a postupnou progresi. Není tvrzením o platnosti pro sezonu 2026/2027 ani o legalitě prvku." }
    ],
    rulesNote: "Bez soutěžního levelu a bez tvrzení o legalitě. Odkazy jsou bezpečnostní kontext; konkrétní pravidla a výjimky ověř pro soutěž a sezonu.",
    updatedAt: "2026-10-18"
  },
  {
    id: "tumbling-weight-shift-kneeling",
    title: "Přenos váhy v kleku",
    variant: "Pomalá příprava opory o dlaně bez odrazu, převrácení nebo zvednutí nohou",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: [],
    levelLabel: "Přípravný drill · bez úrovně",
    status: "draft",
    statusLabel: "Přípravný obsah · pravidla neověřena",
    use: "Nízký drill na zemi, který se zastaví před jakýmkoli akrobatickým prvkem. Není přiřazen k L1–L4 a nepotvrzuje připravenost sportovce k přemetu ani stojce.",
    goal: "Sportovec v pohodlném kleku vnímá oporu dlaní a dokáže se pomalu vrátit do výchozí polohy. Žádná fáze drill nevyžaduje odraz, oporu o hlavu nebo krk, ani přenesení nohou nad trup.",
    roles: [
      "Sportovec pracuje jen v bezbolestném rozsahu a kdykoli může říci „stop“.",
      "Trenér ukazuje tempo a sleduje ruce, ramena, stabilitu a pohodlí sportovce.",
      "Pozorovatel, je-li přítomen, dává zpětnou vazbu až po návratu do klidové pozice."
    ],
    prerequisites: [
      "Sportovec bez bolesti zvládne pohodlný klek a položit dlaně na vhodnou podložku.",
      "Trenér je přítomen a předem zkontroloval volný, suchý povrch.",
      "Sportovec zná povel „stop“ a nemusí překonávat strach ani rozsah pohybu."
    ],
    equipment: "Podložka nebo jiný vhodný gymnastický povrch; žádné vyvýšené pomůcky.",
    space: "Samostatná volná plocha bez překážek a dalších sportovců v dosahu.",
    progression: [
      "V klidném kleku najdi pohodlnou polohu dlaní na podložce bez přenesení celé váhy do rukou.",
      "Při zachování obou kolen na zemi se s výdechem nepatrně přesuň vpřed a vrať se zpět; rozsah určuje pohodlí sportovce.",
      "Opakuj jen pokud je pohyb plynulý, bez bolesti a sportovec se cítí jistě. Nepřidávej odraz, kopnutí ani zvednutí nohou.",
      "Další dovednost není automatickým pokračováním této karty; rozhoduje trenér po samostatném posouzení a ověření zdrojů."
    ],
    drills: [
      { title: "Položení dlaní", body: "Z kleku polož dlaně na zem a vrať se do pohodlné vzpřímené polohy. 3 pomalá opakování. Regrese: menší předklon a kratší kontakt rukou." },
      { title: "Malý přenos a návrat", body: "S oběma koleny stále na podlaze přenes malou část váhy směrem k dlaním a plynule se vrať. 2–4 krátká opakování bez výdrže do únavy. Regrese: zůstaň pouze u položení a zvednutí dlaní." },
      { title: "Povel stop", body: "Po jednom pohodlném přenosu trenér vysloví „stop“; sportovec se vrátí do kleku a odpočívá. 1–2 opakování. Povel nejprve vysvětli, nezvyšuj rychlost." }
    ],
    readiness: [
      "Položení dlaní i návrat jsou pohodlné a bez bolesti.",
      "Sportovec udrží obě kolena na podlaze po celou dobu drillu.",
      "Trenér pouze vyhodnocuje tento nízký drill; počet opakování neznamená připravenost na další skill."
    ],
    coaching: [
      "Zvol malý, pohodlný rozsah a pomalé tempo.",
      "Dávej jeden pokyn před opakováním a během pohybu sportovce nerozptyluj.",
      "Při přetížení zápěstí nebo změně techniky přeruš; nevyžaduj dokončení série."
    ],
    stopCriteria: [
      "Jakákoli bolest, brnění, závratě, strach nebo odmítnutí sportovce.",
      "Ztráta pohodlné kontroly, neplánované odlehčení kolen nebo snaha přidat odraz.",
      "Nevhodný povrch, překážka nebo nepřítomnost trenéra."
    ],
    regression: "Vrať se do pohodlného kleku bez přenosu váhy; případně drill vynech. Nepoužívej zvýšenou podložku bez samostatného posouzení trenérem.",
    safeExit: "Při povelu „stop“ se sportovec vrátí do stabilního kleku a poté vstane způsobem, který je pro něj pohodlný. Drill neobsahuje pád, převrácení ani záchrannou techniku.",
    safetyNote: "Přímý dohled trenéra a vhodný povrch. Jedná se pouze o pomalou práci na zemi; žádný stoj na rukou, kopnutí, odraz ani převrácení. Při bolesti nebo nejistotě ihned skonči. Karta neposuzuje zdravotní stav ani připravenost pro jinou dovednost.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Zdroj požaduje kvalifikovaný dohled, vhodný povrch a prokázání dovednosti před progresí. Nejde o návod k tomuto drillu ani potvrzení jeho úrovně v ČACH." },
      { title: "ČACH – Platná bezpečnostní pravidla 2025/2026", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/platna-bezpecnostni-pravidla-2025_2026.pdf", organization: "ČACH", season: "2025/2026", checked: "2026-10-18", note: "Poslední zveřejněná příloha G na oficiálním rozcestníku v den kontroly; obsahuje princip postupné a bezpečné progrese. Neověřuje legalitu drillu ani pravidla pro sezonu 2026/2027." }
    ],
    rulesNote: "Přípravný drill bez soutěžního levelu. Zdroje se vztahují k obecným principům bezpečnosti; neprokazují soutěžní legalitu ani individuální vhodnost.",
    updatedAt: "2026-10-18"
  },
  {
    id: "tumbling-shape-floor",
    title: "Zpevnění těla na zemi",
    variant: "Krátké výdrže v pohodlné variantě bez převrácení a bez dosahování maxima",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: [],
    levelLabel: "Přípravný drill · bez úrovně",
    status: "draft",
    statusLabel: "Přípravný obsah · pravidla neověřena",
    use: "Obecný nácvik polohy těla na zemi, nikoli požadavek nebo test připravenosti pro soutěžní dovednost. Trenér vybírá variantu podle skupiny.",
    goal: "Sportovec krátce udrží pohodlnou polohu na podlaze a dokáže ji ukončit bez ztráty kontroly. Karta neobsahuje stojky, přemety, zátěž na krk ani soutěžní level.",
    roles: [
      "Sportovec zvolí pohodlnou variantu a oznámí bolest či nejistotu.",
      "Trenér kontroluje prostor a volí jednodušší variantu, pokud je třeba.",
      "Ostatní čekají mimo cvičební plochu a do pohybu nevstupují."
    ],
    prerequisites: [
      "Pohodlné položení na záda nebo břicho na vhodném povrchu.",
      "Volný prostor a přítomný trenér, který vysvětlí ukončení pozice.",
      "Bezbolestný rozsah; držení dechu nebo napínání přes bolest není cílem."
    ],
    equipment: "Vhodná podložka nebo rovná gymnastická plocha; žádné zátěže ani pomůcky k prodlužování výdrže.",
    space: "Suchá volná plocha bez překážek a dalších osob v dosahu.",
    progression: [
      "Začni pohodlným lehem na zádech a klidným dýcháním; trenér ověří, že poloha nevyvolává nepohodlí.",
      "Na krátký povel lehce zpevni trup bez zadržení dechu a poté vědomě uvolni.",
      "Přidej několikasekundovou výdrž pouze v rozsahu, který sportovec ovládá bez napětí či bolesti.",
      "Kartu ukonči na zemi. Žádné přidávání páky, zátěže nebo přechod do akrobatické dovednosti."
    ],
    drills: [
      { title: "Klidný dech a poloha", body: "V pohodlném lehu na zádech proveď 2–3 klidné nádechy a výdechy. Regrese: leh na boku nebo sed, pokud je příjemnější." },
      { title: "Zpevni a uvolni", body: "Na slovní povel lehce aktivuj trup na 2–3 sekundy a pak jej uvolni, aniž bys zadržoval dech. 3 opakování. Regrese: pouze klidné dýchání." },
      { title: "Kontrolované ukončení", body: "Po povelu trenéra se pomalu vrať do pohodlného sedu nebo stoje známým způsobem. Jedno opakování stačí; nezkoušej rychlé vstávání." }
    ],
    readiness: [
      "Sportovec dokáže v pozici klidně dýchat a na povel ji ukončit.",
      "Poloha i krátká aktivace jsou bez bolesti a bez nuceného rozsahu.",
      "Trenér nepoužívá tento drill jako automatické kritérium pro další dovednost."
    ],
    coaching: [
      "Použij nízkou intenzitu a krátké intervaly; žádné soutěžení o nejdelší výdrž.",
      "Připomínej přirozené dýchání a možnost kdykoli přestat.",
      "Pozorovatelný cíl je klidná kontrola polohy a návratu, ne maximální napětí."
    ],
    stopCriteria: [
      "Bolest, křeč, závratě, zadržování dechu, strach nebo odmítnutí.",
      "Neschopnost pohodlně opustit polohu nebo zhoršující se kontrola.",
      "Nevhodný povrch, překážky nebo nepřítomnost dohledu trenéra."
    ],
    regression: "Ukonči zpevnění a zůstaň u pohodlného lehu, sedu či jiné varianty bez aktivace. Pokud nepohodlí trvá, drill vynech a předej situaci odpovědné osobě klubu.",
    safeExit: "Sportovec se pomalu vrátí z lehu do pohodlného sedu nebo stoje známým způsobem. Drill neobsahuje převal, kotoul ani techniku záchrany.",
    safetyNote: "Přímý dohled trenéra. Nejde o rehabilitaci ani zdravotní doporučení. Při bolesti, závrati, křeči nebo potížích s dýcháním okamžitě přeruš. Nepoužívej délku výdrže jako důkaz připravenosti k prvku.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Obecný zdroj bezpečnostních zásad: dohled kvalifikovaného trenéra a prokázání dovednosti před progresí. Nepředepisuje tento kondiční drill." },
      { title: "ČACH – Platná bezpečnostní pravidla 2025/2026", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/platna-bezpecnostni-pravidla-2025_2026.pdf", organization: "ČACH", season: "2025/2026", checked: "2026-10-18", note: "Poslední zveřejněná příloha G na oficiálním rozcestníku v den kontroly; slouží jen jako obecný bezpečnostní kontext, nikoli jako potvrzení úrovně nebo vhodnosti cvičení." }
    ],
    rulesNote: "Přípravný drill bez soutěžního levelu a bez tvrzení o legalitě. Každou soutěžní dovednost ověř zvlášť podle konkrétní organizace, sezony, divize a věkové skupiny.",
    updatedAt: "2026-10-18"
  },
  {
    id: "tumbling-space-check",
    title: "Kontrola prostoru před akrobacií",
    variant: "Krátká kontrola plochy, dohledu a plánu zastavení před začátkem bloku",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: [],
    levelLabel: "Organizační kontrola · bez úrovně",
    status: "draft",
    statusLabel: "Bezpečnostní pomůcka · pravidla ověřit",
    use: "Organizační checklist pro trenéra před začátkem akrobatického bloku. Karta nepopisuje dovednost ani nepotvrzuje připravenost sportovce.",
    goal: "Před zahájením bloku ověřit, že trenér, skupina, plocha a plán zastavení odpovídají podmínkám konkrétního tréninku. Pokud něco nesedí, blok nezačíná.",
    roles: [
      "Trenér zkontroluje plochu, okolní provoz, dohled a klubový postup pro případ úrazu.",
      "Sportovci před začátkem vědí, kde čekají, jaký je povel k zastavení a komu oznámit bolest či nejistotu.",
      "Pozorovatelé nebo asistenti pracují jen v roli, kterou jim trenér předem určil."
    ],
    prerequisites: [
      "Odpovědný trenér je přítomen a zná plánovanou náplň bloku.",
      "Povrch je suchý, vhodný pro zamýšlenou aktivitu a bez překážek v pracovním prostoru.",
      "Skupina zná místo čekání, povel k zastavení a klubový postup při úrazu."
    ],
    equipment: "Checklist lze projít bez vybavení. Pomůcky pro konkrétní dovednost vybírá a kontroluje trenér samostatně.",
    space: "Zkontroluj pracovní plochu i její okolí; odstraň překážky a ověř bezpečný odstup od dalších skupin.",
    progression: [
      "Před blokem zkontroluj povrch a odstraň překážky z pracovní plochy i okolí.",
      "Ověř, že je přítomen odpovědný trenér, sportovci znají čekací prostor a nikdo nevstupuje do dráhy.",
      "Připomeň povel stop a klubový postup při úrazu; ověř dostupnost potřebné pomoci podle klubových pravidel.",
      "Pokud se změní prostor, dohled, únava skupiny nebo plán bloku, kontrolu zopakuj. Tato karta nepovoluje zahájení ani postup k dovednosti."
    ],
    drills: [
      { title: "Pomalá obchůzka plochy", body: "Trenér před blokem projde pracovní prostor a okolí, odstraní volné překážky a ověří, že povrch není mokrý ani poškozený. Při závadě plochu nepoužívej a postupuj podle pravidel klubu." },
      { title: "Kde čekáme a jak zastavíme", body: "Ještě v klidu ukaž čekací prostor a připomeň jediný srozumitelný povel stop. Každý může říct, komu oznámí bolest nebo nejistotu. Pokud si někdo není jistý, blok nezačínej." },
      { title: "Předání odpovědnosti", body: "Trenér krátce určí, kdo dohlíží na prostor a jak se přivolá pomoc podle klubového postupu. Karta nenahrazuje školení první pomoci ani klubový nouzový plán." }
    ],
    readiness: [
      "Pracovní plocha a okolí jsou suché, volné a odpovídají plánu trenéra.",
      "Odpovědný trenér je přítomen; skupina zná čekací prostor a povel stop.",
      "Trenér ví, jak se postupuje při úrazu, a osobně posoudil, zda má smysl blok zahájit."
    ],
    coaching: [
      "Kontrolu proveď před začátkem a zopakuj ji po změně prostoru nebo skupiny.",
      "Při pochybnosti blok odlož nebo změň na bezpečnou činnost na zemi.",
      "Checklist je připomínka, nikoli automatické schválení prostoru, dovednosti nebo sportovce."
    ],
    stopCriteria: [
      "Mokrý, poškozený nebo nevhodný povrch, překážka či nedostatek prostoru.",
      "Chybějící odpovědný trenér, nejasný dohled nebo neznámý postup při úrazu.",
      "Sportovec hlásí bolest, strach či nejistotu nebo skupina nerozumí povelu stop."
    ],
    regression: "Akrobatický blok vynech. Přesuň skupinu na bezpečnou činnost bez akrobatických pokusů, případně trénink přeruš, dokud trenér nedokáže podmínky znovu posoudit.",
    safeExit: "Tato karta neobsahuje pohybový drill ani sestup z dovednosti. Při stop-povelu sportovci zůstanou v bezpečném prostoru a vyčkají na pokyn trenéra; postup při úrazu určuje klubový plán.",
    safetyNote: "Přímý dohled odpovědného trenéra zůstává nutný po celý blok. Checklist sám nepotvrzuje bezpečnost konkrétního pokusu ani nenahrazuje klubový nouzový plán, první pomoc nebo oficiální pravidla.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Obecný mezinárodní zdroj pro kvalifikovaný dohled, vhodný povrch, volný prostor a plán reakce na úraz. Neověřuje pravidla konkrétní soutěže ČACH ani konkrétní trénink." },
      { title: "ČACH – Platná bezpečnostní pravidla 2025/2026", url: "https://pravidla.cach.cz/assets/pdfs/rules/cz/platna-bezpecnostni-pravidla-2025_2026.pdf", organization: "ČACH", season: "2025/2026", checked: "2026-10-18", note: "Dokument byl na oficiálním rozcestníku poslední zveřejněnou přílohou G v den kontroly. Slouží pouze jako bezpečnostní kontext; nepotvrzuje platnost pro sezonu 2026/2027." }
    ],
    rulesNote: "Bez soutěžní úrovně a bez tvrzení o legalitě. ČACH i pořadatel mohou mít další požadavky; ověř aktuální dokumenty pro konkrétní soutěž a sezonu.",
    updatedAt: "2026-10-18"
  },
  {
    id: "tumbling-lane-turns",
    title: "Čekací zóna a střídání akrobatické dráhy",
    variant: "Organizační nácvik pořadí a prostoru pouze v chůzi, bez akrobatických pokusů",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: [],
    levelLabel: "Přípravná organizace · bez úrovně",
    status: "draft",
    statusLabel: "Bezpečnostní pomůcka · pravidla ověřit",
    use: "Nácvik pohybu skupiny v prostoru v běžné chůzi. Nejde o akrobatický drill a neověřuje připravenost k žádné dovednosti.",
    goal: "Skupina si před akrobatickým blokem vyjasní, kde čekat, jak uvolnit pracovní dráhu a jak se vrátit mimo ni bez křížení s právě cvičícím sportovcem.",
    roles: [
      "Trenér určí pracovní prostor, bezpečné místo čekání a pořadí; toto uspořádání přizpůsobí konkrétnímu sálu.",
      "Sportovec projde trasu jen v běžné chůzi a zastaví na povel trenéra.",
      "Ostatní čekají mimo vyznačenou dráhu a vstupují do ní až po výslovném pokynu trenéra."
    ],
    prerequisites: [
      "Trenér předem zkontroloval vhodný, suchý povrch a odstranil překážky.",
      "Skupina zná čekací zónu, pracovní dráhu a srozumitelný povel stop.",
      "Nácvik probíhá pouze chůzí; žádné odrazy, převaly, stojky ani akrobatické prvky."
    ],
    equipment: "Vybavení není potřeba. Volitelné značky položí trenér mimo dráhu tak, aby o ně nikdo nemohl zakopnout.",
    space: "Použij jen prostor, který trenér osobně ověřil. Značení nesmí zužovat únikovou cestu ani vytvářet překážku.",
    progression: [
      "V klidu ukaž pracovní dráhu, čekací zónu a cestu zpět, která nekříží pracovní prostor.",
      "Jeden sportovec projde určenou trasu běžnou chůzí; ostatní zůstávají v čekací zóně.",
      "Na povel stop se sportovec zastaví a vyčká na trenéra; bez pokynu se další osoba nevydává.",
      "Změní-li se uspořádání sálu, skupina nebo provoz v okolí, trasu znovu projdi v klidu. Tento drill nikdy nepřechází do akrobatického pokusu."
    ],
    drills: [
      { title: "Ukaž trasu", body: "Trenér ukáže pracovní prostor, čekací zónu a návratovou cestu mimo dráhu. Sportovci je ukážou prstem nebo projdou v běžné chůzi; bez běhu a bez prvků." },
      { title: "Jeden vstup, jeden návrat", body: "Po jednom projde určený sportovec v chůzi a vrátí se mimo pracovní prostor. Ostatní čekají. Opakuj jen pokud je dráha volná a všichni rozumějí pořadí." },
      { title: "Povel stop", body: "Předem vysvětli povel. Při jeho vyslovení sportovec zastaví chůzi a vyčká na pokyn; nesimuluj srážku ani překvapivé situace." }
    ],
    readiness: [
      "Každý ví, kde čekat a kudy se vracet mimo pracovní dráhu.",
      "Skupina respektuje, že do dráhy vstupuje jen jedna osoba po pokynu trenéra.",
      "Trenér potvrdil, že prostor zůstává bezpečný; toto potvrzení se nevztahuje na žádný akrobatický pokus."
    ],
    coaching: [
      "Uspořádání přizpůsob skutečnému sálu; obecná karta neurčuje rozměry ani soutěžní plochu.",
      "Zastav nácvik, když někdo vstoupí do dráhy bez pokynu nebo si není jistý trasou.",
      "Nezvyšuj rychlost ani nepřidávej akrobatický prvek."
    ],
    stopCriteria: [
      "Nejasná trasa, překážka, mokrý či nevhodný povrch nebo pohyb jiných osob v dráze.",
      "Sportovec běží, zrychluje nebo se pokouší o prvek; někdo nerozumí povelu stop.",
      "Bolest, strach, nejistota nebo nepřítomnost odpovědného trenéra."
    ],
    regression: "Zastav pohyb. Trenér znovu ukáže čekací a pracovní zónu; skupina trasu pouze pojmenuje nebo ukáže prstem. Při nebezpečném prostoru drill vynech.",
    safeExit: "Jde pouze o chůzi. Na povel stop sportovec bezpečně zastaví a vyčká; trenér určí další postup. Karta neobsahuje sestup ani záchrannou techniku.",
    safetyNote: "Přímý dohled trenéra je nutný. Karta nepovoluje akrobatický pokus ani neověřuje soutěžní plochu. Před prvkem vždy samostatně zkontroluj konkrétní prostor a aktuální pravidla.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Podklad pro kvalifikovaný dohled a posouzení bezprostředního prostředí před dovedností. Nepředepisuje tento organizační drill ani rozměry plochy." },
      { title: "ČACH – Soutěžní plocha (příloha D), sezona 2026/2027", url: "https://pravidla.cach.cz/", organization: "ČACH", season: "2026/2027", checked: "2026-10-18", note: "Oficiální rozcestník odkazuje na novou přílohu D nahranou 18. 9. 2026. Ověř konkrétní soutěžní plochu v aktuálním dokumentu; tato karta nenahrazuje jeho rozměry ani požadavky." }
    ],
    rulesNote: "Bez soutěžní úrovně a bez tvrzení o legalitě. Rozměry a požadavky plochy ověř v dokumentu ČACH pro konkrétní soutěž a sezonu.",
    updatedAt: "2026-10-18"
  },
  {
    id: "coach-feedback-ground-drill",
    title: "Krátká zpětná vazba po přípravném drilu",
    variant: "Jedno pozorování a jeden další cíl po bezpečně ukončeném drilu na zemi",
    discipline: "tumbling",
    disciplineLabel: "Akrobacie",
    levels: [],
    levelLabel: "Trenérský postup · bez úrovně",
    status: "draft",
    statusLabel: "Trenérská pomůcka · pravidla ověřit",
    use: "Krátký rozhovor po dokončení známého drilu na zemi. Karta nehodnotí schopnosti ani nepovoluje přechod k náročnější dovednosti.",
    goal: "Trenér po ukončení pohybu sdělí jednu konkrétní pozorovatelnou pochvalu a jeden malý cíl pro příští opakování; sportovec může říct, jak mu drill připadal.",
    roles: [
      "Trenér vede rozhovor až po bezpečném ukončení drilu a nabídne jednoduchou, konkrétní zpětnou vazbu.",
      "Sportovec může odpovědět, požádat o pauzu nebo odmítnout další opakování bez tlaku.",
      "Pozorovatel popisuje jen viditelné chování a nesrovnává sportovce mezi sebou."
    ],
    prerequisites: [
      "Dril byl bezpečně ukončen a skupina je v klidové pozici.",
      "Trenér umí pojmenovat jeden konkrétní bod, který skutečně pozoroval.",
      "Rozhovor nevyžaduje sdílení zdravotních ani osobních údajů."
    ],
    equipment: "Vybavení není potřeba.",
    space: "Rozhovor probíhá mimo pracovní dráhu, bez spěchu a bez rušení právě cvičící skupiny.",
    progression: [
      "Ukonči pohyb, zajisti volnou pracovní dráhu a počkej, až je sportovec v klidu.",
      "Pojmenuj jednu konkrétní věc, kterou sportovec udělal podle zadání; vynech obecné soudy o talentu nebo těle.",
      "Nabídni jeden jednoduchý cíl pro další opakování stejného drilu a zeptej se, zda mu dává smysl.",
      "O dalším obsahu rozhodne trenér samostatně. Pochvala, počet opakování ani souhlas sportovce samy o sobě neznamenají připravenost na náročnější dovednost."
    ],
    drills: [
      { title: "Jedno pozorování", body: "Trenér řekne jednu konkrétní větu o právě dokončeném drilu, například „zastavil jsi na povel a počkal na pokyn“. Nepřidávej hodnocení těla ani porovnání s ostatními." },
      { title: "Jeden cíl", body: "Navrhni jeden dosažitelný cíl pro stejné přípravné cvičení. Sportovec může zvolit pauzu nebo cvičení ukončit. Cíl nesmí být pokynem k novému prvku." },
      { title: "Ověř porozumění", body: "Požádej sportovce, aby vlastními slovy řekl, co bude cílem příštího opakování. Pokud si není jistý, zjednoduš zadání nebo drill vynech." }
    ],
    readiness: [
      "Pohyb skončil a sportovec může v klidu poslouchat nebo rozhovor odmítnout.",
      "Zpětná vazba se týká pouze daného drilu a jednoho pozorovatelného bodu.",
      "Trenér výslovně neposouvá sportovce na další dovednost na základě počtu opakování či pochvaly."
    ],
    coaching: [
      "Mluv klidně a konkrétně; řeš provedení úkolu, ne hodnotu nebo tělo sportovce.",
      "Dej jeden bod najednou a nech prostor pro otázku nebo pauzu.",
      "Při bolesti, strachu či nejistotě ukonči hodnocení výkonu a postupuj podle klubových pravidel."
    ],
    stopCriteria: [
      "Sportovec hlásí bolest, strach, nepohodu nebo nechce pokračovat.",
      "Zpětná vazba sklouzává ke srovnávání, nátlaku nebo komentování těla.",
      "Trenér nemá ověřený další krok nebo by rozhovor vedl k automatickému postupu na náročnější prvek."
    ],
    regression: "Vynech rozbor; nabídni klid, pauzu nebo ukončení bloku. Pokud sportovec projeví bolest či jiné potíže, nepokračuj v drilu a předej situaci odpovědné osobě klubu.",
    safeExit: "Karta začíná až po ukončení pohybu. Sportovec zůstává v bezpečném prostoru, může odejít s trenérovým pokynem nebo si dát pauzu; žádný fyzický sestup ani dovednost se neprovádí.",
    safetyNote: "Tato pomůcka nenahrazuje kvalifikovaný dohled, individuální posouzení ani klubové postupy. Neukládej do aplikace zdravotní údaje. Zpětná vazba není diagnóza ani povolení k progresi.",
    sources: [
      { title: "ICU – Sport of Cheer Rules & Guidelines 2027, obecná bezpečnostní pravidla (str. 3)", url: "https://cheerunion.org/wp-content/uploads/2026/09/icu_2027_rules_ch-pc.pdf", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Pravidla ICU zdůrazňují dohled kvalifikovaného trenéra a ověření zvládnutí před progresí. Tento rozhovor je trenérská pomůcka, kterou dokument přímo nepředepisuje." },
      { title: "ICU – Safety Rules & Age Grid", url: "https://cheerunion.org/education-schedule/rules-agegrid/", organization: "ICU", season: "2027", checked: "2026-10-18", note: "Oficiální rozcestník aktuálních pravidel a bezpečnostních dokumentů; ověř verzi platnou pro konkrétní soutěž." }
    ],
    rulesNote: "Bez soutěžní úrovně a bez tvrzení o legalitě. Pravidla soutěže a rozhodnutí o progresi vždy ověř a určuj odděleně.",
    updatedAt: "2026-10-18"
  }
];
