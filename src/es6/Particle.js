import * as Utils from "./Utils";

export default class Particle {
  constructor(el, number, type) {
    this.state = {
      el,
      number,
      type,
      'dead': false,
      'initialized': false
    };
  }

  die() {
    this.state.el.style = "";
  }

  initialize() {
    // On our first loop, initialize
    if (this.state.initialized === false) {
      let birth = new Date();
      let now = new Date();
      now.setMilliseconds(now.getMilliseconds() + Utils.randomRange(200, 3000));

      this.state.birth = birth;
      this.state.expiration = now;

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

      this.state.el.className = this.state.el.className.replace(" hidden", "");
      this.state.initialized = true;
    }
  }

  step() {
    this.initialize();

    let lifetime = this.state.expiration - this.state.birth;
    let elapsed = this.state.expiration - window.currentTime;

    if (elapsed <= 0) {
      if (this.state.type === 'particle-x') {
        this.state.el.parentElement.removeChild(this.state.el);
        this.state.dead = true;
      }

      this.state.el.className = this.state.el.className + " hidden";
      this.state.initialized = false;
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
