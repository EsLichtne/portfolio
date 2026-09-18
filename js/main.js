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
