import * as Utils from "./utils";

function getModifier() {
  return Utils.randomRange(0.8, 1.6, 2);
}

function spawnParticles(container, n) {
  let particles = [];

  for (let i = 0; i < n; i++) {
    let el = document.createElement('div');
    el.className = `particle particle-${i}`;
    container.appendChild(el);

    particles[i] = new Particle(el, i);
  }

  return particles;
}

class Particle {
  constructor(el, number) {
    this.state = {
      el,
      number
    };

    // Easier to set it up this way.
    this.die();
  }

  die() {
    let birth = new Date();
    let now = new Date();
    now.setMilliseconds(now.getMilliseconds() + Utils.randomRange(200, 3000));

    this.state.modifier = getModifier();
    this.state.birth = birth;
    this.state.expiration = now;
    this.state.el.style = "";
    this.state.curve = [
      {
        "x": Utils.randomRange(50, 200),
        "y": Utils.randomRange(-100, 250) // 0, 25 is up drift
      },
      {
        "x": Utils.randomRange(-30, 400),
        "y": Utils.randomRange(-25, 75)
      },
      {
        "x": Utils.randomRange(0, 5),
        "y": Utils.randomRange(0, 95)
      }
    ];
  }

  step() {
    let lifetime = this.state.expiration - this.state.birth;
    let elapsed = this.state.expiration - window.currentTime;

    if (elapsed <= 0) {
      this.die();
      return;
    }

    let t =  Math.floor((elapsed / lifetime) * 100) / 100;
    let p = this.state.curve;
    let x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
    let y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;

    // Set opacity
    this.state.el.style.opacity = String(t);
    // Set position
    this.state.el.style.transform = `translateX(${x}px) translateY(${y}px`;
  }
}

export default class Main {
  constructor() {
    this.fps = 60;

    let elements = {};
    elements.bar = document.getElementsByClassName("bar")[0];
    elements.fill = document.getElementsByClassName("fill")[0];
    elements.particleContainer = document.getElementsByClassName("particle-container")[0];

    let particles = spawnParticles(elements.particleContainer, 10);

    this.state = {
      elements,
      particles
    };
  }

  loop() {
    window.currentTime = new Date();

    for (let particle of this.state.particles) {
      particle.step();
    }

    setTimeout(() => {
      window.requestAnimationFrame(this.loop.bind(this));
    }, 1000 / this.fps);
  }
}

let app = new Main();
app.loop();
