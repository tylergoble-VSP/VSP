/* ============================================================
   VSP Auth Gate
   Drop-in password protection for any HTML page.
   Include via: <script src="/assets/js/auth-gate.js"></script>

   Stores a session token in localStorage so users only
   enter the password once per browser.
   ============================================================ */
(function () {
  var HASH = '4c9187cfae578ef1f84edaf9103abcfc953d825a6ebf4e963f21e34e202f6a8a';
  var SESSION_KEY = 'vsp_auth';
  var SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days

  function sha256(str) {
    var encoder = new TextEncoder();
    var data = encoder.encode(str);
    return crypto.subtle.digest('SHA-256', data).then(function (buf) {
      return Array.from(new Uint8Array(buf))
        .map(function (b) { return b.toString(16).padStart(2, '0'); })
        .join('');
    });
  }

  function checkSession() {
    try {
      var session = JSON.parse(localStorage.getItem(SESSION_KEY));
      if (session && session.hash === HASH && Date.now() < session.expires) {
        return true;
      }
    } catch (e) {}
    return false;
  }

  function setSession() {
    localStorage.setItem(SESSION_KEY, JSON.stringify({
      hash: HASH,
      expires: Date.now() + SESSION_DURATION
    }));
  }

  function showGate() {
    document.documentElement.style.overflow = 'hidden';
    var overlay = document.createElement('div');
    overlay.id = 'vsp-auth-overlay';
    overlay.innerHTML = [
      '<style>',
      '#vsp-auth-overlay{position:fixed;inset:0;z-index:99999;background:#0f172a;display:flex;align-items:center;justify-content:center;font-family:Inter,-apple-system,BlinkMacSystemFont,sans-serif}',
      '#vsp-auth-box{text-align:center;padding:48px;max-width:400px;width:90%}',
      '#vsp-auth-box img{height:36px;margin-bottom:32px}',
      '#vsp-auth-box h2{color:#f8fafc;font-size:20px;font-weight:600;margin-bottom:8px}',
      '#vsp-auth-box p{color:#94a3b8;font-size:14px;margin-bottom:24px}',
      '#vsp-auth-input{width:100%;padding:12px 16px;border-radius:8px;border:1px solid #334155;background:#1e293b;color:#e2e8f0;font-size:14px;outline:none;font-family:inherit}',
      '#vsp-auth-input:focus{border-color:#4a9eff;box-shadow:0 0 0 3px rgba(74,158,255,0.15)}',
      '#vsp-auth-btn{width:100%;margin-top:12px;padding:12px;border-radius:8px;border:none;background:#4a9eff;color:#fff;font-size:14px;font-weight:600;cursor:pointer;font-family:inherit;transition:background 0.2s}',
      '#vsp-auth-btn:hover{background:#3b8de6}',
      '#vsp-auth-error{color:#f87171;font-size:13px;margin-top:12px;display:none}',
      '</style>',
      '<div id="vsp-auth-box">',
      '  <img src="/assets/images/vsp-logo.svg" alt="VSP">',
      '  <h2>Access Required</h2>',
      '  <p>Enter the password to continue.</p>',
      '  <form id="vsp-auth-form">',
      '    <input id="vsp-auth-input" type="password" placeholder="Password" autocomplete="off" autofocus>',
      '    <button id="vsp-auth-btn" type="submit">Enter</button>',
      '  </form>',
      '  <div id="vsp-auth-error">Incorrect password</div>',
      '</div>'
    ].join('\n');

    document.body.appendChild(overlay);

    document.getElementById('vsp-auth-form').addEventListener('submit', function (e) {
      e.preventDefault();
      var input = document.getElementById('vsp-auth-input').value;
      sha256(input).then(function (hash) {
        if (hash === HASH) {
          setSession();
          overlay.remove();
          document.documentElement.style.overflow = '';
        } else {
          document.getElementById('vsp-auth-error').style.display = 'block';
          document.getElementById('vsp-auth-input').value = '';
          document.getElementById('vsp-auth-input').focus();
        }
      });
    });
  }

  if (!checkSession()) {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', showGate);
    } else {
      showGate();
    }
  }
})();
