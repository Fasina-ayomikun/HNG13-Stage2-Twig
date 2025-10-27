window.Tickets = (function () {
  const KEY = "ticketapp_tickets";
  const VALID = ["open", "in_progress", "closed"];
  function getTickets() {
    const r = localStorage.getItem(KEY);
    if (r) {
      try {
        return JSON.parse(r);
      } catch {}
    }
    return seedTickets();
  }
  function setTickets(list) {
    localStorage.setItem(KEY, JSON.stringify(list));
  }
  function createTicket(t) {
    const all = getTickets();
    const x = norm(t);
    all.unshift(x);
    setTickets(all);
    return x;
  }
  function updateTicket(id, patch) {
    const all = getTickets();
    const i = all.findIndex((t) => t.id === id);
    if (i === -1) return null;
    const u = { ...all[i], ...norm(patch, false) };
    u.updatedAt = Date.now();
    all[i] = u;
    setTickets(all);
    return u;
  }
  function deleteTicket(id) {
    const all = getTickets();
    const f = all.filter((t) => t.id !== id);
    setTickets(f);
    return f.length !== all.length;
  }
  function statusCounts(items = getTickets()) {
    const c = { total: items.length, open: 0, in_progress: 0, closed: 0 };
    for (const t of items) {
      if (t.status === "open") c.open++;
      else if (t.status === "in_progress") c.in_progress++;
      else if (t.status === "closed") c.closed++;
    }
    return c;
  }
  function norm(input, fill = true) {
    const now = Date.now();
    const base = fill
      ? {
          id: rid(),
          title: "Untitled",
          status: "open",
          description: "",
          priority: "medium",
          createdAt: now,
          updatedAt: now,
        }
      : {};
    const t = { ...base, ...input };
    if (!VALID.includes(t.status)) t.status = "open";
    if (!t.title || !t.title.trim()) t.title = "Untitled";
    return t;
  }
  function seedTickets() {
    const demo = [
      {
        id: rid(),
        title: "Cannot reset password",
        status: "open",
        description: "Reset link not working",
        priority: "high",
        createdAt: Date.now() - 86400000 * 2,
        updatedAt: Date.now() - 86400000,
      },
      {
        id: rid(),
        title: "Chart misaligned",
        status: "in_progress",
        description: "UI glitch on Safari",
        priority: "medium",
        createdAt: Date.now() - 86400000 * 4,
        updatedAt: Date.now() - 3600000 * 6,
      },
      {
        id: rid(),
        title: "Migrate FAQ to CMS",
        status: "closed",
        description: "Completed & reviewed",
        priority: "low",
        createdAt: Date.now() - 86400000 * 10,
        updatedAt: Date.now() - 86400000 * 5,
      },
    ];
    setTickets(demo);
    return demo;
  }
  function rid() {
    return (
      Math.random().toString(36).slice(2) + Date.now().toString(36)
    ).toUpperCase();
  }
  return {
    getTickets,
    setTickets,
    createTicket,
    updateTicket,
    deleteTicket,
    statusCounts,
  };
})();
