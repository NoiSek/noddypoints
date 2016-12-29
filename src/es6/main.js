import ProgressBar from "./ProgressBar";
import Counter from "./Counter";

let bar = new ProgressBar();
let counter = new Counter(1200);

let promise = counter.start();
bar.loop();

promise.then(() => {
  bar.playGrowAnimation();
});
