function initParallax() {
  const main = document.querySelector('main');
  if (!main) return;

  let xp = 50;
  let yp = 50;

  function animate() {
    xp += 0.02; 
    yp += 0.01;

    if (xp > 90) xp = 10;
    if (yp > 80) yp = 20;

    main.style.backgroundPosition = `${xp}% ${yp}%`;

    requestAnimationFrame(animate);
  }
  animate();
}
document.addEventListener('DOMContentLoaded', initParallax);