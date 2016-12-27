import * as Utils from "./utils";

function getModifier() {
  return Utils.randomRange(0.8, 1.6, 2);
}

function spawnParticles(container, n, className='particle') {
  let particles = [];

  for (let i = 0; i < n; i++) {
    let el = document.createElement('div');
    el.className = `${className} ${className}-${i}`;
    container.appendChild(el);

    particles[i] = new Particle(el, i, className);
  }

  return particles;
}

class Particle {
  constructor(el, number, type) {
    this.state = {
      el,
      number,
      type,
      'dead': false
    };

    // Easier to set it up this way.
    this.die();
  }

  die() {
    if (this.state.dead === true) {
      return;
    }

    let birth = new Date();
    let now = new Date();
    now.setMilliseconds(now.getMilliseconds() + Utils.randomRange(200, 3000));

    this.state.modifier = getModifier();
    this.state.birth = birth;
    this.state.expiration = now;
    this.state.el.style = "";

    if (this.state.type === 'particle-x') {
      this.state.curve = [
        {
          "x": Utils.randomRange(-(window.xContainerWidth), 0),
          "y": Utils.randomRange(-350, 350)
        },
        {
          "x": Utils.randomRange(-(window.xContainerWidth), 0),
          "y": Utils.randomRange(-350, 350)
        },
        {
          "x": Utils.randomRange(-(window.xContainerWidth), 0),
          "y": Utils.randomRange(-50, 50)
        }
      ];
    } else {
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
  }

  step() {
    let lifetime = this.state.expiration - this.state.birth;
    let elapsed = this.state.expiration - window.currentTime;

    if (elapsed <= 0) {
      if (this.state.type === 'particle-x') {
        this.state.el.parentElement.removeChild(this.state.el);
        this.state.dead = true;
      }

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
    elements.particleXContainer = document.getElementsByClassName("particle-x-container")[0];

    let particles = spawnParticles(elements.particleContainer, 10);

    this.state = {
      elements,
      particles,
      'finished': false
    };

    setTimeout(() => {
      this.state.xParticles = spawnParticles(elements.particleXContainer, 100, 'particle-x');
      this.state.finished = true;
    }, 1500);
  }

  loop() {
    window.currentTime = new Date();
    window.xContainerWidth = this.state.elements.particleXContainer.offsetWidth;

    for (let particle of this.state.particles) {
      particle.step();
    }

    if (this.state.finished === true) {
      this.state.xParticles = this.state.xParticles.filter((e, i) => {
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
}

let app = new Main();
app.loop();
