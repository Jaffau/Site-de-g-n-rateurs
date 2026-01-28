(function () {
  const c = document.getElementById("particles");
  if (!c) return;
  const ctx = c.getContext("2d");

  function resize() {
    c.width = innerWidth;
    c.height = innerHeight;
  }
  addEventListener("resize", resize);
  resize();

  const particles = Array.from({ length: 120 }, () => ({
    x: Math.random() * c.width,
    y: Math.random() * c.height,
    r: Math.random() * 1.6 + 0.5,
    dx: (Math.random() - 0.5) * 0.55,
    dy: (Math.random() - 0.5) * 0.55,
    a: Math.random() * 0.22 + 0.12
  }));

  function tick() {
    ctx.clearRect(0, 0, c.width, c.height);
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(226,232,240,${p.a})`;
      ctx.fill();

      p.x += p.dx;
      p.y += p.dy;

      if (p.x < 0) p.x = c.width;
      if (p.x > c.width) p.x = 0;
      if (p.y < 0) p.y = c.height;
      if (p.y > c.height) p.y = 0;
    }
    requestAnimationFrame(tick);
  }
  tick();
})();
