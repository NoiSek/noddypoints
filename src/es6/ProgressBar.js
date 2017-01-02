import Particle from "./Particle";

function spawnParticles(container, n, className='particle') {
  let particles = [];

  for (let i = 0; i < n; i++) {
    let el = document.createElement('div');
    el.className = `${className} ${className}-${i} hidden`;
    container.appendChild(el);

    particles[i] = new Particle(el, i, className);
  }

  return particles;
}

export default class ProgressBar {
  constructor() {
    this.fps = 60;

    let elements = {};
    elements.bar = document.getElementsByClassName("bar")[0];
    elements.fill = document.getElementsByClassName("fill")[0];
    elements.particleContainer = document.getElementsByClassName("particle-container")[0];
    elements.particleXContainer = document.getElementsByClassName("particle-x-container")[0];

    let particles = spawnParticles(elements.particleContainer, 10);
    let xParticles = spawnParticles(elements.particleXContainer, 50, 'particle-x');

    this.state = {
      elements,
      particles,
      xParticles,
      'triggerFinalAnimation': false
    };
  }

  loop() {
    window.currentTime = new Date();
    window.xContainerWidth = this.state.elements.particleXContainer.offsetWidth;

    for (let particle of this.state.particles) {
      particle.step();
    }

    if (this.state.triggerFinalAnimation === true) {
      this.state.xParticles = this.state.xParticles.filter((e) => {
        return e.state.dead === false;
      });

      for (let xParticle of this.state.xParticles) {
        xParticle.step();
      }
    }

    setTimeout(() => {
      window.requestAnimationFrame(this.loop.bind(this));
    }, 1000 / this.fps);
  }

  playGrowAnimation() {
    this.state.elements.fill.className = this.state.elements.fill.className + " animate";

    setTimeout(() => {
      this.state.triggerFinalAnimation = true;
    }, 2000);
  }
}
