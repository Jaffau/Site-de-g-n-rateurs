/* /shared/lang.js */
(function () {
  const i18n = window.RANDIFY_I18N || {};

  function getLangFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const lang = params.get("lang");
    return lang && i18n[lang] ? lang : null;
  }

  function appendLangToUrl(url, lang) {
    // Keep hash and preserve existing query params
    const [baseAndQuery, hash] = url.split("#");
    const [base, query] = baseAndQuery.split("?");
    const params = new URLSearchParams(query || "");
    params.set("lang", lang);
    const out = `${base}?${params.toString()}`;
    return hash ? `${out}#${hash}` : out;
  }

  function applyTexts(lang) {
    document.documentElement.lang = lang;

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      const key = el.getAttribute("data-i18n");
      const val = i18n[lang] && i18n[lang][key];
      if (val) el.textContent = val;
    });
  }

  function applyRTL(lang) {
    if (lang === "ar") document.body.classList.add("rtl");
    else document.body.classList.remove("rtl");
  }

  function rewriteLinks(lang) {
    // Home link (used on generator pages + legal pages)
    const homeLink =
      document.getElementById("homeLink") ||
      document.querySelector('[data-home-link="true"]');

    if (homeLink) {
      const base =
        homeLink.getAttribute("data-page") ||
        homeLink.getAttribute("href") ||
        "../index.html";
      homeLink.setAttribute("href", appendLangToUrl(base, lang));
    }

    // Any generator link with .gen-link keeps lang
    document.querySelectorAll(".gen-link").forEach((a) => {
      const base = a.getAttribute("data-page") || a.getAttribute("href");
      if (!base) return;
      a.setAttribute("href", appendLangToUrl(base, lang));
    });

    // Optional: legal links keep lang too
    document.querySelectorAll(".legal-link").forEach((a) => {
      const base = a.getAttribute("data-page") || a.getAttribute("href");
      if (!base) return;
      a.setAttribute("href", appendLangToUrl(base, lang));
    });
  }

  function setLanguage(lang) {
    localStorage.setItem("randifyLang", lang);
    applyTexts(lang);
    rewriteLinks(lang);
    applyRTL(lang);
  }

  function init() {
    const select = document.getElementById("langSelect");

    const initial =
      getLangFromUrl() || localStorage.getItem("randifyLang") || "en";

    if (select) select.value = initial;
    setLanguage(initial);

    if (select) {
      select.addEventListener("change", () => {
        setLanguage(select.value);
      });
    }
  }

  // Expose helper (optional)
  window.RandifyLang = { setLanguage };

  document.addEventListener("DOMContentLoaded", init);
})();
