(() => {
  const timeValues = document.querySelectorAll("[data-local-time-value]");
  if (!timeValues.length) return;

  const formatter = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Novosibirsk",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  const render = () => {
    const value = formatter.format(new Date());
    timeValues.forEach((node) => {
      node.textContent = value;
    });
  };

  render();
  window.setInterval(render, 30_000);
})();

(() => {
  const covers = document.querySelectorAll("[data-case-cover]");
  if (!covers.length || !("IntersectionObserver" in window)) return;

  const mq = window.matchMedia("(max-width: 1335px)");
  let observer = null;

  const sync = (entries) => {
    entries.forEach((entry) => {
      entry.target.closest("[data-case]")?.classList.toggle(
        "is-in-view",
        entry.isIntersecting
      );
    });
  };

  const connect = () => {
    if (observer) {
      observer.disconnect();
      observer = null;
    }

    document.querySelectorAll("[data-case].is-in-view").forEach((caseEl) => {
      caseEl.classList.remove("is-in-view");
    });

    if (!mq.matches) return;

    observer = new IntersectionObserver(sync, {
      threshold: 0.45,
    });
    covers.forEach((cover) => observer.observe(cover));
  };

  connect();
  mq.addEventListener("change", connect);
})();

(() => {
  if (!window.lottie) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  if (!("IntersectionObserver" in window)) return;

  const nodes = document.querySelectorAll("[data-cover-lottie]");
  if (!nodes.length) return;

  const desktopMq = window.matchMedia(
    "(hover: hover) and (min-width: 1336px)"
  );
  const mobileMq = window.matchMedia("(max-width: 1335px)");

  nodes.forEach((container) => {
    const cover = container.parentElement;
    const src = container.getAttribute("data-src");
    const mode = container.getAttribute("data-lottie-play");
    if (!cover || !src || (mode !== "hover" && mode !== "visible")) return;

    let anim = null;
    let started = false;
    let playObserver = null;

    const play = () => {
      if (!anim) return;
      anim.play();
    };

    const pause = () => {
      if (!anim) return;
      anim.pause();
    };

    const disconnectPlayObserver = () => {
      if (playObserver) {
        playObserver.disconnect();
        playObserver = null;
      }
    };

    const bindHover = () => {
      const syncMobile = () => {
        disconnectPlayObserver();
        if (!mobileMq.matches || !anim) return;

        playObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (!anim) return;
              if (entry.isIntersecting) {
                play();
              } else {
                pause();
              }
            });
          },
          { threshold: 0.45 }
        );
        playObserver.observe(cover);
      };

      cover.addEventListener("mouseenter", () => {
        if (desktopMq.matches) play();
      });
      cover.addEventListener("mouseleave", () => {
        if (desktopMq.matches) pause();
      });
      cover.addEventListener("focusin", () => {
        if (desktopMq.matches && cover.matches(":focus-visible")) play();
      });
      cover.addEventListener("focusout", () => {
        if (!desktopMq.matches) return;
        window.requestAnimationFrame(() => {
          if (!cover.contains(document.activeElement)) pause();
        });
      });

      syncMobile();
      mobileMq.addEventListener("change", syncMobile);
    };

    const bindVisible = () => {
      playObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!anim) return;
            if (entry.isIntersecting) {
              play();
            } else {
              pause();
            }
          });
        },
        { threshold: 0 }
      );
      playObserver.observe(cover);
    };

    const load = () => {
      if (started) return;
      started = true;

      anim = window.lottie.loadAnimation({
        container,
        renderer: "svg",
        loop: true,
        autoplay: false,
        path: src,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice",
        },
      });

      anim.addEventListener("DOMLoaded", () => {
        cover.classList.add("is-lottie-ready");
        if (mode === "hover") {
          anim.goToAndStop(0, true);
          bindHover();
        } else {
          play();
          bindVisible();
        }
      });

      anim.addEventListener("data_failed", () => {
        cover.classList.remove("is-lottie-ready");
        disconnectPlayObserver();
        anim = null;
      });
    };

    if (mode === "visible") {
      load();
      return;
    }

    const lazyObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          load();
          lazyObserver.disconnect();
        });
      },
      { rootMargin: "200px" }
    );
    lazyObserver.observe(cover);
  });
})();

(() => {
  const toc = document.querySelector("[data-case-toc]");
  if (!toc || !("IntersectionObserver" in window)) return;

  const links = [...toc.querySelectorAll("a[href^='#']")];
  if (!links.length) return;

  const sections = links
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if (!sections.length) return;

  const setActive = (id) => {
    links.forEach((link) => {
      link.classList.toggle(
        "is-active",
        link.getAttribute("href") === `#${id}`
      );
    });
  };

  const visible = new Map();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visible.set(entry.target.id, entry.intersectionRatio);
        } else {
          visible.delete(entry.target.id);
        }
      });

      let nextId = null;
      let nextRatio = -1;
      visible.forEach((ratio, id) => {
        if (ratio > nextRatio) {
          nextRatio = ratio;
          nextId = id;
        }
      });

      if (nextId) setActive(nextId);
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0, 0.25, 0.5, 0.75, 1],
    }
  );

  sections.forEach((section) => observer.observe(section));
})();
