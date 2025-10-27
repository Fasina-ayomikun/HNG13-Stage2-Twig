window.Auth = (function () {
  const KEY = "ticketapp_session";
  function isAuthed() {
    try {
      return !!localStorage.getItem(KEY);
    } catch {
      return false;
    }
  }
  function login(email) {
    const p = { token: rid(), email, ts: Date.now() };
    localStorage.setItem(KEY, JSON.stringify(p));
    return p;
  }
  function logout() {
    localStorage.removeItem(KEY);
  }
  function rid() {
    return (
      Math.random().toString(36).slice(2) + Date.now().toString(36)
    ).toUpperCase();
  }
  return { isAuthed, login, logout };
})();
