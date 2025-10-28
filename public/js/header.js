(function () {
  const qs = (s, r = document) => r.querySelector(s);

  const toggle = qs("#hdr-menu-toggle");
  const backdrop = qs("#hdr-backdrop");
  const drawer = qs("#hdr-sidebar");
  const closeBtn = qs("#hdr-close-btn");
  const createTicketLi = qs("#hdr-create-ticket-li");

  if (!toggle || !backdrop || !drawer) return;

  try {
    if (location.pathname.startsWith("/tickets")) {
      if (createTicketLi) createTicketLi.hidden = false;
    }
  } catch {}

  function openMenu() {
    backdrop.classList.add("is-open");

    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", () => {
    const isOpen = toggle.getAttribute("aria-expanded") === "true";

    if (isOpen) closeMenu();
    else openMenu();
  });

  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeMenu();
  });

  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  drawer.addEventListener("click", (e) => e.stopPropagation());
})();
