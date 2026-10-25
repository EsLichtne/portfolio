(() => {
  const button = document.querySelector("[data-menu-button]");
  const panel = document.querySelector("[data-menu-panel]");
  const overlay = document.querySelector("[data-menu-overlay]");
  if (!button || !panel || !overlay) return;

  const mq = window.matchMedia("(max-width: 1335px)");
  const focusableSelector =
    'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';
  const openLabel = button.getAttribute("aria-label") || "Open menu";
  const closeLabel = button.dataset.menuCloseLabel || "Close menu";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  let isOpen = false;
  let isClosing = false;
  let closeTimer = 0;
  let pendingHash = "";

  const getFocusable = () => {
    const inPanel = [...panel.querySelectorAll(focusableSelector)].filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
    return [button, ...inPanel];
  };

  const lockScroll = () => {
    document.body.classList.add("is-menu-open");
  };

  const unlockScroll = () => {
    document.body.classList.remove("is-menu-open", "is-menu-closing");
  };

  const open = () => {
    if (isOpen || isClosing || !mq.matches) return;

    isOpen = true;
    window.clearTimeout(closeTimer);
    panel.classList.remove("is-closing");
    document.body.classList.remove("is-menu-closing");

    lockScroll();
    panel.classList.add("is-open");
    overlay.classList.add("is-open");
    button.setAttribute("aria-expanded", "true");
    button.setAttribute("aria-label", closeLabel);

    const focusables = getFocusable();
    const target = focusables[1] || panel;
    window.requestAnimationFrame(() => {
      if (typeof target.focus === "function") {
        target.focus({ preventScroll: true });
      } else {
        panel.setAttribute("tabindex", "-1");
        panel.focus({ preventScroll: true });
      }
    });
  };

  const finishClose = () => {
    isOpen = false;
    isClosing = false;
    panel.classList.remove("is-open", "is-closing");
    overlay.classList.remove("is-open");
    unlockScroll();
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", openLabel);
    button.focus({ preventScroll: true });

    if (pendingHash) {
      const hash = pendingHash;
      pendingHash = "";
      if (location.hash === hash) {
        const target = document.getElementById(hash.slice(1));
        if (target) target.scrollIntoView();
      } else {
        location.hash = hash;
      }
    }
  };

  const close = () => {
    if (!isOpen || isClosing) return;

    isClosing = true;
    document.body.classList.add("is-menu-closing");
    panel.classList.add("is-closing");
    overlay.classList.remove("is-open");
    button.setAttribute("aria-expanded", "false");
    button.setAttribute("aria-label", openLabel);

    const delay = reducedMotion.matches
      ? 0
      : Number.parseInt(
          getComputedStyle(document.documentElement)
            .getPropertyValue("--duration-menu-close")
            .trim(),
          10
        ) || 240;

    window.clearTimeout(closeTimer);
    closeTimer = window.setTimeout(finishClose, delay);
  };

  const toggle = () => {
    if (isOpen) close();
    else open();
  };

  button.addEventListener("click", toggle);
  overlay.addEventListener("click", close);

  panel.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || !panel.contains(link)) return;

    const href = link.getAttribute("href") || "";
    try {
      const url = new URL(href, location.href);
      if (
        url.origin === location.origin &&
        url.pathname === location.pathname &&
        url.hash.length > 1
      ) {
        event.preventDefault();
        pendingHash = url.hash;
      }
    } catch (_) {
      /* ignore invalid href */
    }

    close();
  });

  document.addEventListener("keydown", (event) => {
    if (!isOpen) return;

    if (event.key === "Escape") {
      event.preventDefault();
      close();
      return;
    }

    if (event.key !== "Tab") return;

    const focusables = getFocusable();
    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];
    const active = document.activeElement;

    if (event.shiftKey && active === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && active === last) {
      event.preventDefault();
      first.focus();
    }
  });

  const onBreakpointChange = () => {
    if (!mq.matches && isOpen) {
      window.clearTimeout(closeTimer);
      finishClose();
    }
  };

  mq.addEventListener("change", onBreakpointChange);
})();
