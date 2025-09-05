// Section switching + Navbar auto-hide
document.addEventListener("DOMContentLoaded", function () {
  const links = document.querySelectorAll(".nav-link");
  const sections = document.querySelectorAll(".section");
  const navbar = document.querySelector(".navbar");

  let lastScrollY = window.scrollY;
  let hideTimeout;

  // Show a section by ID
  function show(id, push = true) {
    sections.forEach((s) => {
      if (s.id === id) {
        s.classList.add("active");
        s.setAttribute("aria-hidden", "false");
      } else {
        s.classList.remove("active");
        s.setAttribute("aria-hidden", "true");
      }
    });

    links.forEach((a) => {
      const target = a.getAttribute("href").replace("#", "");
      a.classList.toggle("active", target === id);
    });

    if (push) history.pushState({ view: id }, "", "#" + id);
  }

  // Navbar hide/show
  function showNavbar() {
    navbar.classList.remove("hidden");
    resetHideTimer();
  }

  function hideNavbar() {
    navbar.classList.add("hidden");
  }

  function resetHideTimer() {
    clearTimeout(hideTimeout);
    hideTimeout = setTimeout(() => {
      hideNavbar();
    }, 3000); // auto-hide after 3s inactivity
  }

  // Navbar logic on scroll
  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      hideNavbar(); // scrolling down
    } else {
      showNavbar(); // scrolling up
    }
    lastScrollY = window.scrollY;
  });

  // Mouse near top → show navbar
  document.addEventListener("mousemove", (e) => {
    if (e.clientY < 60) {
      showNavbar();
    }
  });

  // Any click/tap → show navbar
  document.addEventListener("click", () => {
    showNavbar();
  });

  // Nav link clicks → change section
  links.forEach((a) => {
    a.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      if (!href || href.charAt(0) !== "#") return; // external link
      e.preventDefault();
      const id = href.replace("#", "");
      show(id, true);
    });
  });

  // Handle browser back/forward
  window.addEventListener("popstate", () => {
    const id = (location.hash && location.hash.replace("#", "")) || "home";
    show(id, false);
  });

  // Initial view
  const initial = (location.hash && location.hash.replace("#", "")) || "home";
  history.replaceState({ view: initial }, "", "#" + initial);
  show(initial, false);

  // Start inactivity timer
  resetHideTimer();
});
