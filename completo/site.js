// Modelo Completo: troca de idioma (PT/EN), filtro do portfólio e formulário de exemplo.
(function () {
  var KEY = "modelo-completo-lang";

  function readLang() {
    try { return localStorage.getItem(KEY) || "pt"; } catch (e) { return "pt"; }
  }
  function saveLang(lang) {
    try { localStorage.setItem(KEY, lang); } catch (e) { /* sem armazenamento: só não lembra */ }
  }

  function applyLang(lang) {
    var en = lang === "en";
    document.documentElement.lang = en ? "en" : "pt-BR";
    document.querySelectorAll("[data-en]").forEach(function (el) {
      if (!el.hasAttribute("data-pt")) el.setAttribute("data-pt", el.textContent);
      el.textContent = en ? el.getAttribute("data-en") : el.getAttribute("data-pt");
    });
    document.querySelectorAll("[data-en-placeholder]").forEach(function (el) {
      if (!el.hasAttribute("data-pt-placeholder")) el.setAttribute("data-pt-placeholder", el.placeholder);
      el.placeholder = en ? el.getAttribute("data-en-placeholder") : el.getAttribute("data-pt-placeholder");
    });
    var toggle = document.querySelector("[data-lang-toggle]");
    if (toggle) toggle.setAttribute("aria-label", en ? "Mudar para português" : "Switch to English");
  }

  var lang = readLang();
  applyLang(lang);

  var toggle = document.querySelector("[data-lang-toggle]");
  if (toggle) {
    toggle.addEventListener("click", function () {
      lang = lang === "en" ? "pt" : "en";
      saveLang(lang);
      applyLang(lang);
    });
  }

  // Filtro do portfólio por categoria
  var filters = document.querySelectorAll("[data-filter]");
  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      var type = btn.getAttribute("data-filter");
      filters.forEach(function (b) { b.setAttribute("aria-pressed", String(b === btn)); });
      document.querySelectorAll("[data-type]").forEach(function (item) {
        item.hidden = type !== "todos" && item.getAttribute("data-type") !== type;
      });
      document.querySelectorAll(".year-group").forEach(function (group) {
        group.hidden = !group.querySelector("[data-type]:not([hidden])");
      });
    });
  });

  // Formulário de exemplo: não envia nada
  var form = document.querySelector("[data-demo-form]");
  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var status = form.querySelector(".form-status");
      status.textContent = lang === "en"
        ? "This is a template: sending is set up on the real site."
        : "Isto é um modelo: o envio é configurado no site real.";
    });
  }
})();
