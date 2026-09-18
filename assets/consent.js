/* Northride cookie consent — Google Consent Mode v2.
   The defaults (denied in the EEA, UK and Switzerland) are set inline in <head>, before the Google tag runs.
   This file only shows the banner, stores the visitor's choice and sends it to Google. */
(function () {
  var KEY = 'nr-consent', YEAR = 365 * 864e5;

  function read() {
    try { var c = JSON.parse(localStorage.getItem(KEY) || 'null'); return c && c.v && Date.now() - c.t < YEAR ? c.v : null; }
    catch (e) { return null; }
  }
  function save(v) {
    try { localStorage.setItem(KEY, JSON.stringify({ v: v, t: Date.now() })); } catch (e) {}
    if (typeof gtag === 'function') gtag('consent', 'update', { ad_storage: v, ad_user_data: v, ad_personalization: v, analytics_storage: v });
  }
  // Only ask visitors whose device is set to a European time zone; elsewhere Google's regional default applies.
  function inEurope() {
    try {
      var tz = Intl.DateTimeFormat().resolvedOptions().timeZone || '';
      return !tz || /^(Europe|Arctic)\//.test(tz) || /^Atlantic\/(Reykjavik|Canary|Madeira|Azores|Faroe|Faeroe)$/.test(tz);
    } catch (e) { return true; }
  }

  var css = '.cc{position:fixed;left:16px;right:16px;bottom:16px;z-index:300;max-width:560px;margin:0 auto 0 0;padding:22px 24px;' +
    'background:#121E33;border:1px solid rgba(160,185,220,.22);border-radius:16px;box-shadow:0 24px 70px -18px rgba(0,0,0,.75);' +
    'color:#EEF3FA;font:15px/1.55 "Hanken Grotesk",system-ui,sans-serif}' +
    '.cc h2{font:500 19px/1.3 "Fraunces",Georgia,serif;margin:0 0 8px;color:#EEF3FA}' +
    '.cc p{margin:0 0 16px;color:#B9C6DA;font-size:14.5px}.cc a{color:#EEF3FA;text-decoration:underline;text-underline-offset:3px}' +
    '.cc-btns{display:flex;gap:10px;flex-wrap:wrap}' +
    '.cc button{flex:1 1 150px;padding:12px 18px;border-radius:999px;font:600 14.5px/1 "Hanken Grotesk",system-ui,sans-serif;cursor:pointer;' +
    'border:1px solid rgba(217,179,106,.65);background:transparent;color:#EEF3FA}' +
    '.cc button:hover{background:rgba(217,179,106,.12)}.cc button:focus-visible{outline:2px solid #D9B36A;outline-offset:2px}' +
    '@media (max-width:600px){.cc{bottom:84px;padding:18px}}';

  var el;
  function close() { if (el) { el.remove(); el = null; } }
  function open() {
    if (el) return;
    if (!document.getElementById('cc-css')) { var st = document.createElement('style'); st.id = 'cc-css'; st.textContent = css; document.head.appendChild(st); }
    el = document.createElement('div');
    el.className = 'cc'; el.setAttribute('role', 'dialog'); el.setAttribute('aria-live', 'polite'); el.setAttribute('aria-label', 'Cookie consent');
    el.innerHTML = '<h2>Cookies, your choice</h2>' +
      '<p>We use Google Ads cookies to see which adverts lead to enquiries, so we can spend our budget sensibly. The site works the same either way. ' +
      '<a href="/privacy">Privacy &amp; cookies</a></p>' +
      '<div class="cc-btns"><button type="button" data-v="denied">Decline</button><button type="button" data-v="granted">Accept</button></div>';
    el.addEventListener('click', function (e) { var b = e.target.closest('button[data-v]'); if (b) { save(b.getAttribute('data-v')); close(); } });
    document.body.appendChild(el);
  }

  window.nrConsent = { open: open, status: read };
  document.addEventListener('click', function (e) { var a = e.target.closest && e.target.closest('[data-cookie-settings]'); if (a) { e.preventDefault(); open(); } });

  function init() { if (!read() && inEurope()) open(); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
