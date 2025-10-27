(function () {
  const qs = (s, r = document) => r.querySelector(s);

  const toggle = qs("#hdr-menu-toggle");
  const backdrop = qs("#hdr-backdrop");
  const drawer = qs("#hdr-sidebar");
  const closeBtn = qs("#hdr-close-btn");
  const createTicketLi = qs("#hdr-create-ticket-li");

  if (!toggle || !backdrop || !drawer) return;

  // Show "Create Ticket" only on /tickets*
  try {
    if (location.pathname.startsWith("/tickets")) {
      if (createTicketLi) createTicketLi.hidden = false;
    }
  } catch {}

  function openMenu() {
    console.log("open");
    backdrop.classList.add("is-open");

    toggle.setAttribute("aria-expanded", "true");
  }

  function closeMenu() {
    console.log("close", backdrop);
    backdrop.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
  }

  // Toggle button
  toggle.addEventListener("click", () => {
    console.log("toggle cliecked");

    const isOpen = toggle.getAttribute("aria-expanded") === "true";
    console.log(isOpen, "w1");

    if (isOpen) closeMenu();
    else openMenu();
  });

  // Click backdrop to close
  backdrop.addEventListener("click", (e) => {
    if (e.target === backdrop) closeMenu();
  });

  // Close button inside drawer
  if (closeBtn) closeBtn.addEventListener("click", closeMenu);

  // Prevent clicks inside the drawer from closing
  drawer.addEventListener("click", (e) => e.stopPropagation());
})();
