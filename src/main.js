import './style.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

import trackCiscoPython1 from './assets/track-cisco-python-1.png';
import trackCiscoJs1 from './assets/track-cisco-js-1.png';
import trackHrJs1 from './assets/track-hr-js-1.png';
import trackHrSql1 from './assets/track-hr-sql-1.png';

import trackCiscoPython2 from './assets/track-cisco-python-2.png';
import trackCiscoJs2 from './assets/track-cisco-js-2.png';
import trackHrJs2 from './assets/track-hr-js-2.png';
import trackHrSql2 from './assets/track-hr-sql-2.png';

// Register GSAP ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

/* --- CERTIFICATIONS DATA & LOGIC --- */
const certificates = [
  {
    issuer: "Cisco Networking Academy",
    title: "Python Essentials",
    thumbnail: trackCiscoPython1,
    tags: ["Python", "Cisco", "Programming"],
    certificates: [
      {
        title: "Python Essentials 1",
        image: trackCiscoPython1,
        file: "/certificates/python-essentials-1.png"
      },
      {
        title: "Python Essentials 2",
        image: trackCiscoPython2,
        file: "/certificates/python-essentials-2.png"
      }
    ]
  },
  {
    issuer: "Cisco Networking Academy",
    title: "JavaScript Essentials",
    thumbnail: trackCiscoJs1,
    tags: ["JavaScript", "Cisco", "Web Development"],
    certificates: [
      {
        title: "JavaScript Essentials 1",
        image: trackCiscoJs1,
        file: "/certificates/javascript-essentials-1.png"
      },
      {
        title: "JavaScript Essentials 2",
        image: trackCiscoJs2,
        file: "/certificates/javascript-essentials-2.png"
      }
    ]
  },
  {
    issuer: "HackerRank",
    title: "JavaScript Certification",
    thumbnail: trackHrJs1,
    tags: ["JavaScript", "HackerRank", "Problem Solving"],
    certificates: [
      {
        title: "JavaScript (Basic)",
        image: trackHrJs1,
        file: "/certificates/javascript-basic.png"
      },
      {
        title: "JavaScript (Intermediate)",
        image: trackHrJs2,
        file: "/certificates/javascript-intermediate.png"
      }
    ]
  },
  {
    issuer: "HackerRank",
    title: "SQL Certification",
    thumbnail: trackHrSql1,
    tags: ["SQL", "Database", "HackerRank"],
    certificates: [
      {
        title: "SQL (Basic)",
        image: trackHrSql1,
        file: "/certificates/sql-basic.png"
      },
      {
        title: "SQL (Intermediate)",
        image: trackHrSql2,
        file: "/certificates/sql-intermediate.pdf"
      }
    ]
  }
];

function initCertifications() {
  const certsContainer = document.getElementById('certificates-list-container');
  if (!certsContainer) return;

  // Render cards dynamically
  certsContainer.innerHTML = certificates.map((cert, index) => {
    const isCisco = cert.issuer.includes("Cisco");
    const logoSVG = isCisco ? `
      <svg class="cert-issuer-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M4 19V6.5a4.5 4.5 0 0 1 9 0V19"/>
        <path d="M11 19V11.5a4.5 4.5 0 0 1 9 0V19"/>
      </svg>
    ` : `
      <svg class="cert-issuer-logo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="16 18 22 12 16 6"></polyline>
        <polyline points="8 6 2 12 8 18"></polyline>
      </svg>
    `;

    return `
      <div class="certificate-card" data-index="${index}">
        <div class="cert-img-wrapper">
          <img src="${cert.thumbnail}" alt="${cert.title}" class="cert-img" loading="lazy" />
        </div>
        <div class="cert-meta">
          <div class="cert-issuer-row">
            ${logoSVG}
            <span class="cert-issuer">${cert.issuer}</span>
          </div>
          <h3 class="cert-title">${cert.title}</h3>
          
          <div class="cert-checklist">
            ${cert.certificates.map(item => `
              <div class="cert-checklist-item">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                <span>${item.title}</span>
              </div>
            `).join('')}
          </div>

          <div class="cert-tags-row">
            ${cert.tags.map(tag => `<span class="tech-tag">${tag}</span>`).join('')}
          </div>
          <div class="cert-footer-row">
            <button class="btn-card-arrow view-track-btn" data-index="${index}">
              <span>VIEW TRACK</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="7" y1="17" x2="17" y2="7"></line>
                <polyline points="7 7 17 7 17 17"></polyline>
              </svg>
            </button>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Modal references
  const modal = document.getElementById('certifications-modal');
  if (!modal) return;
  const modalOverlay = modal.querySelector('.cert-modal-overlay');
  const modalContainer = modal.querySelector('.cert-modal-container');
  const closeBtn = document.getElementById('cert-modal-close-btn');
  
  const modalIssuer = document.getElementById('modal-track-issuer');
  const modalTitle = document.getElementById('modal-track-title');
  const modalGrid = document.getElementById('cert-modal-grid-container');

  // Lightbox references
  const lightbox = document.getElementById('lightbox-modal');
  if (!lightbox) return;
  const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
  const lightboxContainer = lightbox.querySelector('.lightbox-container');
  const lightboxCloseBtn = document.getElementById('lightbox-close-btn');
  const lightboxViewer = document.getElementById('lightbox-content-viewer');
  const lightboxDownloadBtn = document.getElementById('lightbox-download-btn');
  const lightboxFullsizeBtn = document.getElementById('lightbox-fullsize-btn');

  // Open Modal function
  const openModal = (trackIndex) => {
    const track = certificates[trackIndex];
    if (!track) return;

    modalIssuer.textContent = track.issuer;
    modalTitle.textContent = track.title;
    
    modalGrid.innerHTML = track.certificates.map((cert, certIdx) => `
      <div class="modal-cert-card">
        <div class="modal-cert-img-wrapper">
          <img src="${cert.image}" alt="${cert.title}" class="modal-cert-img" />
        </div>
        <div class="modal-cert-meta">
          <h4 class="modal-cert-title">${cert.title}</h4>
          <button class="modal-cert-btn view-lightbox-btn" data-track-index="${trackIndex}" data-cert-index="${certIdx}">
            <span>VIEW CERTIFICATE</span>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="7" y1="17" x2="17" y2="7"></line>
              <polyline points="7 7 17 7 17 17"></polyline>
            </svg>
          </button>
        </div>
      </div>
    `).join('');

    // Toggle modal visibility
    modal.classList.add('active');

    // Freeze Lenis scrolling
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop();
    }

    // GSAP animations
    gsap.killTweensOf([modalOverlay, modalContainer]);
    gsap.to(modalOverlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to(modalContainer, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  // Close Modal function
  const closeModal = () => {
    // GSAP animations
    gsap.killTweensOf([modalOverlay, modalContainer]);
    gsap.to(modalOverlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    gsap.to(modalContainer, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        modal.classList.remove('active');
        // Unfreeze Lenis scrolling
        if (typeof lenis !== 'undefined' && lenis) {
          lenis.start();
        }
      }
    });
  };

  // Open Lightbox function
  const openLightbox = (trackIndex, certIndex) => {
    const track = certificates[trackIndex];
    if (!track) return;
    const cert = track.certificates[certIndex];
    if (!cert) return;

    const file = cert.file;
    const isPDF = file.toLowerCase().endsWith('.pdf');

    if (isPDF) {
      lightboxViewer.innerHTML = `<iframe class="lightbox-pdf" src="${file}"></iframe>`;
    } else {
      lightboxViewer.innerHTML = `<img class="lightbox-img" src="${file}" alt="${cert.title}" />`;
    }

    // Update download and fullsize actions
    lightboxDownloadBtn.setAttribute('href', file);
    const filename = file.substring(file.lastIndexOf('/') + 1);
    lightboxDownloadBtn.setAttribute('download', filename);
    lightboxFullsizeBtn.setAttribute('href', file);

    // Show Lightbox Modal
    lightbox.classList.add('active');

    // Freeze Lenis scrolling (in case it wasn't already frozen)
    if (typeof lenis !== 'undefined' && lenis) {
      lenis.stop();
    }

    // GSAP Lightbox reveal animations
    gsap.killTweensOf([lightboxOverlay, lightboxContainer]);
    gsap.to(lightboxOverlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power2.out'
    });
    gsap.to(lightboxContainer, {
      opacity: 1,
      scale: 1,
      duration: 0.5,
      ease: 'power3.out'
    });
  };

  // Close Lightbox function
  const closeLightbox = () => {
    gsap.killTweensOf([lightboxOverlay, lightboxContainer]);
    gsap.to(lightboxOverlay, {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.in'
    });
    gsap.to(lightboxContainer, {
      opacity: 0,
      scale: 0.9,
      duration: 0.4,
      ease: 'power3.in',
      onComplete: () => {
        lightbox.classList.remove('active');
        lightboxViewer.innerHTML = ''; // Free iframe/image resources
        
        // Unfreeze Lenis scrolling only if the track details modal is also closed
        const isDetailsModalOpen = modal.classList.contains('active');
        if (!isDetailsModalOpen && typeof lenis !== 'undefined' && lenis) {
          lenis.start();
        }
      }
    });
  };

  // Listen for open click
  certsContainer.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-track-btn');
    if (btn) {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      openModal(idx);
    }
  });

  // Listen for view lightbox click inside cert details modal
  modalGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.view-lightbox-btn');
    if (btn) {
      const trackIdx = parseInt(btn.getAttribute('data-track-index'), 10);
      const certIdx = parseInt(btn.getAttribute('data-cert-index'), 10);
      openLightbox(trackIdx, certIdx);
    }
  });

  // Listen for close triggers on details modal
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }
  if (modalOverlay) {
    modalOverlay.addEventListener('click', closeModal);
  }

  // Listen for close triggers on lightbox modal
  if (lightboxCloseBtn) {
    lightboxCloseBtn.addEventListener('click', closeLightbox);
  }
  if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
  }

  // Escape key support for both stacked modals
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (lightbox.classList.contains('active')) {
        closeLightbox();
      } else if (modal.classList.contains('active')) {
        closeModal();
      }
    }
  });
}

initCertifications();

/* --- 1. SMOOTH SCROLLING (LENIS) --- */
const lenis = new Lenis({
  duration: 1.2,
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // easeOutExpo
  direction: 'vertical',
  gestureDirection: 'vertical',
  smooth: true,
  mouseMultiplier: 1,
  smoothTouch: false,
  touchMultiplier: 2,
  infinite: false,
});

// Sync Lenis scroll updates with ScrollTrigger
lenis.on('scroll', ScrollTrigger.update);

// Direct GSAP animations to RAF via Lenis
gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});
gsap.ticker.lagSmoothing(0);

/* --- 2. HEADER INTERACTION --- */
const header = document.querySelector('.main-header');
lenis.on('scroll', (e) => {
  if (e.scroll > 50) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled');
  }
});

/* --- 3. MOBILE MENU TOGGLE --- */
const mobileToggle = document.getElementById('mobile-toggle');
const navLinks = document.querySelector('.nav-links');
if (mobileToggle && navLinks) {
  mobileToggle.addEventListener('click', () => {
    mobileToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  // Close menu when a link is clicked
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    link.addEventListener('click', () => {
      mobileToggle.classList.remove('active');
      navLinks.classList.remove('active');
    });
  });
}

/* --- 4. REAL-TIME LOCAL CLOCK (INDIA TIME) --- */
function updateLocalTime() {
  const timeEl = document.getElementById('local-time');
  if (!timeEl) return;
  const options = {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true,
  };
  const formatter = new Intl.DateTimeFormat([], options);
  timeEl.textContent = formatter.format(new Date()) + ' GMT+5:30';
}
updateLocalTime();
setInterval(updateLocalTime, 1000);

/* --- 5. ENTRANCE & SCROLL ANIMATIONS (GSAP) --- */

// A. Text Splitting for Hero Header Title Parts ("NISHANT" & "JANGRA")
const titleParts = document.querySelectorAll('.hero-title-part');
titleParts.forEach(title => {
  const text = title.textContent;
  title.innerHTML = '';
  text.split('').forEach(char => {
    const span = document.createElement('span');
    span.textContent = char;
    span.style.display = 'inline-block';
    span.style.transform = 'translateY(100%)';
    title.appendChild(span);
  });
});

// Run Text Reveal
gsap.to('.hero-title-part span', {
  y: '0%',
  duration: 1.4,
  stagger: 0.05,
  ease: 'power4.out',
  delay: 0.2
});

// B. Hero Background Watermark Fade-In
const heroWatermark = document.getElementById('hero-watermark-text');
if (heroWatermark) {
  gsap.fromTo(heroWatermark,
    { opacity: 0, scale: 0.95 },
    { opacity: 1, scale: 1, duration: 2.2, ease: 'power3.out', delay: 0.4 }
  );
}

// C. Hero Image Scale/Fade & Parallax Scroll
const heroImg = document.getElementById('hero-img');
if (heroImg) {
  gsap.fromTo(heroImg,
    { scale: 1.12, opacity: 0 },
    { scale: 1, opacity: 1, duration: 1.8, ease: 'power4.out', delay: 0.6 }
  );

  gsap.to(heroImg, {
    yPercent: 12,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });
}

// D. Hero Content Columns Entrance Reveals
gsap.from('.hero-tagline-editorial, .hero-desc, .hero-actions, .hero-editorial-quote', {
  opacity: 0,
  y: 35,
  duration: 1.2,
  stagger: 0.12,
  ease: 'power3.out',
  delay: 0.8
});

// E. Social Bar scroll Fade-Out (Visible ONLY in the Hero section)
const socialBar = document.querySelector('.social-bar');
if (socialBar) {
  gsap.to(socialBar, {
    opacity: 0,
    pointerEvents: 'none',
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'bottom 90%', // Starts fading out when bottom of hero is 90% up the viewport
      end: 'bottom 70%',   // Completely hidden when bottom of hero reaches 70% up
      scrub: true
    }
  });
}

// E. Premium Smooth Navigation & Active Indicators
const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
smoothScrollLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    const targetId = link.getAttribute('href');
    if (targetId && targetId.startsWith('#') && targetId !== '#') {
      e.preventDefault();
      
      const mobileToggle = document.getElementById('mobile-toggle');
      const navLinks = document.querySelector('.nav-links');
      if (mobileToggle && navLinks) {
        mobileToggle.classList.remove('active');
        navLinks.classList.remove('active');
      }
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const isHome = targetId === '#home';
        let offsetValue = 85; // default offset (for Skills)
        
        if (isHome) {
          offsetValue = 0;
        } else if (targetId === '#projects' || targetId === '#contact') {
          offsetValue = 45; // 10px lower visual landing position (adds breathing space)
        } else if (targetId === '#skills' || targetId === '#certifications') {
          offsetValue = 20; // 10px lower visual landing position (adds breathing space)
        }
        

        lenis.scrollTo(isHome ? 0 : targetElement, {
          duration: 1.3,
          easing: (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2, // power3.inOut / easeInOutCubic
          offset: offsetValue,
          immediate: false,
          onComplete: () => {
            // Update URL hash without reloading or jumping
            history.pushState(null, null, targetId);
          }
        });
      }
    }
  });
});

const sectionsList = ['#home', '#projects', '#about', '#skills', '#certifications', '#contact'];
sectionsList.forEach(id => {
  ScrollTrigger.create({
    trigger: id,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter: () => updateActiveNav(id),
    onEnterBack: () => updateActiveNav(id)
  });
});

function updateActiveNav(id) {
  const links = document.querySelectorAll('.nav-link');
  links.forEach(link => {
    if (link.getAttribute('href') === id) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

// F. Cinematic Section Scroll Fade-In & Fade-Out Transitions
const allSections = document.querySelectorAll('section');
allSections.forEach(section => {
  if (section.id === 'home') {
    gsap.to(section, {
      opacity: 0.1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'bottom 85%',
        end: 'bottom 10%',
        scrub: true
      }
    });
    return;
  }

  gsap.fromTo(section,
    { opacity: 0.1 },
    {
      opacity: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: section,
        start: 'top 95%',
        end: 'top 35%',
        scrub: true
      }
    }
  );

  gsap.to(section, {
    opacity: 0.1,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: section,
      start: 'bottom 65%',
      end: 'bottom 5%',
      scrub: true
    }
  });
});

// G. Section Reveal Animation (nested elements stagger)
// 1. Projects Section Reveal Timeline
const projectsEl = document.querySelector('#projects');
if (projectsEl) {
  const elements = [
    projectsEl.querySelector('.section-tag'),
    projectsEl.querySelector('.editorial-title'),
    projectsEl.querySelector('.projects-intro-desc'),
    projectsEl.querySelector('.projects-intro-col .btn-text-link'),
    ...projectsEl.querySelectorAll('.project-vertical-card')
  ].filter(Boolean);

  gsap.from(elements, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out',
    clearProps: 'opacity,transform',
    scrollTrigger: {
      trigger: '#projects',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });
}

// 2. About Section Reveal Timeline
const aboutEl = document.querySelector('#about');
if (aboutEl) {
  const aboutTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#about',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  const textElements = aboutEl.querySelectorAll('.about-desc-col > *');
  aboutTl.from(textElements, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out'
  });

  const backdropEls = aboutEl.querySelectorAll('.about-backdrop-text-left, .about-backdrop-text-right');
  if (backdropEls.length) {
    aboutTl.from(backdropEls, {
      opacity: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'power3.out'
    }, '-=0.4');
  }

  const portraitContainer = aboutEl.querySelector('.about-portrait-container');
  if (portraitContainer) {
    aboutTl.from(portraitContainer, {
      opacity: 0,
      y: 50,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.3');
  }
}

// 3. Skills Section Reveal Timeline
const skillsEl = document.querySelector('#skills');
if (skillsEl) {
  const skillsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#skills',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  const textElements = skillsEl.querySelectorAll('.skills-intro-col > *');
  skillsTl.from(textElements, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out'
  });

  const wheelWrapper = skillsEl.querySelector('.skills-wheel-wrapper');
  const mobileNavWrapper = skillsEl.querySelector('.skills-mobile-nav-wrapper');
  const animatedItems = [wheelWrapper, mobileNavWrapper].filter(Boolean);

  skillsTl.from(animatedItems, {
    opacity: 0,
    y: 50,
    scale: 0.95,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out'
  }, '-=0.4');
}

// 3.5. Certifications Section Reveal Timeline
const certsEl = document.querySelector('#certifications');
if (certsEl) {
  const certsTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#certifications',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  const textElements = certsEl.querySelectorAll('.certifications-intro-col > *');
  certsTl.from(textElements, {
    opacity: 0,
    y: 80,
    duration: 0.8,
    stagger: 0.08,
    ease: 'power3.out'
  });

  const certCards = certsEl.querySelectorAll('.certificate-card');
  certsTl.from(certCards, {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: 'power3.out'
  }, '-=0.4');
}

// 4. Contact Section Reveal Timeline
const contactEl = document.querySelector('#contact');
if (contactEl) {
  const contactTl = gsap.timeline({
    scrollTrigger: {
      trigger: '#contact',
      start: 'top 75%',
      toggleActions: 'play none none none'
    }
  });

  // Background watermark reveal
  const bgText = contactEl.querySelector('.contact-backdrop-text');
  if (bgText) {
    contactTl.from(bgText, {
      opacity: 0,
      scale: 0.95,
      duration: 1.2,
      ease: 'power2.out'
    });
  }

  // Left column elements: Tag, Heading line-by-line, description
  const tag = contactEl.querySelector('.section-tag');
  const headlineLines = contactEl.querySelectorAll('.contact-headline-line');
  const desc = contactEl.querySelector('.contact-description');
  
  if (tag) contactTl.from(tag, { opacity: 0, y: 40, duration: 0.6, ease: 'power3.out' }, '-=0.8');
  
  if (headlineLines.length) {
    contactTl.from(headlineLines, {
      opacity: 0,
      y: 50,
      stagger: 0.15,
      duration: 0.8,
      ease: 'power3.out'
    }, '-=0.5');
  }
  
  if (desc) contactTl.from(desc, { opacity: 0, y: 30, duration: 0.6, ease: 'power3.out' }, '-=0.4');

  // Left buttons: Animate upward
  const buttons = contactEl.querySelectorAll('.contact-actions .btn');
  if (buttons.length) {
    contactTl.from(buttons, {
      opacity: 0,
      y: 30,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out'
    }, '-=0.4');
  }

  // Right column: Contact Card fades in and slides from the right
  const glassCard = contactEl.querySelector('.contact-glass-card');
  if (glassCard) {
    contactTl.from(glassCard, {
      opacity: 0,
      x: 50,
      duration: 0.9,
      ease: 'power3.out'
    }, '-=0.8');
  }

  // Social icons: appear with stagger
  const socialTitles = contactEl.querySelectorAll('.contact-socials-title');
  const socialIcons = contactEl.querySelectorAll('.contact-social-icon');
  
  if (socialTitles.length) {
    contactTl.from(socialTitles, { opacity: 0, duration: 0.4, ease: 'power3.out', stagger: 0.1 }, '-=0.4');
  }
  
  if (socialIcons.length) {
    contactTl.from(socialIcons, {
      opacity: 0,
      y: 20,
      scale: 0.8,
      stagger: 0.05,
      duration: 0.6,
      ease: 'back.out(1.5)'
    }, '-=0.3');
  }
}

/* --- 5. INTERACTIVE SKILLS SECTION WHEEL --- */
const SKILLS_DATA = [
  {
    name: 'HTML',
    logo: `<svg viewBox="0 0 24 24" fill="#E34F26"><path d="M1.5 2L3.8 22l8.2 2.3 8.2-2.3L22.5 2H1.5zm16.5 6.6H9.3l.2 2.2h8.5l-.6 6.6-5.4 1.5-5.4-1.5-.4-3.7h2.2l.2 1.9 3.4.9 3.4-.9.3-3.7H5.2L4.6 6.4h13.7l-.3 2.2z"/></svg>`,
    level: '5+ Years',
    desc: 'Expert level semantic markup, search engine optimization best practices, accessibility (ARIA) standards, and high-performance DOM loading structures.',
    tech: 'HTML5, Semantic HTML, SVG, ARIA, Web Components'
  },
  {
    name: 'CSS',
    logo: `<svg viewBox="0 0 24 24" fill="#1572B6"><path d="M1.5 2L3.8 22l8.2 2.3 8.2-2.3L22.5 2H1.5zm16.5 6.6H7.1l.2 2.2h10.5l-.9 9.3-6.4 1.8-6.4-1.8-.4-4.5h2.2l.2 2.3 4.4 1.2 4.4-1.2.4-4.5H5l-.4-4.5h13.7l-.3 2.2z"/></svg>`,
    level: '5+ Years',
    desc: 'Advanced grid layouts, flexible styling, custom responsive variables, keyframe animations, complex stacking contexting, and optimization of CSS render loops.',
    tech: 'CSS3, Grid, Flexbox, Custom Properties, Animations, BEM'
  },
  {
    name: 'JavaScript',
    logo: `<svg viewBox="0 0 24 24" fill="#F7DF1E"><rect width="24" height="24" fill="#F7DF1E"/><path d="M12.9 14.3h1.9v4.2c0 .9-.6 1.4-1.5 1.4-.9 0-1.4-.5-1.5-1.2h1.6c0 .3.2.5.5.5.3 0 .4-.2.4-.6v-4.3zm3.7 3.3c.2.3.6.5.9.5.4 0 .7-.2.7-.5 0-.8-2-.5-2-2.1 0-.7.6-1.3 1.5-1.3.8 0 1.3.3 1.6.8h-1.5c-.1-.2-.3-.3-.5-.3-.3 0-.4.1-.4.3 0 .7 2 .5 2 2.1 0 .8-.6 1.4-1.6 1.4-.9 0-1.5-.4-1.8-1.2h1.6z" fill="#000000"/></svg>`,
    level: '4+ Years',
    desc: 'Functional programming, asynchronous systems, event loop optimizations, canvas manipulators, DOM API engineering, and ES6+ custom build logic.',
    tech: 'ES6+, Asynchronous JS, Canvas API, Web Audio API'
  },
  {
    name: 'React',
    logo: `<svg viewBox="0 0 24 24" fill="none" stroke="#61DAFB" stroke-width="1.5"><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(30 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(90 12 12)"/><ellipse cx="12" cy="12" rx="11" ry="4.2" transform="rotate(150 12 12)"/><circle cx="12" cy="12" r="1.8" fill="#61DAFB"/></svg>`,
    level: '3+ Years',
    desc: 'High-end React applications using functional components, state machines, context stores, custom hooks, virtual DOM optimization, and SSR frameworks like Next.js.',
    tech: 'React 18, Hooks, Context API, Redux Toolkit, Next.js'
  },
  {
    name: 'Node.js',
    logo: `<svg viewBox="0 0 24 24" fill="#339933"><path d="M12 2.5L2.8 7.8v10.4L12 23.5l9.2-5.3V7.8L12 2.5zm7.5 14.8l-7.5 4.3-7.5-4.3V8.7L12 4.4l7.5 4.3v8.6z" fill="#339933"/></svg>`,
    level: '3+ Years',
    desc: 'Asynchronous event-driven servers, cluster orchestrations, REST API design, microservices, file buffers streaming, and modular node modules integrations.',
    tech: 'Node Core, Event Emitters, Streams, NPM, CommonJS/ESM'
  },
  {
    name: 'Express.js',
    logo: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 14H8v-2h5v-2H8V10h5V8H6v10h7v-2zm5-8l-3 4 3 4h-2.2l-1.9-2.7-1.9 2.7H10l3-4-3-4h2.2l1.9 2.7 1.9-2.7H18z"/></svg>`,
    level: '3+ Years',
    desc: 'Lightweight backend routing, custom API middleware chains, request-response handling, token authentication guards, and database driver wrappers.',
    tech: 'Express, Routing, Middleware, CORS, JWT Auth'
  },
  {
    name: 'MongoDB',
    logo: `<svg viewBox="0 0 24 24" fill="#47A248"><path d="M12 .5c-.3 0-.6.2-.8.5C9.4 4.5 5 10.5 5 15.5 5 19.5 8 23 12 23.5c4-.5 7-4 7-8 0-5-4.4-11-6.2-14.5-.2-.3-.5-.5-.8-.5zm0 2.5c1.4 3 4.5 8 4.5 12.5C16.5 18 14.5 21 12 21c-2.5 0-4.5-3-4.5-5.5 0-4.5 3.1-9.5 4.5-12.5z"/></svg>`,
    level: '3+ Years',
    desc: 'NoSQL query structures, aggregation frameworks, index configurations, schema modeling validations, and high-volume database connectivity optimization.',
    tech: 'Mongoose, Aggregations, Indexes, Schema Design'
  },
  {
    name: 'Tailwind CSS',
    logo: `<svg viewBox="0 0 24 24" fill="#38BDF8"><path d="M12 6.1C9.6 6.1 8 7.3 7.2 9.7c1-.7 2.2-.6 2.7.2.4.6.8 1.1 1.7 1.1 2.4 0 4-1.2 4.8-3.6-1 .7-2.2.6-2.7-.2-.4-.6-.8-1.1-1.7-1.1zm-4.8 6.1C4.8 12.2 3.2 13.4 2.4 15.8c1-.7 2.2-.6 2.7.2.4.6.8 1.1 1.7 1.1 2.4 0 4-1.2 4.8-3.6-1 .7-2.2.6-2.7-.2-.4-.6-.8-1.1-1.7-1.1z"/></svg>`,
    level: '4+ Years',
    desc: 'Utility-first frontend design systems, responsive grid mappings, theme overrides config, component extraction, and optimized stylesheet sizes using post-css purging.',
    tech: 'Tailwind CSS v3/v4, Config, Responsive Design, PostCSS'
  },
  {
    name: 'Git',
    logo: `<svg viewBox="0 0 24 24" fill="#F05032"><path d="M23.3 10.9L13.1.7c-.9-.9-2.4-.9-3.3 0L7.7 2.8l3 3c.7-.2 1.5 0 2 .6.6.6.7 1.4.3 2l3 3c.6-.4 1.4-.3 2 .3.8.8.8 2 0 2.8-.8.8-2 .8-2.8 0-.6-.6-.7-1.4-.3-2l-3-3v4.6c.4.3.7.8.7 1.4 0 .9-.7 1.7-1.7 1.7s-1.7-.8-1.7-1.7c0-.6.3-1.1.7-1.4V9.6c-.4-.3-.7-.8-.7-1.4 0-.6.3-1.1.7-1.4l-3-3L.7 10.9c-.9.9-.9 2.4 0 3.3l10.2 10.2c.9.9 2.4.9 3.3 0l10.2-10.2c.9-.9.9-2.4 0-3.3z"/></svg>`,
    level: '5+ Years',
    desc: 'Distributed version control systems, complex branching workflows (GitFlow), cherry-picking commits, rebasing histories, merge conflicts resolving, and hooks automation.',
    tech: 'Git CLI, Branching, Rebasing, Conflict Resolution'
  },
  {
    name: 'GitHub',
    logo: `<svg viewBox="0 0 24 24" fill="#FFFFFF"><path d="M12 .3C5.4.3 0 5.7 0 12.3c0 5.3 3.4 9.8 8.2 11.4.6.1.8-.3.8-.6v-2.2c-3.3.7-4-1.6-4-1.6-.5-1.4-1.3-1.8-1.3-1.8-1.1-.7.1-.7.1-.7 1.2.1 1.9 1.2 1.9 1.2 1.1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.7.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 24 12.3C24 5.7 18.6.3 12 .3z"/></svg>`,
    level: '5+ Years',
    desc: 'Collaboration hub for projects codebase. Configured CI/CD GitHub Actions pipelines, pull request reviews, repository access, and issue tracking boards.',
    tech: 'GitHub Actions, Pull Requests, Security Scanning, Projects'
  }
];

function initInteractiveSkills() {
  const ring = document.querySelector('.skills-wheel-ring');
  const mobileNav = document.querySelector('.skills-mobile-nav');
  if (!ring) return;

  // 1. Generate desktop nodes
  ring.innerHTML = SKILLS_DATA.map((skill, index) => {
    return `
      <button class="skill-node-btn" data-index="${index}" aria-label="Select ${skill.name}">
        <div class="skill-node-icon-wrapper">${skill.logo}</div>
      </button>
    `;
  }).join('');

  // 2. Generate mobile swipe nodes
  if (mobileNav) {
    mobileNav.innerHTML = SKILLS_DATA.map((skill, index) => {
      return `
        <button class="mobile-skill-btn" data-index="${index}" aria-label="Select ${skill.name}">
          <div class="mobile-skill-icon">${skill.logo}</div>
          <span class="mobile-skill-name font-secondary">${skill.name}</span>
        </button>
      `;
    }).join('');
  }

  const desktopNodes = document.querySelectorAll('.skill-node-btn');
  const mobileNodes = document.querySelectorAll('.mobile-skill-btn');
  const totalSkills = SKILLS_DATA.length;
  let activeIndex = -1;
  let autoplayTimer = null;
  let inactivityTimeout = null;
  const AUTOPLAY_DELAY = 3000;
  const RESUME_DELAY = 5000;

  // Position nodes geometrically on the circle
  const positionNodes = () => {
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    const radius = isTablet ? 200 : 270; // 35% size increase (200 -> 270)

    desktopNodes.forEach((node, i) => {
      const angleDegrees = (i * 360 / totalSkills);
      const angleRadians = angleDegrees * Math.PI / 180;
      
      const x = radius * Math.cos(angleRadians);
      const y = radius * Math.sin(angleRadians);
      
      node.style.transform = `translate(-50%, -50%) translate(${x}px, ${y}px)`;
    });
  };

  positionNodes();
  window.addEventListener('resize', positionNodes);

  // Autoplay control functions
  const startAutoplay = () => {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      const nextIndex = (activeIndex + 1) % totalSkills;
      selectSkill(nextIndex, 'autoplay');
    }, AUTOPLAY_DELAY);
  };

  const stopAutoplay = () => {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  };

  const resetInactivityTimer = () => {
    stopAutoplay();
    if (inactivityTimeout) clearTimeout(inactivityTimeout);
    inactivityTimeout = setTimeout(() => {
      startAutoplay();
    }, RESUME_DELAY);
  };

  // Core selection routine
  const selectSkill = (index, triggerAction = 'click') => {
    // Reset inactivity timer if triggered manually by user hover or click (even if already active)
    if (triggerAction.startsWith('manual')) {
      resetInactivityTimer();
    }

    if (activeIndex === index) return;
    
    activeIndex = index;

    // Toggle active state classes on desktop & mobile list
    desktopNodes.forEach((n, idx) => n.classList.toggle('active', idx === index));
    mobileNodes.forEach((n, idx) => n.classList.toggle('active', idx === index));

    // Rotate the ring so that the selected node goes to the top (12 o'clock / -90 deg)
    const targetAngle = -(index * 36) - 90;
    
    gsap.to(ring, {
      rotation: targetAngle,
      duration: 1,
      ease: 'power3.out',
      overwrite: 'auto'
    });

    // Counter-rotate the individual icons inside the nodes to keep them upright
    desktopNodes.forEach((n) => {
      const icon = n.querySelector('.skill-node-icon-wrapper');
      if (icon) {
        gsap.to(icon, {
          rotation: -targetAngle,
          duration: 1,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    // Center active node inside the horizontal swipe nav on mobile
    if (mobileNav && mobileNodes[index]) {
      const activeBtn = mobileNodes[index];
      const scrollLeftPos = activeBtn.offsetLeft - (mobileNav.clientWidth / 2) + (activeBtn.clientWidth / 2);
      mobileNav.scrollTo({ left: scrollLeftPos, behavior: 'smooth' });
    }

    // Animate details content update (fade out, change content, fade back in)
    const skill = SKILLS_DATA[index];
    const centerInner = document.querySelector('.skills-center-inner');
    
    if (centerInner) {
      gsap.to(centerInner, {
        opacity: 0,
        scale: 0.9,
        duration: 0.25,
        ease: 'power2.in',
        onComplete: () => {
          document.querySelector('.center-logo-wrapper').innerHTML = skill.logo;
          document.querySelector('.center-skill-name').textContent = skill.name;
          document.querySelector('.center-skill-desc').textContent = skill.desc;
          
          const tagsRow = document.querySelector('.center-skill-tags');
          if (tagsRow) {
            tagsRow.innerHTML = skill.tech.split(', ').map(t => `<span class="tech-tag">${t}</span>`).join('');
          }

          gsap.to(centerInner, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out'
          });
        }
      });
    }
  };

  // Add click/hover event listeners to desktop nodes
  desktopNodes.forEach((node, idx) => {
    node.addEventListener('mouseenter', () => selectSkill(idx, 'manual-hover'));
    node.addEventListener('click', () => selectSkill(idx, 'manual-click'));
  });

  // Add click event listeners to mobile list
  mobileNodes.forEach((node, idx) => {
    node.addEventListener('click', () => selectSkill(idx, 'manual-click'));
  });

  // Default to React (index 3) on page load
  selectSkill(3, 'init');
  
  // Start automated wheel carousel
  startAutoplay();
}

initInteractiveSkills();


/* --- 4. ABOUT INTERACTIVE PORTRAIT SHOWCASE --- */
function initAboutShowcase() {
  const showcase = document.querySelector('.about-showcase-col');
  const container = document.querySelector('.about-portrait-container');
  const image = document.querySelector('.about-portrait-img');
  const backdropLeft = document.querySelector('.about-backdrop-text-left');
  const backdropRight = document.querySelector('.about-backdrop-text-right');

  if (!showcase || !container || !image) return;

  // Gentle floating animation on portrait container
  gsap.to(container, {
    y: -10,
    duration: 3.2,
    ease: 'sine.inOut',
    yoyo: true,
    repeat: -1
  });

  // Mouse tilt and Parallax interaction
  showcase.addEventListener('mousemove', (e) => {
    const rect = showcase.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const xc = rect.width / 2;
    const yc = rect.height / 2;

    // Normalised ratios [-1 to 1]
    const nx = (x - xc) / xc;
    const ny = (y - yc) / yc;

    // 1. 3D Tilt on the portrait image
    const tiltX = -ny * 4;
    const tiltY = nx * 4;
    gsap.to(image, {
      rotationX: tiltX,
      rotationY: tiltY,
      transformPerspective: 800,
      ease: 'power2.out',
      duration: 0.4
    });

    // 2. Parallax: Container shifts in direction of cursor
    gsap.to(container, {
      x: nx * 10,
      ease: 'power2.out',
      duration: 0.4
    });

    // 3. Parallax: Backdrop text shifts slightly opposite to portrait
    const backdropEls = [backdropLeft, backdropRight].filter(Boolean);
    if (backdropEls.length) {
      gsap.to(backdropEls, {
        x: -nx * 12,
        y: -ny * 6,
        ease: 'power2.out',
        duration: 0.5
      });
    }
  });

  showcase.addEventListener('mouseleave', () => {
    const targets = [image, container];
    if (backdropLeft) targets.push(backdropLeft);
    if (backdropRight) targets.push(backdropRight);

    gsap.to(targets, {
      rotationX: 0,
      rotationY: 0,
      x: 0,
      y: 0,
      ease: 'power2.out',
      duration: 0.6
    });
  });
}

initAboutShowcase();

/* --- 6. MAGNETIC BUTTONS --- */
const magneticBtns = document.querySelectorAll('.magnetic-btn');
magneticBtns.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    
    gsap.to(btn, {
      x: x * 0.38,
      y: y * 0.38,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
  
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: 'elastic.out(1.1, 0.35)'
    });
  });
});

/* --- 7. CONTACT BUTTONS & SOCIALS GSAP HOVER --- */
const contactActionBtns = document.querySelectorAll('.contact-actions .btn');
contactActionBtns.forEach(btn => {
  const arrow = btn.querySelector('svg');
  btn.addEventListener('mouseenter', () => {
    gsap.to(btn, {
      backgroundColor: '#D90429', // var(--color-accent)
      borderColor: '#D90429',
      duration: 0.35,
      ease: 'power2.out'
    });
    if (arrow) {
      gsap.to(arrow, {
        x: 4,
        y: -4,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, {
      backgroundColor: '#000000',
      borderColor: 'rgba(255, 255, 255, 0.15)',
      duration: 0.35,
      ease: 'power2.out'
    });
    if (arrow) {
      gsap.to(arrow, {
        x: 0,
        y: 0,
        duration: 0.35,
        ease: 'power2.out'
      });
    }
  });
});

const contactSocialsList = document.querySelectorAll('.contact-social-icon');
contactSocialsList.forEach(icon => {
  icon.addEventListener('mouseenter', () => {
    gsap.to(icon, {
      y: -6,
      rotation: 8,
      borderColor: '#D90429', // var(--color-accent)
      backgroundColor: 'rgba(217, 4, 41, 0.08)',
      boxShadow: '0 10px 20px rgba(217, 4, 41, 0.3)',
      color: '#FFFFFF',
      duration: 0.35,
      ease: 'power2.out'
    });
  });
  icon.addEventListener('mouseleave', () => {
    gsap.to(icon, {
      y: 0,
      rotation: 0,
      borderColor: 'rgba(255, 255, 255, 0.05)',
      backgroundColor: 'rgba(255, 255, 255, 0.02)',
      boxShadow: '0px 0px 0px rgba(0,0,0,0)',
      color: 'rgba(255, 255, 255, 0.7)',
      duration: 0.35,
      ease: 'power2.out'
    });
  });
});


