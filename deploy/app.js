/* Victus Cloud – Staff Rules · app logic (vanilla JS, no frameworks).
   Content lives in data.js → STAFF_RULES_DATA. */
(function () {
"use strict";
var DATA = STAFF_RULES_DATA;
var THEME_KEY = "victus_staff_theme";
var SESSION_KEY = "victus_staff_unlocked_v1";
var state = { unlocked: false, role: "All", specificOnly: false, query: "", open: {}, toast: null };
var LOGO_SVG = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#863ffd"/><stop offset="1" stop-color="#eca4f8"/></linearGradient></defs><rect width="80" height="80" rx="16" fill="#0b0425"/><path d="M16 20h15l-4 17a4 4 0 0 0 4 5h14a4 4 0 0 0 4-5l-4-17h15l-9 27a12 12 0 0 1-11 8h-8a12 12 0 0 1-11-8z" fill="url(#g)"/></svg>'
);
function $(id) { return document.getElementById(id); }

/* ---------- helpers ---------- */
function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
}
function rx(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }
function hl(text, q) {
  var query = (q || "").trim();
  if (!query) return esc(text);
  return String(text).split(new RegExp("(" + rx(query) + ")", "gi")).map(function (part, i) {
    return i % 2 ? "<mark>" + esc(part) + "</mark>" : esc(part);
  }).join("");
}
function domId(id) { return "rule-" + String(id).replace(/\./g, "-"); }
function parseHash() {
  var raw = (window.location.hash || "").replace(/^#/, "").trim();
  if (!raw) return null;
  try { raw = decodeURIComponent(raw); } catch (e) {}
  if (raw === "punishments" || raw === "changelog") return { type: "special", id: raw };
  var sec = raw.match(/^section-(\d+)$/i);
  if (sec) return { type: "section", num: +sec[1] };
  var cleaned = raw.replace(/^rule-/i, "").replace(/-/g, ".");
  if (/^\d+\.\d+$/.test(cleaned)) return { type: "rule", id: cleaned };
  return null;
}
function say(msg) {
  var t = $("toast");
  if (!t) return;
  t.textContent = msg;
  t.hidden = false;
  if (state.toast) clearTimeout(state.toast);
  state.toast = setTimeout(function () { t.hidden = true; }, 2400);
}
function applyTheme(name) {
  var t = (name === "light" || name === "grey" || name === "oled") ? name : "oled";
  document.documentElement.setAttribute("data-theme", t);
  try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  var meta = $("meta-theme-color");
  if (meta) meta.setAttribute("content", t === "light" ? "#f5f1fa" : t === "grey" ? "#1b1823" : "#000000");
  var i;
  for (i = 0; i < document.querySelectorAll("[data-set-theme]").length; i++) {
    var b = document.querySelectorAll("[data-set-theme]")[i];
    b.setAttribute("aria-pressed", b.getAttribute("data-set-theme") === t ? "true" : "false");
  }
}
function fallbackCopy(text) {
  var ta = document.createElement("textarea");
  ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
  document.body.appendChild(ta); ta.select();
  try { document.execCommand("copy"); } catch (e) {}
  document.body.removeChild(ta);
}
function copyText(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () { fallbackCopy(text); });
  }
  return Promise.resolve(fallbackCopy(text));
}

/* ---------- filters ---------- */
function ruleInRole(r) {
  if (state.role === "All") return true;
  if (state.specificOnly) return r.roles.indexOf(state.role) !== -1;
  return r.roles.indexOf("All") !== -1 || r.roles.indexOf(state.role) !== -1;
}
function ruleMatches(r, sectionTitle, q) {
  if (!q) return true;
  var s = q.toLowerCase(), i;
  if (r.id.toLowerCase().indexOf(s) !== -1 || r.text.toLowerCase().indexOf(s) !== -1) return true;
  if (sectionTitle.toLowerCase().indexOf(s) !== -1) return true;
  for (i = 0; i < r.roles.length; i++) if (r.roles[i].toLowerCase().indexOf(s) !== -1) return true;
  return false;
}
function rowMatches(row, q) {
  if (!q) return true;
  var s = q.toLowerCase();
  return row.offense.toLowerCase().indexOf(s) !== -1 || row.severity.toLowerCase().indexOf(s) !== -1 || row.action.toLowerCase().indexOf(s) !== -1;
}
function sevClass(sev) {
  var s = String(sev).toLowerCase();
  return "sev " + (s === "low" ? "lo" : s === "medium" ? "md" : s === "high" ? "hi" : "cr");
}

/* ---------- render ---------- */
function renderChips() {
  var wrap = $("chips");
  if (!wrap) return;
  wrap.innerHTML = DATA.roles.map(function (role) {
    return '<button type="button" class="chip" data-role="' + esc(role) + '" aria-pressed="' + (state.role === role) + '">' + esc(role) + "</button>";
  }).join("");
}
function trigger(key, label, num, count, open) {
  return '<button type="button" class="acc" data-sec="' + key + '" aria-expanded="' + open + '" aria-controls="panel-' + key + '">' +
    '<span class="acc-l"><span class="num">' + num + '</span><span class="acc-title">' + label + "</span></span>" +
    '<span class="acc-r"><span class="pill">' + count + "</span>" +
    '<svg class="chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"></polyline></svg>' +
    "</span></button>";
}
function render() {
  var host = $("sections");
  if (!host) return;
  var q = state.query.trim();
  var filtering = q.length > 0 || state.role !== "All";
  var matched = 0, specific = 0, out = [];

  DATA.sections.forEach(function (sec) {
    var key = "section-" + sec.number;
    var rows = sec.rules.filter(function (r) {
      var hit = ruleInRole(r) && ruleMatches(r, sec.title, q);
      if (hit && state.role !== "All" && r.roles.indexOf(state.role) !== -1) specific++;
      return hit;
    });
    if (!rows.length) return;
    matched += rows.length;
    var open = q ? true : state.open[key] !== false;
    var items = rows.map(function (r) {
      var tags = r.roles.map(function (role) {
        return '<span class="tag' + (role === "All" ? "" : " specific") + '">' + hl(role, q) + "</span>";
      }).join("");
      return '<li id="' + domId(r.id) + '" class="rule" tabindex="-1"><div class="rule-body">' +
        '<div class="rule-top"><span class="rule-id">' + hl(r.id, q) + '</span><p class="rule-text">' + hl(r.text, q) + "</p></div>" +
        '<div class="tagrow" aria-label="Applies to">' + tags + "</div></div>" +
        '<button type="button" class="copy" data-copy="' + esc(r.id) + '" aria-label="Copy link to rule ' + esc(r.id) + '" title="Copy link to rule ' + esc(r.id) + '">' +
        '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg>' +
        '<span>Link</span></button></li>';
    }).join("");
    out.push('<section id="' + key + '" class="sec">' +
      trigger(key, hl(sec.number + ". " + sec.title, q), sec.number, rows.length === 1 ? "1 rule" : rows.length + " rules", open) +
      '<div id="panel-' + key + '" class="panel"' + (open ? "" : " hidden") + '><ul class="rules">' + items + "</ul></div></section>");
  });

  var mem = DATA.punishments.members.rows.filter(function (r) { return rowMatches(r, q); });
  var stf = DATA.punishments.staff.rows.filter(function (r) { return rowMatches(r, q); });
  if ((!q || mem.length || stf.length) && !state.specificOnly) {
    var pOpen = q ? true : state.open.punishments !== false;
    function table(rows, heading, aria) {
      if (!rows.length) return "";
      return '<div class="pblock"><h3>' + esc(heading) + "</h3>" +
        '<div class="tscroll" role="region" aria-label="' + aria + '" tabindex="0"><table class="ptab"><thead><tr>' +
        '<th scope="col">Offense</th><th scope="col">Severity</th><th scope="col">Action</th></tr></thead><tbody>' +
        rows.map(function (row) {
          return "<tr><td>" + hl(row.offense, q) + '</td><td><span class="' + sevClass(row.severity) + '">' + hl(row.severity, q) + "</span></td><td>" + hl(row.action, q) + "</td></tr>";
        }).join("") + "</tbody></table></div></div>";
    }
    out.push('<section id="punishments" class="sec">' +
      trigger("punishments", hl(DATA.punishments.title, q), "P", "2 tables", pOpen) +
      '<div id="panel-punishments" class="panel"' + (pOpen ? "" : " hidden") + ">" +
      table(mem, DATA.punishments.members.heading, "Member punishment table") +
      table(stf, DATA.punishments.staff.heading, "Staff punishment table") + "</div></section>");
  }

  var log = DATA.changelog.filter(function (e) {
    if (!q) return true;
    var s = q.toLowerCase();
    return e.version.toLowerCase().indexOf(s) !== -1 || e.date.toLowerCase().indexOf(s) !== -1 || e.summary.toLowerCase().indexOf(s) !== -1 || "changelog".indexOf(s) !== -1;
  });
  if (log.length && !state.specificOnly && (matched > 0 || !q)) {
    var cOpen = q ? true : state.open.changelog !== false;
    out.push('<section id="changelog" class="sec">' +
      trigger("changelog", "CHANGELOG", "C", esc(DATA.meta.version), cOpen) +
      '<div id="panel-changelog" class="panel"' + (cOpen ? "" : " hidden") + '><ul class="log">' +
      log.map(function (e) {
        return '<li><div class="log-head"><span class="ver">' + hl(e.version, q) + '</span><span class="date">' + hl(e.date, q) + '</span></div><p>' + hl(e.summary, q) + "</p></li>";
      }).join("") + "</ul></div></section>");
  }

  var badge = $("count");
  if (badge) badge.textContent = matched === 1 ? "1 rule" : matched + " rules";

  var anyRules = matched > 0, anyTables = mem.length > 0 || stf.length > 0;
  if (anyRules || (q && anyTables)) {
    $("empty").hidden = true;
    host.innerHTML = out.join("");
  } else {
    host.innerHTML = "";
    $("empty").hidden = false;
    $("empty-desc").textContent = (state.specificOnly && state.role !== "All" && !q)
      ? 'No role-exclusive rules exist for "' + state.role + '" — the general ("All") staff rules apply to this role.'
      : 'No staff rules matched "' + (q || state.role) + '". Try another keyword or clear the filters.';
  }

  var bar = $("filter-bar"), only = $("specific-btn");
  if (filtering) {
    bar.hidden = false;
    var txt = "Showing " + matched + (matched === 1 ? " rule" : " rules");
    if (state.role !== "All") txt += " for " + state.role;
    if (q) txt += ' matching "' + q + '"';
    $("filter-text").textContent = txt;
    if (state.role !== "All") { only.hidden = false; only.setAttribute("aria-pressed", state.specificOnly); only.textContent = "Role-specific only (" + specific + ")"; }
    else only.hidden = true;
  } else bar.hidden = true;
}

/* ---------- deep links ---------- */
function gotoHash(smooth) {
  if (!state.unlocked) return;
  var t = parseHash();
  if (!t) return;
  var behavior = smooth && !window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "smooth" : "auto";
  if (t.type === "rule") {
    if (!document.getElementById(domId(t.id)) && (state.query || state.role !== "All")) {
      state.query = ""; state.role = "All"; state.specificOnly = false;
      $("rule-search").value = ""; $("search-x").hidden = true; renderChips();
    }
    state.open["section-" + t.id.split(".")[0]] = true;
    render();
    var el = document.getElementById(domId(t.id));
    if (el) {
      var old = document.querySelectorAll(".rule.hit"), i;
      for (i = 0; i < old.length; i++) old[i].classList.remove("hit");
      el.classList.add("hit");
      requestAnimationFrame(function () { el.scrollIntoView({ behavior: behavior, block: "center" }); el.focus({ preventScroll: true }); });
    }
  } else if (t.type === "section") {
    state.open["section-" + t.num] = true; render();
    var s = $("section-" + t.num);
    if (s) s.scrollIntoView({ behavior: behavior, block: "start" });
  } else {
    state.open[t.id] = true; render();
    var p = $(t.id);
    if (p) p.scrollIntoView({ behavior: behavior, block: "start" });
  }
}

/* ---------- gate ---------- */
function setUnlocked(on) {
  state.unlocked = on;
  document.documentElement.setAttribute("data-locked", on ? "false" : "true");
  if (on) {
    try { sessionStorage.setItem(SESSION_KEY, "1"); } catch (e) {}
    $("password-gate").hidden = true;
    $("app-shell").hidden = false;
    renderChips(); render();
    if (window.location.hash) gotoHash(false);
  } else {
    try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {}
    $("app-shell").hidden = true;
    $("password-gate").hidden = false;
    var pw = $("gate-password");
    pw.value = ""; pw.focus();
  }
}

/* ---------- boot ---------- */
(function boot() {
  var i;
  DATA.sections.forEach(function (s) { state.open["section-" + s.number] = true; });
  state.open.punishments = true; state.open.changelog = true;

  document.title = DATA.meta.title;
  $("site-title").textContent = DATA.meta.title;
  $("gate-heading").textContent = DATA.meta.title;
  $("gate-meta").textContent = DATA.meta.version + " · " + DATA.meta.lastUpdated;
  $("ver-pill").textContent = DATA.meta.version;
  $("updated").textContent = "Updated " + DATA.meta.lastUpdated;
  $("agreement-title-text").textContent = DATA.agreement.title;
  $("agreement-text").textContent = DATA.agreement.text;
  $("foot-copy").textContent = DATA.meta.copyright + " · " + DATA.meta.location;
  $("foot-stamp").textContent = "Last updated: " + DATA.meta.lastUpdated + " (" + DATA.meta.version + ")";
  $("foot-links").innerHTML = DATA.meta.footerLinks.map(function (l) {
    return '<a href="' + esc(l.url) + '" target="_blank" rel="noopener noreferrer"><span>' + esc(l.label) + "</span>" +
      '<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><line x1="7" y1="17" x2="17" y2="7"></line><polyline points="7 7 17 7 17 17"></polyline></svg></a>';
  }).join("");
  var deep = parseHash();
  if (deep && deep.type === "rule") {
    var note = $("gate-note");
    note.hidden = false;
    note.textContent = "Deep link detected: Rule " + deep.id + " opens automatically once unlocked.";
  }

  /* logo fallback so a missing file never shows a broken image */
  var logos = document.querySelectorAll("img[data-logo]");
  for (i = 0; i < logos.length; i++) {
    logos[i].addEventListener("error", function () {
      if (this.getAttribute("src") !== LOGO_SVG) {
        this.setAttribute("src", LOGO_SVG);
        var f = $("favicon");
        if (f) f.setAttribute("href", LOGO_SVG);
      }
    });
  }

  document.addEventListener("click", function (e) {
    var el = e.target.closest ? e.target : e.target.parentNode;
    var theme = el.closest("[data-set-theme]");
    if (theme) { applyTheme(theme.getAttribute("data-set-theme")); return; }
    var acc = el.closest("[data-sec]");
    if (acc) {
      var k = acc.getAttribute("data-sec");
      var was = acc.getAttribute("aria-expanded") === "true";
      state.open[k] = !was;
      acc.setAttribute("aria-expanded", String(!was));
      $("panel-" + k).hidden = was;
      return;
    }
    var chip = el.closest("[data-role]");
    if (chip) {
      state.role = chip.getAttribute("data-role");
      if (state.role === "All") state.specificOnly = false;
      renderChips(); render();
      var act = document.querySelector('[data-role="' + (window.CSS && CSS.escape ? CSS.escape(state.role) : state.role) + '"]');
      if (act) act.scrollIntoView({ inline: "nearest", block: "nearest" });
      return;
    }
    var cp = el.closest("[data-copy]");
    if (cp) {
      var id = cp.getAttribute("data-copy");
      var url = window.location.origin + window.location.pathname + "#" + id;
      try { history.replaceState(null, "", "#" + id); } catch (err) { window.location.hash = id; }
      var old2 = document.querySelectorAll(".rule.hit"), j;
      for (j = 0; j < old2.length; j++) old2[j].classList.remove("hit");
      var card = document.getElementById(domId(id));
      if (card) card.classList.add("hit");
      copyText(url).then(function () {
        cp.classList.add("done");
        say("Copied link to Rule " + id);
        setTimeout(function () { cp.classList.remove("done"); }, 1800);
      });
    }
  });

  $("gate-form").addEventListener("submit", function (e) {
    e.preventDefault();
    var v = $("gate-password").value;
    if (v === DATA.meta.password || v.trim() === DATA.meta.password) {
      $("gate-error").hidden = true;
      setUnlocked(true);
    } else {
      $("gate-error").hidden = false;
      $("gate-password").focus();
      $("gate-password").select();
    }
  });
  $("gate-password").addEventListener("input", function () { $("gate-error").hidden = true; });
  $("toggle-eye").addEventListener("click", function () {
    var inp = $("gate-password");
    var shown = inp.type === "text";
    inp.type = shown ? "password" : "text";
    this.setAttribute("aria-pressed", String(!shown));
    this.setAttribute("aria-label", shown ? "Show password" : "Hide password");
  });
  $("lock-btn").addEventListener("click", function () { setUnlocked(false); });
  $("print-btn").addEventListener("click", function () { window.print(); });
  $("expand-all").addEventListener("click", function () {
    Object.keys(state.open).forEach(function (k) { state.open[k] = true; });
    render();
  });
  $("collapse-all").addEventListener("click", function () {
    Object.keys(state.open).forEach(function (k) { state.open[k] = false; });
    render();
  });
  $("rule-search").addEventListener("input", function () {
    state.query = this.value;
    $("search-x").hidden = state.query.length === 0;
    render();
  });
  $("search-x").addEventListener("click", function () {
    state.query = ""; $("rule-search").value = ""; this.hidden = true; render(); $("rule-search").focus();
  });
  $("specific-btn").addEventListener("click", function () { state.specificOnly = !state.specificOnly; render(); });
  function reset() {
    state.query = ""; state.role = "All"; state.specificOnly = false;
    $("rule-search").value = ""; $("search-x").hidden = true;
    renderChips(); render();
  }
  $("reset-btn").addEventListener("click", reset);
  $("empty-reset").addEventListener("click", reset);
  window.addEventListener("hashchange", function () { gotoHash(true); });
  var top = $("totop");
  window.addEventListener("scroll", function () {
    if (!state.unlocked) return;
    top.hidden = (window.scrollY || document.documentElement.scrollTop || 0) < 320;
  }, { passive: true });
  top.addEventListener("click", function () {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
  if (window.visualViewport) {
    var baseH = window.innerHeight;
    window.visualViewport.addEventListener("resize", function () {
      var shrunk = baseH - window.visualViewport.height > 140;
      document.documentElement.setAttribute("data-keyboard-open", shrunk ? "true" : "false");
      if (shrunk) top.hidden = true;
    });
  }
  var saved = null;
  window.addEventListener("beforeprint", function () {
    if (!state.unlocked) return;
    if (state.query || state.role !== "All") {
      saved = { q: state.query, r: state.role, s: state.specificOnly };
      state.query = ""; state.role = "All"; state.specificOnly = false;
    }
    Object.keys(state.open).forEach(function (k) { state.open[k] = true; });
    render();
  });
  window.addEventListener("afterprint", function () {
    if (saved) { state.query = saved.q; state.role = saved.r; state.specificOnly = saved.s; saved = null; render(); }
  });

  try { applyTheme(localStorage.getItem(THEME_KEY) || "oled"); } catch (e) { applyTheme("oled"); }
  var was = false;
  try { was = sessionStorage.getItem(SESSION_KEY) === "1"; } catch (e) {}
  setUnlocked(was);
})();
})();
