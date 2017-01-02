import * as Utils from "./Utils";

export default class Counter {
  constructor(value) {
    let elements = {};
    elements.counter = document.getElementsByClassName('counter')[0];
    elements.counterValue = document.getElementsByClassName('points')[0];
    elements.counterDescription = document.getElementsByClassName('description')[0];
    elements.counterModifier = document.getElementsByClassName('modifier')[0];

    this.state = {
      "currentValue": 0,
      "elements": elements,
      "finished": false,
      "goalValue": value,
      "incrementCounter": 0,
      "speed": 200
    };
  }

  rapidifySpeedMostFastlyBuckaroo() {
    if (this.state.finished === false && this.state.speed > 2) {
      setTimeout(() => {
        this.state.speed = Math.max(2, this.state.speed / 2);
        this.rapidifySpeedMostFastlyBuckaroo();
      }, 500);
    }
  }

  start() {
    this.loop();
    this.rapidifySpeedMostFastlyBuckaroo();

    let promise = new Promise((resolve, reject) => {
      let checkFinished = () => {
        let finished = this.state.finished === true;

        if (finished) {
          resolve(this.state.currentValue);
        } else {
          setTimeout(checkFinished, 200);
        }
      };

      checkFinished();
    });

    return promise;
  }

  loop() {
    this.state.currentValue = this.state.currentValue + 1;
    this.state.incrementCounter = this.state.incrementCounter + 1;

    if (this.state.incrementCounter === 100) {
      this.state.incrementCounter = 0;
      this.playIncrementalAnimation();
    }

    if (this.state.currentValue === this.state.goalValue) {
      this.state.finished = true;
      this.playFinalAnimation();
    }

    this.state.elements.counterValue.innerText = Utils.commafy(this.state.currentValue);

    if (this.state.finished === false) {
      setTimeout(() => {
        this.loop();
      }, this.state.speed);
    }
  }

  playFinalAnimation() {
    this.state.elements.counter.className = this.state.elements.counter.className.replace(" increment", "");
    this.state.elements.counter.className += " finished";
  }

  playIncrementalAnimation() {
    this.state.elements.counter.className = this.state.elements.counter.className.replace(" increment", "");
    setTimeout(() => {
      if (this.state.finished === false) {
        this.state.elements.counter.className += " increment";
      }
    }, 15);
  }
}
