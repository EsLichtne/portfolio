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
  const covers = document.querySelectorAll(".case__cover");
  if (!covers.length || !("IntersectionObserver" in window)) return;

  const mq = window.matchMedia("(max-width: 1335px)");
  let observer = null;

  const sync = (entries) => {
    entries.forEach((entry) => {
      entry.target.closest(".case")?.classList.toggle(
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

    document.querySelectorAll(".case.is-in-view").forEach((caseEl) => {
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
