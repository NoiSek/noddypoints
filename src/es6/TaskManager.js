export default class TaskManager {
  constructor(value) {
    let elements = {};
    elements.todo = document.getElementsByClassName('todo')[0];
    elements.tasks = Array.from(document.getElementsByClassName('test'));

    this.state = {
      "elements": elements,
      "finished": false
    };
  }

  start() {
    let promise = new Promise((resolve, reject) => {
      let animationDelay = 200;

      this.state.elements.tasks.map((task, i, a) => {
        let delay = (i === 0) ? 0 : (i * animationDelay) + (i * 1000);

        setTimeout(() => {
          task.className = task.className + " drop-in";

          if (i === (a.length - 1)) {
            setTimeout(() => {
              resolve(true);
            }, delay);
          }
        }, delay);
      });
    });

    return promise;
  }
}
