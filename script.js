const modeButtons = document.querySelectorAll(".mode-pill");
const modePanels = document.querySelectorAll(".mode-panel, .mode-block[data-panel]");
const navLinks = document.querySelectorAll(".nav a");
const sections = document.querySelectorAll("main section[id]");
const revealTargets = document.querySelectorAll(
  ".hero, .callout, .modes-section, .framework-section, .results-section, .study-section, .impact-section"
);
const countTargets = document.querySelectorAll("[data-count]");
const barFills = document.querySelectorAll(".bar-fill");

for (const target of revealTargets) {
  target.classList.add("reveal");
}

const activateMode = (mode) => {
  modeButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.mode === mode);
  });

  modePanels.forEach((panel) => {
    panel.classList.toggle("is-active", panel.dataset.panel === mode);
  });
};

modeButtons.forEach((button) => {
  button.addEventListener("click", () => activateMode(button.dataset.mode));
});

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add("is-visible");

      if (entry.target.matches(".results-section, .framework-section")) {
        countTargets.forEach((item) => animateCount(item));
        barFills.forEach((bar) => bar.classList.add("is-visible"));
      }

      revealObserver.unobserve(entry.target);
    });
  },
  { threshold: 0.18 }
);

revealTargets.forEach((target) => revealObserver.observe(target));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        link.classList.toggle("is-active", active);
      });
    });
  },
  {
    threshold: 0.45,
    rootMargin: "-10% 0px -45% 0px"
  }
);

sections.forEach((section) => sectionObserver.observe(section));

function animateCount(element) {
  if (element.dataset.animated === "true") {
    return;
  }

  element.dataset.animated = "true";
  const endValue = Number.parseFloat(element.dataset.count);
  const suffix = endValue % 1 === 0 ? "" : "%";
  const duration = 1200;
  const start = performance.now();

  const step = (timestamp) => {
    const progress = Math.min((timestamp - start) / duration, 1);
    const current = endValue * (1 - Math.pow(1 - progress, 3));
    element.textContent =
      progress === 1 ? `${endValue}${suffix}` : `${current.toFixed(1)}${suffix}`;

    if (progress < 1) {
      requestAnimationFrame(step);
    }
  };

  requestAnimationFrame(step);
}

activateMode("find");

// Motivation carousel
const track = document.getElementById("failureCarousel")?.querySelector(".carousel-track");
const prevBtn = document.getElementById("carouselPrev");
const nextBtn = document.getElementById("carouselNext");
const dotsContainer = document.getElementById("carouselDots");

if (track && prevBtn && nextBtn && dotsContainer) {
  const slides = track.querySelectorAll(".carousel-slide");
  const total = slides.length;
  let current = 0;

  const labelBtns = dotsContainer.querySelectorAll(".carousel-label-btn");

  labelBtns.forEach((btn) => {
    btn.addEventListener("click", () => goTo(Number(btn.dataset.slide)));
  });

  function goTo(index) {
    current = index;
    track.style.transform = `translateX(-${current * 100}%)`;
    prevBtn.disabled = current === 0;
    nextBtn.disabled = current === total - 1;
    labelBtns.forEach((b, i) => b.classList.toggle("is-active", i === current));
  }

  prevBtn.addEventListener("click", () => goTo(current - 1));
  nextBtn.addEventListener("click", () => goTo(current + 1));
  goTo(0);
}

// Prompt tab switching
const promptPills = document.querySelectorAll(".prompt-pill");
const promptPanels = document.querySelectorAll(".prompt-panel");

promptPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const target = pill.dataset.prompt;
    promptPills.forEach((p) => p.classList.remove("is-active"));
    promptPanels.forEach((p) => p.classList.toggle("is-active", p.dataset.promptPanel === target));
    pill.classList.add("is-active");
  });
});

// Video demonstrations tab switching
const videoPills = document.querySelectorAll(".video-pill");
const videoPlayers = document.querySelectorAll(".video-player");

videoPills.forEach((pill) => {
  pill.addEventListener("click", () => {
    const target = pill.dataset.video;
    videoPills.forEach((p) => p.classList.remove("is-active"));
    videoPlayers.forEach((v) => {
      const active = v.dataset.videoPanel === target;
      v.classList.toggle("is-active", active);
      if (!active) v.pause();
    });
    pill.classList.add("is-active");
  });
});

// BibTeX copy button
const copyBtn = document.getElementById("copyBibtex");
const bibtexContent = document.getElementById("bibtexContent");

if (copyBtn && bibtexContent) {
  copyBtn.addEventListener("click", () => {
    navigator.clipboard.writeText(bibtexContent.textContent).then(() => {
      copyBtn.textContent = "Copied!";
      copyBtn.classList.add("copied");
      setTimeout(() => {
        copyBtn.textContent = "Copy";
        copyBtn.classList.remove("copied");
      }, 2000);
    });
  });
}
