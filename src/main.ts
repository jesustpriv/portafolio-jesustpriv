import "./index.css";

document.addEventListener("DOMContentLoaded", () => {
  // Header Scroll
  const header = document.getElementById("header");
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    }
  });

  // Mobile Menu
  const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const mobileLinks = document.querySelectorAll(".mobile-link");

  if (mobileMenuToggle && mobileMenu) {
    mobileMenuToggle.addEventListener("click", () => {
      const isHidden = mobileMenu.classList.toggle("hidden");
      mobileMenuToggle.setAttribute("aria-expanded", (!isHidden).toString());
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        mobileMenu.classList.add("hidden");
        mobileMenuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  // Dynamic Title
  const titles = [
    "Gestión de Proyectos Tecnológicos",
    "Diseño de Identidad Visual",
    "Coordinación de Equipos",
    "Soporte Estratégico",
    "Soluciones Digitales Integrales",
  ];
  let titleIndex = 0;
  const dynamicTitleElement = document.getElementById("dynamic-title");

  setInterval(() => {
    titleIndex = (titleIndex + 1) % titles.length;
    if (dynamicTitleElement) {
      dynamicTitleElement.style.opacity = "0";
      setTimeout(() => {
        dynamicTitleElement.textContent = titles[titleIndex];
        dynamicTitleElement.style.opacity = "1";
      }, 500);
    }
  }, 4000);

  // Reveal on Scroll
  const revealElements = document.querySelectorAll(".reveal");
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          revealObserver.unobserve(entry.target); // Performance: stop observing once revealed
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px",
    },
  );

  revealElements.forEach((el) => {
    revealObserver.observe(el);
  });

  // Image Loading Effect
  const galleryImages = document.querySelectorAll(".gallery-card img");
  galleryImages.forEach((img) => {
    if ((img as HTMLImageElement).complete) {
      img.classList.add("loaded");
    } else {
      img.addEventListener("load", () => {
        img.classList.add("loaded");
      });
    }
  });

  // Portfolio Tab Switcher
  const tabDesign = document.getElementById("tab-design");
  const tabPhoto = document.getElementById("tab-photo");
  const gridDesign = document.getElementById("grid-design");
  const gridPhoto = document.getElementById("grid-photo");

  if (tabDesign && tabPhoto && gridDesign && gridPhoto) {
    const switchTab = (
      activeTab: HTMLElement,
      inactiveTab: HTMLElement,
      activeGrid: HTMLElement,
      inactiveGrid: HTMLElement,
    ) => {
      activeTab.classList.add("active");
      inactiveTab.classList.remove("active");
      activeGrid.classList.remove("hidden");
      inactiveGrid.classList.add("hidden");

      // Trigger a resize event to ensure layout refreshes if needed
      window.dispatchEvent(new Event("resize"));
    };

    tabDesign.addEventListener("click", () =>
      switchTab(tabDesign, tabPhoto, gridDesign, gridPhoto),
    );
    tabPhoto.addEventListener("click", () =>
      switchTab(tabPhoto, tabDesign, gridPhoto, gridDesign),
    );
  }

  // Modal Elements
  const modal = document.getElementById("gallery-modal");
  const closeModalBtn = document.getElementById("close-gallery");
  const modalImg = document.getElementById("modal-img") as HTMLImageElement;
  const modalTitle = document.getElementById("modal-title");
  const modalDescription = document.getElementById("modal-description");

  // Gallery Event Delegation (Handles both Diseño and Fotografía grids)
  document.addEventListener("click", (e) => {
    const target = e.target as HTMLElement;
    const card = target.closest(".gallery-card") as HTMLElement;

    if (card && modal && modalImg) {
      modalImg.src = card.dataset.img || "";
      // Titles and descriptions have been removed to prioritize image visualization
      if (modalTitle) modalTitle.textContent = "";
      if (modalDescription) modalDescription.textContent = "";
      modal.classList.add("active");
      closeModalBtn?.focus();
    }
  });

  if (closeModalBtn) {
    closeModalBtn.addEventListener("click", () => {
      modal?.classList.remove("active");
    });
  }

  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        modal.classList.remove("active");
      }
    });
  }

  // Set current year in footer
  const yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear().toString();
  }

  // Copyright Protection - Softened for better UX
  document.addEventListener("contextmenu", (e) => {
    const target = e.target as HTMLElement;
    // Only block right-click on images or within the gallery
    if (target.tagName === "IMG" || target.closest(".gallery-card")) {
      e.preventDefault();
      showCopyrightNotice();
    }
  });

  // Disable drag and drop for images and links to prevent easy saving
  document.addEventListener("dragstart", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" || target.tagName === "A") {
      e.preventDefault();
    }
  });

  // Disable text selection only on sensitive areas (gallery)
  document.addEventListener("selectstart", (e) => {
    const target = e.target as HTMLElement;
    if (target.tagName === "IMG" || target.closest(".gallery-card")) {
      e.preventDefault();
    }
  });

  function showCopyrightNotice() {
    const notice = document.createElement("div");
    notice.className =
      "fixed top-4 right-4 bg-[#B130FF] text-white px-4 py-2 rounded-lg shadow-lg z-50 text-sm";
    notice.innerHTML =
      '<i class="fas fa-copyright"></i> Contenido protegido - No disponible para descarga';
    document.body.appendChild(notice);

    setTimeout(() => {
      notice.remove();
    }, 3000);
  }

  // Add watermark dynamically to all images
  const images = document.querySelectorAll(".protected-image");
  images.forEach((img) => {
    const watermark = document.createElement("div");
    watermark.className = "watermark";
    watermark.textContent = "© G. Tovar";
    const parent = img.parentElement;
    if (parent) {
      parent.style.position = "relative";
      parent.appendChild(watermark);
    }
  });
});
