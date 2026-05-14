import "./index.css";
import heroData from "./data/hero.json";
import aboutData from "./data/about.json";
import servicesData from "./data/services.json";
import experienceData from "./data/experience.json";
import projectsData from "./data/projects.json";
import plansData from "./data/plans.json";
import contactData from "./data/contact.json";

function populateDynamicData() {
  // HERO
  const heroNameContainer = document.getElementById("hero-name-container");
  if (heroNameContainer && heroData.name) {
    const parts = heroData.name.split(" ");
    if (parts.length > 1) {
      const last = parts.pop();
      heroNameContainer.innerHTML = `${parts.join(" ")} <span class="text-accent">${last}</span>`;
    } else {
      heroNameContainer.textContent = heroData.name;
    }
  }
  const heroTagline = document.getElementById("hero-tagline");
  if (heroTagline && heroData.tagline) heroTagline.textContent = heroData.tagline;
  
  const heroPrimaryCta = document.getElementById("hero-primary-cta");
  if (heroPrimaryCta && heroData.primaryCTA) {
    heroPrimaryCta.innerHTML = `<i class="fas fa-briefcase"></i> <span>${heroData.primaryCTA}</span>`;
  }
  const heroSecondaryCta = document.getElementById("hero-secondary-cta");
  if (heroSecondaryCta && heroData.secondaryCTA) {
    heroSecondaryCta.innerHTML = `<i class="fas fa-handshake"></i> <span>${heroData.secondaryCTA}</span>`;
  }

  // ABOUT BIO
  const aboutBio = document.getElementById("about-bio");
  if (aboutBio && aboutData.bio) {
    aboutBio.innerHTML = aboutData.bio.split('\n\n').map(p => `<p>${p}</p>`).join('');
  }
  
  // ABOUT SKILLS
  const aboutSkills = document.getElementById("about-skills-container");
  if (aboutSkills && aboutData.skills) {
    let skillsHtml = '';
    aboutData.skills.forEach(skill => {
      skillsHtml += `
        <div class="skill-card p-6 glass-premium transform hover:scale-102 transition-transform duration-300">
          <div class="flex items-center gap-4 mb-4">
            <div class="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center text-accent">
              <i class="fas ${skill.icon} text-xl"></i>
            </div>
            <div>
              <h3 class="text-lg font-bold text-white">${skill.category}</h3>
              <p class="text-xs text-zinc-400">${skill.description}</p>
            </div>
          </div>
          <div class="flex flex-wrap gap-2">
            ${skill.tags.map(tag => `<span class="px-3 py-1 bg-zinc-900/50 rounded-lg text-xs text-zinc-300 border border-zinc-700/50 hover:border-accent/50 transition-colors">${tag}</span>`).join('')}
          </div>
        </div>
      `;
    });
    
    if (aboutData.keySkills) {
      skillsHtml += `
        <div class="mt-12 p-6 bg-gradient-to-r from-zinc-900/50 to-zinc-800/50 rounded-2xl border border-zinc-700/50">
          <h3 class="text-lg font-bold mb-6 text-white uppercase tracking-wider">Habilidades Clave</h3>
          <div class="flex flex-wrap gap-3">
            ${aboutData.keySkills.map(ks => `<span class="skill-tag px-4 py-2 text-sm bg-accent/10 border border-accent/30 hover:bg-accent/20 transition-colors">${ks}</span>`).join('')}
          </div>
        </div>
      `;
    }
    aboutSkills.innerHTML = skillsHtml;
  }

  // SERVICES
  const servicesGrid = document.getElementById("services-grid");
  if (servicesGrid && Array.isArray(servicesData)) {
    servicesGrid.innerHTML = '';
    servicesData.forEach(service => {
      let featuresHtml = '';
      service.features.forEach(feat => {
        featuresHtml += `<div class="flex items-center gap-3"><i class="fas fa-check-circle text-accent text-sm"></i><span class="text-zinc-300 text-sm">${feat}</span></div>`;
      });
      servicesGrid.innerHTML += `
        <div class="skill-card reveal glass-premium p-8">
          <div class="w-14 h-14 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-6">
            <i class="fas ${service.icon} text-2xl"></i>
          </div>
          <h3 class="text-xl font-bold text-white mb-4">${service.title}</h3>
          <p class="text-zinc-500 text-sm leading-relaxed mb-6">${service.description}</p>
          <div class="space-y-3 mb-6">${featuresHtml}</div>
          <div class="p-3 bg-zinc-800/50 rounded-lg">
            <p class="text-xs text-zinc-400"><span class="text-accent font-semibold">Resultado:</span> ${service.result}</p>
          </div>
        </div>
      `;
    });
  }

  // PLANS
  const plansGrid = document.getElementById("plans-grid");
  if (plansGrid && Array.isArray(plansData)) {
    plansGrid.innerHTML = '';
    plansData.forEach((plan, idx) => {
      const delay = idx * 0.1;
      const highlightClasses = plan.highlighted 
        ? "border-2 border-accent relative transform md:-translate-y-4 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.15)]" 
        : "border border-white/5";
      
      const tag = plan.highlighted 
        ? `<div class="absolute top-0 right-0 bg-accent text-zinc-950 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg">${plan.highlightText}</div>` 
        : "";

      let includesHtml = plan.includesLabel ? `<div class="text-sm font-semibold text-white mb-3">${plan.includesLabel}</div>` : "";
      
      let featuresHtml = "";
      plan.includes.forEach(feat => {
        featuresHtml += `<div class="flex items-start gap-3"><i class="fas fa-check text-accent mt-1 text-sm"></i><span class="text-zinc-300 text-sm">${feat}</span></div>`;
      });
      plan.excludes.forEach(feat => {
        featuresHtml += `<div class="flex items-start gap-3 mt-4 opacity-50"><i class="fas fa-times text-red-400 mt-1 text-sm"></i><span class="text-zinc-400 text-sm">${feat}</span></div>`;
      });

      plansGrid.innerHTML += `
        <div class="reveal glass-premium p-8 rounded-2xl flex flex-col ${highlightClasses}" style="transition-delay: ${delay}s">
          ${tag}
          <h3 class="text-xl font-bold text-white mb-2">${plan.name}</h3>
          <p class="text-3xl font-display font-bold text-accent mb-4">${plan.price}</p>
          <p class="text-zinc-400 text-sm mb-6 min-h-[40px]">${plan.target}</p>
          ${includesHtml}
          <div class="space-y-3 mb-8 flex-grow">${featuresHtml}</div>
          <div class="text-xs text-zinc-500 mb-6"><i class="far fa-clock mr-1"></i> Entrega: ${plan.delivery}</div>
          <a href="#" onclick="openPlanModal(${plan.id}); return false;" class="w-full py-3 rounded-full font-bold flex justify-center items-center gap-2 ${plan.highlighted ? 'bg-accent text-zinc-950 hover:bg-accent/90' : 'border border-accent text-accent hover:bg-accent hover:text-zinc-950'} transition-colors">
            Elegir Plan ${String(plan.id).padStart(2, '0')}
          </a>
        </div>
      `;
    });
  }

  // PROJECTS
  const gridDesign = document.getElementById("grid-design");
  if (gridDesign && projectsData.design) {
    gridDesign.innerHTML = "";
    projectsData.design.forEach(img => {
      gridDesign.innerHTML += `
        <div class="gallery-card group" data-img="${img}">
          <img src="${img}" alt="Diseño" loading="lazy" />
        </div>
      `;
    });
  }
  const gridPhoto = document.getElementById("grid-photo");
  if (gridPhoto && projectsData.photo) {
    gridPhoto.innerHTML = "";
    projectsData.photo.forEach(img => {
      gridPhoto.innerHTML += `
        <div class="gallery-card group" data-img="${img}">
          <img src="${img}" alt="Fotografía" loading="lazy" />
        </div>
      `;
    });
  }

  // EXPERIENCE
  const experienceList = document.getElementById("experience-list");
  if (experienceList && Array.isArray(experienceData)) {
    experienceList.innerHTML = '';
    experienceData.forEach((exp, idx) => {
      const isRight = idx % 2 === 0;
      experienceList.innerHTML += `
        <div class="relative pl-12 md:pl-0">
          <div class="timeline-dot"></div>
          <div class="md:w-1/2 ${isRight ? 'md:pr-12 md:text-right' : 'md:ml-auto md:pl-12'}">
            <span class="text-accent font-mono text-sm mb-2 block">${exp.period}</span>
            <h3 class="text-xl font-bold text-white mb-1">${exp.role}</h3>
            <h4 class="text-zinc-400 font-medium mb-4">${exp.company}</h4>
            <p class="text-zinc-500 text-sm leading-relaxed">${exp.description}</p>
          </div>
        </div>
      `;
    });
  }

  // CONTACT & SOCIALS
  const contactEmail = document.getElementById("contact-email");
  if (contactEmail && contactData.email) {
    contactEmail.textContent = contactData.email;
    contactEmail.setAttribute("href", `mailto:${contactData.email}`);
  }
  
  const contactWa = document.getElementById("contact-whatsapp");
  if (contactWa && contactData.whatsapp) {
    contactWa.textContent = contactData.whatsapp;
    contactWa.setAttribute("href", `https://wa.me/${contactData.whatsapp.replace(/\D/g, '')}`);
  }

  const setupSocial = (id: string, user: string, urlPrefix: string) => {
    const el = document.getElementById(id);
    if (el && user) {
      const rawUser = user.replace('@', '');
      el.setAttribute("href", `${urlPrefix}${rawUser}`);
    } else if (el) {
      el.style.display = "none";
    }
  };

  if (contactData) {
    setupSocial("social-ig-design", contactData.instagramDesign, "https://instagram.com/");
    setupSocial("social-ig-photo", contactData.instagramPhoto, "https://instagram.com/");
    setupSocial("social-linkedin", contactData.linkedin, "https://linkedin.com/in/");
    setupSocial("social-github", contactData.github, "https://github.com/");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  populateDynamicData();
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
    const closeMenu = () => {
      mobileMenu.classList.remove("opacity-100", "translate-y-0", "pointer-events-auto");
      mobileMenu.classList.add("opacity-0", "-translate-y-4", "pointer-events-none");
      mobileMenuToggle.setAttribute("aria-expanded", "false");
    };

    const openMenu = () => {
      mobileMenu.classList.remove("opacity-0", "-translate-y-4", "pointer-events-none");
      mobileMenu.classList.add("opacity-100", "translate-y-0", "pointer-events-auto");
      mobileMenuToggle.setAttribute("aria-expanded", "true");
    };

    mobileMenuToggle.addEventListener("click", (e) => {
      e.stopPropagation();
      const isExpanded = mobileMenuToggle.getAttribute("aria-expanded") === "true";
      if (isExpanded) {
        closeMenu();
      } else {
        openMenu();
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener("click", () => {
        closeMenu();
      });
    });

    // Close when scrolling outside
    window.addEventListener("scroll", () => {
      if (mobileMenuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu();
      }
    }, { passive: true });

    // Close when clicking outside
    document.addEventListener("click", (e) => {
      if (mobileMenuToggle.getAttribute("aria-expanded") === "true") {
        if (!mobileMenu.contains(e.target as Node) && !mobileMenuToggle.contains(e.target as Node)) {
          closeMenu();
        }
      }
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
