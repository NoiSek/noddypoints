import ProgressBar from "./ProgressBar";
import TaskManager from "./TaskManager";
import Counter from "./Counter";

let bar = new ProgressBar();
let counter = new Counter(1200);
let taskManager = new TaskManager();

setTimeout(() => {
  taskManager.start().then((_) => {
    counter.start().then((_) => {
      bar.playGrowAnimation();
    });
  });
}, 2000);

bar.loop();
