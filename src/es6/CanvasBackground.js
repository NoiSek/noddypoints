import * as Utils from "./Utils";

class Star {
  constructor() {
    this.height = 3;
    this.width = 3;

    this.state = {
      "initialized": false
    };
  }

  die() {
    this.state.initialized = false;
    this.initialize();
  }

  initialize() {
    // On our first loop, initialize
    if (this.state.initialized === false) {
      let birth = new Date();
      let expiration = new Date();
      expiration.setMilliseconds(expiration.getMilliseconds() + Utils.randomRange(3000, 5000));

      this.state.position = {
        "x": Utils.randomRange(0, (window.canvasWidth * 0.8)),
        "y": Utils.randomRange(0, window.canvasHeight)
      };

      this.state.birth = birth;
      this.state.expiration = expiration;
      this.state.velocity = {
        "x": Utils.randomRange(1, 3),
        "y": Utils.randomRange(0, 2)
      };

      this.state.initialized = true;
    }
  }

  step(context) {
    this.initialize();
    let elapsed = this.state.expiration - window.currentTime;

    if (elapsed <= 0) {
      this.die();
    }

    // Determine our new position
    this.state.position.x = this.state.position.x + this.state.velocity.x;
    this.state.position.y = this.state.position.y + this.state.velocity.y;

    // Draw ourselves
    context.fillStyle = window.testColor;//"rgb(135, 83, 187)";
    context.fillRect(this.state.position.x, this.state.position.y, this.height, this.width);
  }
}

export default class CanvasBackground {
  constructor() {
    this.fps = 120;
    window.testColor = "rgb(135, 83, 187)";

    // Store references to our DOM Elements
    let elements = {};
    elements.canvasBackground = document.getElementsByClassName('canvas-background')[0];
    elements.canvasStars = document.getElementsByClassName('canvas-stars')[0];

    // Reasons
    window.canvasHeight = elements.canvasStars.height;
    window.canvasWidth = elements.canvasStars.width;

    // Draw our background
    this.drawInitialBackground(elements.canvasBackground);

    // Store star context, as we will be manipulating this every frame.
    let context = elements.canvasStars.getContext('2d');

    let stars = [];
    for (let i = 0; i < 50; i++) {
      stars.push(new Star());
    }

    this.state = {
      context,
      elements,
      stars
    };
  }

  drawInitialBackground(el) {
    let context = el.getContext('2d');

    let verticalWindowMedian = el.height / 2;
    let horizontalEndPoint = el.width;

    let startingLineWidth = el.height * 0.8;
    let verticalStartingPoint = Utils.randomRange(verticalWindowMedian - (el.height * 0.1), verticalWindowMedian - (el.height * 0.1));

    // Let's get started, boys.
    let lineWidth = Math.floor(startingLineWidth);
    let position = {
      "x": 0,
      "y": verticalStartingPoint
    };

    let initial = true;

    // Draw our jagged line.
    while (position.x < horizontalEndPoint) {
      let x, y;

      // On normal runs, find our vertical offset and linewidth
      let newLineWidth = lineWidth - Utils.randomRange((lineWidth * 0.1), (lineWidth * 0.4));
      newLineWidth = Math.max(newLineWidth, 2);
      y = position.y + Utils.randomRange(-(lineWidth * 0.1), (lineWidth * 0.1));

      // Make sure that we draw with the defaults, the first time.
      if (initial === true) {
        newLineWidth = lineWidth;
        y = position.y;
      }

      let divisor = Utils.randomRange(5, 15);
      let length = Math.floor(el.width / divisor);
      x = position.x + length;

      // Set our line path
      context.beginPath();
      context.moveTo(position.x, y);
      context.lineTo(x, y);

      // Complicated scientific quantum physics draw routine
      let values = ['0.2', '0.4', '0.6', '0.8', '1'];

      values.reverse().map((e, i) => {
        context.lineWidth = newLineWidth + (i * 25);
        context.strokeStyle = `rgba(51, 28, 74, ${e})`;
        context.stroke();
      });

      // Forward our new values.
      position.x = x;
      position.y = y;
      lineWidth = newLineWidth;

      initial = false;
    }
  }

  loop() {
    // First, we fade out by 1%
    let context = this.state.context;

    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = "rgba(0, 0, 0, 0.3)";
    context.fillRect(0, 0 , window.innerWidth, window.innerHeight);

    context.globalCompositeOperation = 'source-over';

    for (let star of this.state.stars) {
      star.step(context);
    }

    setTimeout(() => {
      window.requestAnimationFrame(this.loop.bind(this));
    }, 1000 / this.fps);
  }
}
