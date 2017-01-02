import Reqwest from "reqwest";

export default class TaskManager {
  constructor(value) {
    let elements = {};
    elements.todo = document.getElementsByClassName('todo')[0];
    elements.tasks = [];

    this.state = {
      "elements": elements,
      "loaded": false,
      "finished": false
    };

    this.promise = Reqwest({
      "url": "src/js/data.json",
      "method": "get",
      "success": (response) => {
        let data = JSON.parse(response.response);
        this.state.loaded = true;
        this.state.tasks = data.testguy.tasks;
      }
    });
  }

  populateTodo() {
    this.promise.then((result) => {
      this.state.tasks.map((e, i) => {
        // Generate a DOM element for each task
        let el = document.createElement('li');
        el.className = `task-${i}`;

        // Create upper and lower halves for the CSS split effect
        let upper = document.createElement('div');
        let lower = document.createElement('div');
        let shadow = document.createElement('div');

        // Truncate name to 20 characters
        let name = e.name;

        if (name.length > 20) {
          name = name.slice(0, 17) + "...";
        }

        upper.className = 'task-name-upper';
        lower.className = 'task-name-lower';
        shadow.className = 'task-name-shadow';
        upper.innerText = name;
        lower.innerText = name;
        shadow.innerText = name;
        el.appendChild(upper);
        el.appendChild(lower);
        el.appendChild(shadow);

        // Add to DOM, then state
        this.state.elements.todo.appendChild(el);
        this.state.elements.tasks.push(el);
      });
    });
  }

  start() {
    this.populateTodo();

    // Play the drop-in animations
    let dropInAnim = new Promise((resolve, reject) => {
      let animationDelay = 200;

      this.state.elements.tasks.map((task, i, a) => {
        let delay = (i === 0) ? 0 : (i * animationDelay) + (i * 200);

        setTimeout(() => {
          task.className = task.className + " drop-in";

          // On our last element, resolve and continue to the 'task completed' animations.
          if (i === (a.length - 1)) {
            setTimeout(() => {
              resolve(true);
            }, delay);
          }
        }, delay);
      });
    });

    // Play the 'task completed' animations
    dropInAnim.then((result) => {
      let animationDelay = 200;

      this.state.tasks.map((e, i, a) => {
        let delay = (i === 0) ? 0 : (i * animationDelay) + (i * 200);

        if (e.complete === true) {
          setTimeout(() => {
            let task = this.state.elements.tasks[i];
            task.className = task.className + " completed";
          }, delay);
        }

        // On our last element, set 'finished' state.
        if (i === (a.length - 1)) {
          setTimeout(() => {
            this.state.finished = true;
          }, delay);
        }
      });
    });

    // Return a promise that monitors our animation state
    let finished = new Promise((resolve, reject) => {
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

    return finished;
  }
}
