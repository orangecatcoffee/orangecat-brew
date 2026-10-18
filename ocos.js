/* MAEWSOM OS — shared theme control. Load in <head>:  <script src="https://orangecat-brew.vercel.app/ocos.js"></script>
   Applies the saved theme before first paint and adds ONE switch (top-right) to every tool.
   Dark is the default; the choice is remembered per device (per app address). */
(function () {
  var KEY = 'ocosTheme', root = document.documentElement;
  function saved() { try { return localStorage.getItem(KEY); } catch (e) { return null; } }
  function apply(t) {
    if (t === 'day') root.setAttribute('data-theme', 'day'); else root.removeAttribute('data-theme');
    var m = document.querySelector('meta[name="theme-color"]'); if (m) m.setAttribute('content', t === 'day' ? '#0F1E36' : '#0F2036');
    var b = document.getElementById('ocosTheme');
    if (b) { b.setAttribute('aria-label', t === 'day' ? 'เปลี่ยนเป็นโหมดมืด' : 'เปลี่ยนเป็นโหมดกลางวัน'); b.title = b.getAttribute('aria-label'); }
  }
  apply(saved() === 'day' ? 'day' : 'dark');
  window.toggleTheme = function () {
    var next = root.getAttribute('data-theme') === 'day' ? 'dark' : 'day';
    try { localStorage.setItem(KEY, next); } catch (e) {}
    apply(next);
  };
  function mount() {
    if (document.getElementById('ocosTheme')) return;
    var b = document.createElement('button'); b.type = 'button'; b.id = 'ocosTheme';
    b.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="8.5"/><path d="M12 3.5a8.5 8.5 0 0 1 0 17z" fill="currentColor" stroke="none"/></svg>';
    b.addEventListener('click', window.toggleTheme);
    document.body.appendChild(b);
    apply(root.getAttribute('data-theme') === 'day' ? 'day' : 'dark');
  }
  if (document.body) mount(); else document.addEventListener('DOMContentLoaded', mount);
})();
