/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	var _CanvasBackground = __webpack_require__(1);

	var _CanvasBackground2 = _interopRequireDefault(_CanvasBackground);

	var _ProgressBar = __webpack_require__(3);

	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

	var _TaskManager = __webpack_require__(5);

	var _TaskManager2 = _interopRequireDefault(_TaskManager);

	var _Counter = __webpack_require__(8);

	var _Counter2 = _interopRequireDefault(_Counter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var bar = new _ProgressBar2.default();
	var counter = new _Counter2.default(1200);
	var taskManager = new _TaskManager2.default();
	var canvasBackground = new _CanvasBackground2.default();

	setTimeout(function () {
	  taskManager.start().then(function (_) {
	    counter.start().then(function (_) {
	      bar.playGrowAnimation();
	    });
	  });
	}, 2000);

	bar.loop();
	canvasBackground.loop();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(2);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Star = function () {
	  function Star() {
	    _classCallCheck(this, Star);

	    this.height = 3;
	    this.width = 3;

	    this.state = {
	      "initialized": false
	    };
	  }

	  _createClass(Star, [{
	    key: "die",
	    value: function die() {
	      this.state.initialized = false;
	      this.initialize();
	    }
	  }, {
	    key: "initialize",
	    value: function initialize() {
	      // On our first loop, initialize
	      if (this.state.initialized === false) {
	        var birth = new Date();
	        var expiration = new Date();
	        expiration.setMilliseconds(expiration.getMilliseconds() + Utils.randomRange(3000, 5000));

	        this.state.position = {
	          "x": Utils.randomRange(0, window.canvasWidth * 0.8),
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
	  }, {
	    key: "step",
	    value: function step(context) {
	      this.initialize();
	      var elapsed = this.state.expiration - window.currentTime;

	      if (elapsed <= 0) {
	        this.die();
	      }

	      // Determine our new position
	      this.state.position.x = this.state.position.x + this.state.velocity.x;
	      this.state.position.y = this.state.position.y + this.state.velocity.y;

	      // Draw ourselves
	      context.fillStyle = window.testColor; //"rgb(135, 83, 187)";
	      context.fillRect(this.state.position.x, this.state.position.y, this.height, this.width);
	    }
	  }]);

	  return Star;
	}();

	var CanvasBackground = function () {
	  function CanvasBackground() {
	    var _this = this;

	    _classCallCheck(this, CanvasBackground);

	    this.fps = 120;
	    window.testColor = "rgb(135, 83, 187)";

	    // Store references to our DOM Elements
	    var elements = {};
	    elements.canvasBackground = document.getElementsByClassName('canvas-background')[0];
	    elements.canvasStars = document.getElementsByClassName('canvas-stars')[0];

	    // Reasons
	    window.canvasHeight = elements.canvasStars.height;
	    window.canvasWidth = elements.canvasStars.width;

	    // Draw our background
	    this.drawInitialBackground(elements.canvasBackground);

	    setInterval(function () {
	      _this.drawInitialBackground(elements.canvasBackground);
	    }, 10000);

	    // Store star context, as we will be manipulating this every frame.
	    var context = elements.canvasStars.getContext('2d');

	    var stars = [];
	    for (var i = 0; i < 50; i++) {
	      stars.push(new Star());
	    }

	    this.state = {
	      context: context,
	      elements: elements,
	      stars: stars
	    };
	  }

	  _createClass(CanvasBackground, [{
	    key: "drawInitialBackground",
	    value: function drawInitialBackground(el) {
	      var context = el.getContext('2d');
	      context.clearRect(0, 0, el.width, el.height);

	      var verticalWindowMedian = el.height / 2;
	      var horizontalEndPoint = el.width;

	      var startingLineWidth = el.height * 0.8;
	      var verticalStartingPoint = Utils.randomRange(verticalWindowMedian - el.height * 0.1, verticalWindowMedian - el.height * 0.1);

	      // Let's get started, boys.
	      var lineWidth = Math.floor(startingLineWidth);
	      var position = {
	        "x": 0,
	        "y": verticalStartingPoint
	      };

	      var initial = true;

	      // Draw our jagged line.

	      var _loop = function _loop() {
	        var x = void 0,
	            y = void 0;

	        // On normal runs, find our vertical offset and linewidth
	        var newLineWidth = lineWidth - Utils.randomRange(lineWidth * 0.1, lineWidth * 0.4);
	        newLineWidth = Math.max(newLineWidth, 2);
	        y = position.y + Utils.randomRange(-(lineWidth * 0.1), lineWidth * 0.1);

	        // Make sure that we draw with the defaults, the first time.
	        if (initial === true) {
	          newLineWidth = lineWidth;
	          y = position.y;
	        }

	        var divisor = Utils.randomRange(5, 15);
	        var length = Math.floor(el.width / divisor);
	        x = position.x + length;

	        // Set our line path
	        context.beginPath();
	        context.moveTo(position.x, y);
	        context.lineTo(x, y);

	        // Complicated scientific quantum physics draw routine
	        var values = ['0.2', '0.4', '0.6', '0.8', '1'];

	        values.reverse().map(function (e, i) {
	          context.lineWidth = newLineWidth + i * 25;
	          context.strokeStyle = "rgba(51, 28, 74, " + e + ")";
	          context.stroke();
	        });

	        // Forward our new values.
	        position.x = x;
	        position.y = y;
	        lineWidth = newLineWidth;

	        initial = false;
	      };

	      while (position.x < horizontalEndPoint) {
	        _loop();
	      }
	    }
	  }, {
	    key: "loop",
	    value: function loop() {
	      var _this2 = this;

	      // First, we fade out by 30%
	      var context = this.state.context;

	      context.globalCompositeOperation = 'destination-out';
	      context.fillStyle = "rgba(0, 0, 0, 0.3)";
	      context.fillRect(0, 0, window.innerWidth, window.innerHeight);

	      context.globalCompositeOperation = 'source-over';

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.state.stars[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var star = _step.value;

	          star.step(context);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      setTimeout(function () {
	        window.requestAnimationFrame(_this2.loop.bind(_this2));
	      }, 1000 / this.fps);
	    }
	  }]);

	  return CanvasBackground;
	}();

	exports.default = CanvasBackground;

/***/ },
/* 2 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomRange = randomRange;
	exports.commafy = commafy;
	function randomRange(min, max) {
	  var decimals = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

	  var result = Math.random() * (max - min + 1) + min;

	  if (decimals === 0) {
	    result = Math.floor(result);
	  } else {
	    result = Math.floor(result * (10 * decimals)) / decimals;
	  }

	  return result;
	}

	function commafy(num) {
	  var parts = ('' + (num < 0 ? -num : num)).split("."),
	      s = parts[0],
	      L,
	      i = L = s.length,
	      o = '';

	  while (i--) {
	    o = (i === 0 ? '' : (L - i) % 3 ? '' : ',') + s.charAt(i) + o;
	  }

	  return (num < 0 ? '-' : '') + o + (parts[1] ? '.' + parts[1] : '');
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Particle = __webpack_require__(4);

	var _Particle2 = _interopRequireDefault(_Particle);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function spawnParticles(container, n) {
	  var className = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'particle';

	  var particles = [];

	  for (var i = 0; i < n; i++) {
	    var el = document.createElement('div');
	    el.className = className + ' ' + className + '-' + i + ' hidden';
	    container.appendChild(el);

	    particles[i] = new _Particle2.default(el, i, className);
	  }

	  return particles;
	}

	var ProgressBar = function () {
	  function ProgressBar() {
	    _classCallCheck(this, ProgressBar);

	    this.fps = 60;

	    var elements = {};
	    elements.bar = document.getElementsByClassName("bar")[0];
	    elements.fill = document.getElementsByClassName("fill")[0];
	    elements.particleContainer = document.getElementsByClassName("particle-container")[0];
	    elements.particleXContainer = document.getElementsByClassName("particle-x-container")[0];

	    var particles = spawnParticles(elements.particleContainer, 10);
	    var xParticles = spawnParticles(elements.particleXContainer, 50, 'particle-x');

	    this.state = {
	      elements: elements,
	      particles: particles,
	      xParticles: xParticles,
	      'triggerFinalAnimation': false
	    };
	  }

	  _createClass(ProgressBar, [{
	    key: 'loop',
	    value: function loop() {
	      var _this = this;

	      window.currentTime = new Date();
	      window.xContainerWidth = this.state.elements.particleXContainer.offsetWidth;

	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.state.particles[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var particle = _step.value;

	          particle.step();
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      if (this.state.triggerFinalAnimation === true) {
	        this.state.xParticles = this.state.xParticles.filter(function (e) {
	          return e.state.dead === false;
	        });

	        var _iteratorNormalCompletion2 = true;
	        var _didIteratorError2 = false;
	        var _iteratorError2 = undefined;

	        try {
	          for (var _iterator2 = this.state.xParticles[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	            var xParticle = _step2.value;

	            xParticle.step();
	          }
	        } catch (err) {
	          _didIteratorError2 = true;
	          _iteratorError2 = err;
	        } finally {
	          try {
	            if (!_iteratorNormalCompletion2 && _iterator2.return) {
	              _iterator2.return();
	            }
	          } finally {
	            if (_didIteratorError2) {
	              throw _iteratorError2;
	            }
	          }
	        }
	      }

	      setTimeout(function () {
	        window.requestAnimationFrame(_this.loop.bind(_this));
	      }, 1000 / this.fps);
	    }
	  }, {
	    key: 'playGrowAnimation',
	    value: function playGrowAnimation() {
	      var _this2 = this;

	      this.state.elements.fill.className = this.state.elements.fill.className + " animate";

	      setTimeout(function () {
	        _this2.state.triggerFinalAnimation = true;
	      }, 2000);
	    }
	  }]);

	  return ProgressBar;
	}();

	exports.default = ProgressBar;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(2);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Particle = function () {
	  function Particle(el, number, type) {
	    _classCallCheck(this, Particle);

	    this.state = {
	      el: el,
	      number: number,
	      type: type,
	      'dead': false,
	      'initialized': false
	    };
	  }

	  _createClass(Particle, [{
	    key: 'die',
	    value: function die() {
	      this.state.el.style = "";
	    }
	  }, {
	    key: 'initialize',
	    value: function initialize() {
	      // On our first loop, initialize
	      if (this.state.initialized === false) {
	        var birth = new Date();
	        var expiration = new Date();
	        expiration.setMilliseconds(expiration.getMilliseconds() + Utils.randomRange(200, 3000));

	        this.state.birth = birth;
	        this.state.expiration = expiration;

	        if (this.state.type === 'particle-x') {
	          this.state.curve = [{
	            "x": Utils.randomRange(-window.xContainerWidth - 100, 100),
	            "y": Utils.randomRange(-150, 150)
	          }, {
	            "x": Utils.randomRange(-window.xContainerWidth - 100, 100),
	            "y": Utils.randomRange(-150, 150)
	          }, {
	            "x": Utils.randomRange(-window.xContainerWidth, 0),
	            "y": Utils.randomRange(-50, 50)
	          }];
	        } else {
	          this.state.curve = [{
	            "x": Utils.randomRange(50, 200),
	            "y": Utils.randomRange(-100, 250) // 0, 25 is up drift
	          }, {
	            "x": Utils.randomRange(-30, 400),
	            "y": Utils.randomRange(-25, 75)
	          }, {
	            "x": Utils.randomRange(0, 5),
	            "y": Utils.randomRange(0, 40)
	          }];
	        }

	        this.state.el.className = this.state.el.className.replace(" hidden", "");
	        this.state.initialized = true;
	      }
	    }
	  }, {
	    key: 'step',
	    value: function step() {
	      this.initialize();

	      var lifetime = this.state.expiration - this.state.birth;
	      var elapsed = this.state.expiration - window.currentTime;

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

	      var t = Math.floor(elapsed / lifetime * 100) / 100;
	      var p = this.state.curve;
	      var x = (1 - t) * (1 - t) * p[0].x + 2 * (1 - t) * t * p[1].x + t * t * p[2].x;
	      var y = (1 - t) * (1 - t) * p[0].y + 2 * (1 - t) * t * p[1].y + t * t * p[2].y;

	      // Set opacity
	      this.state.el.style.opacity = String(t);
	      // Set position
	      this.state.el.style.transform = 'translateX(' + x + 'px) translateY(' + y + 'px';
	    }
	  }]);

	  return Particle;
	}();

	exports.default = Particle;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _reqwest = __webpack_require__(6);

	var _reqwest2 = _interopRequireDefault(_reqwest);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TaskManager = function () {
	  function TaskManager(value) {
	    var _this = this;

	    _classCallCheck(this, TaskManager);

	    var elements = {};
	    elements.todo = document.getElementsByClassName('todo')[0];
	    elements.tasks = [];

	    this.state = {
	      "elements": elements,
	      "loaded": false,
	      "finished": false
	    };

	    this.promise = (0, _reqwest2.default)({
	      "url": "src/js/data.json",
	      "method": "get",
	      "success": function success(response) {
	        var data = JSON.parse(response.response);
	        _this.state.loaded = true;
	        _this.state.tasks = data.testguy.tasks;
	      }
	    });
	  }

	  _createClass(TaskManager, [{
	    key: "populateTodo",
	    value: function populateTodo() {
	      var _this2 = this;

	      this.promise.then(function (result) {
	        _this2.state.tasks.map(function (e, i) {
	          // Generate a DOM element for each task
	          var el = document.createElement('li');
	          el.className = "task-" + i;

	          // Create upper and lower halves for the CSS split effect
	          var upper = document.createElement('div');
	          var lower = document.createElement('div');
	          var shadow = document.createElement('div');

	          // Truncate name to 20 characters
	          var name = e.name;

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
	          _this2.state.elements.todo.appendChild(el);
	          _this2.state.elements.tasks.push(el);
	        });
	      });
	    }
	  }, {
	    key: "start",
	    value: function start() {
	      var _this3 = this;

	      this.populateTodo();

	      // Play the drop-in animations
	      var dropInAnim = new Promise(function (resolve, reject) {
	        var animationDelay = 200;

	        _this3.state.elements.tasks.map(function (task, i, a) {
	          var delay = i === 0 ? 0 : i * animationDelay + i * 200;

	          setTimeout(function () {
	            task.className = task.className + " drop-in";

	            // On our last element, resolve and continue to the 'task completed' animations.
	            if (i === a.length - 1) {
	              setTimeout(function () {
	                resolve(true);
	              }, delay);
	            }
	          }, delay);
	        });
	      });

	      // Play the 'task completed' animations
	      dropInAnim.then(function (result) {
	        var animationDelay = 200;

	        _this3.state.tasks.map(function (e, i, a) {
	          var delay = i === 0 ? 0 : i * animationDelay + i * 200;

	          if (e.complete === true) {
	            setTimeout(function () {
	              var task = _this3.state.elements.tasks[i];
	              task.className = task.className + " completed";
	            }, delay);
	          }

	          // On our last element, set 'finished' state.
	          if (i === a.length - 1) {
	            setTimeout(function () {
	              _this3.state.finished = true;
	            }, delay);
	          }
	        });
	      });

	      // Return a promise that monitors our animation state
	      var finished = new Promise(function (resolve, reject) {
	        var checkFinished = function checkFinished() {
	          var finished = _this3.state.finished === true;

	          if (finished) {
	            resolve(_this3.state.currentValue);
	          } else {
	            setTimeout(checkFinished, 200);
	          }
	        };

	        checkFinished();
	      });

	      return finished;
	    }
	  }]);

	  return TaskManager;
	}();

	exports.default = TaskManager;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_RESULT__;'use strict';

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	/*!
	  * Reqwest! A general purpose XHR connection manager
	  * license MIT (c) Dustin Diaz 2015
	  * https://github.com/ded/reqwest
	  */

	!function (name, context, definition) {
	  if (typeof module != 'undefined' && module.exports) module.exports = definition();else if (true) !(__WEBPACK_AMD_DEFINE_FACTORY__ = (definition), __WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ? (__WEBPACK_AMD_DEFINE_FACTORY__.call(exports, __webpack_require__, exports, module)) : __WEBPACK_AMD_DEFINE_FACTORY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));else context[name] = definition();
	}('reqwest', undefined, function () {

	  var context = this;

	  if ('window' in context) {
	    var doc = document,
	        byTag = 'getElementsByTagName',
	        head = doc[byTag]('head')[0];
	  } else {
	    var XHR2;
	    try {
	      XHR2 = __webpack_require__(7);
	    } catch (ex) {
	      throw new Error('Peer dependency `xhr2` required! Please npm install xhr2');
	    }
	  }

	  var httpsRe = /^http/,
	      protocolRe = /(^\w+):\/\//,
	      twoHundo = /^(20\d|1223)$/ //http://stackoverflow.com/questions/10046972/msie-returns-status-code-of-1223-for-ajax-request
	  ,
	      readyState = 'readyState',
	      contentType = 'Content-Type',
	      requestedWith = 'X-Requested-With',
	      uniqid = 0,
	      callbackPrefix = 'reqwest_' + +new Date(),
	      lastValue // data stored by the most recent JSONP callback
	  ,
	      xmlHttpRequest = 'XMLHttpRequest',
	      xDomainRequest = 'XDomainRequest',
	      noop = function noop() {},
	      isArray = typeof Array.isArray == 'function' ? Array.isArray : function (a) {
	    return a instanceof Array;
	  },
	      defaultHeaders = {
	    'contentType': 'application/x-www-form-urlencoded',
	    'requestedWith': xmlHttpRequest,
	    'accept': {
	      '*': 'text/javascript, text/html, application/xml, text/xml, */*',
	      'xml': 'application/xml, text/xml',
	      'html': 'text/html',
	      'text': 'text/plain',
	      'json': 'application/json, text/javascript',
	      'js': 'application/javascript, text/javascript'
	    }
	  },
	      xhr = function xhr(o) {
	    // is it x-domain
	    if (o['crossOrigin'] === true) {
	      var xhr = context[xmlHttpRequest] ? new XMLHttpRequest() : null;
	      if (xhr && 'withCredentials' in xhr) {
	        return xhr;
	      } else if (context[xDomainRequest]) {
	        return new XDomainRequest();
	      } else {
	        throw new Error('Browser does not support cross-origin requests');
	      }
	    } else if (context[xmlHttpRequest]) {
	      return new XMLHttpRequest();
	    } else if (XHR2) {
	      return new XHR2();
	    } else {
	      return new ActiveXObject('Microsoft.XMLHTTP');
	    }
	  },
	      globalSetupOptions = {
	    dataFilter: function dataFilter(data) {
	      return data;
	    }
	  };

	  function succeed(r) {
	    var protocol = protocolRe.exec(r.url);
	    protocol = protocol && protocol[1] || context.location.protocol;
	    return httpsRe.test(protocol) ? twoHundo.test(r.request.status) : !!r.request.response;
	  }

	  function handleReadyState(r, success, error) {
	    return function () {
	      // use _aborted to mitigate against IE err c00c023f
	      // (can't read props on aborted request objects)
	      if (r._aborted) return error(r.request);
	      if (r._timedOut) return error(r.request, 'Request is aborted: timeout');
	      if (r.request && r.request[readyState] == 4) {
	        r.request.onreadystatechange = noop;
	        if (succeed(r)) success(r.request);else error(r.request);
	      }
	    };
	  }

	  function setHeaders(http, o) {
	    var headers = o['headers'] || {},
	        h;

	    headers['Accept'] = headers['Accept'] || defaultHeaders['accept'][o['type']] || defaultHeaders['accept']['*'];

	    var isAFormData = typeof FormData !== 'undefined' && o['data'] instanceof FormData;
	    // breaks cross-origin requests with legacy browsers
	    if (!o['crossOrigin'] && !headers[requestedWith]) headers[requestedWith] = defaultHeaders['requestedWith'];
	    if (!headers[contentType] && !isAFormData) headers[contentType] = o['contentType'] || defaultHeaders['contentType'];
	    for (h in headers) {
	      headers.hasOwnProperty(h) && 'setRequestHeader' in http && http.setRequestHeader(h, headers[h]);
	    }
	  }

	  function setCredentials(http, o) {
	    if (typeof o['withCredentials'] !== 'undefined' && typeof http.withCredentials !== 'undefined') {
	      http.withCredentials = !!o['withCredentials'];
	    }
	  }

	  function generalCallback(data) {
	    lastValue = data;
	  }

	  function urlappend(url, s) {
	    return url + (/\?/.test(url) ? '&' : '?') + s;
	  }

	  function handleJsonp(o, fn, err, url) {
	    var reqId = uniqid++,
	        cbkey = o['jsonpCallback'] || 'callback' // the 'callback' key
	    ,
	        cbval = o['jsonpCallbackName'] || reqwest.getcallbackPrefix(reqId),
	        cbreg = new RegExp('((^|\\?|&)' + cbkey + ')=([^&]+)'),
	        match = url.match(cbreg),
	        script = doc.createElement('script'),
	        loaded = 0,
	        isIE10 = navigator.userAgent.indexOf('MSIE 10.0') !== -1;

	    if (match) {
	      if (match[3] === '?') {
	        url = url.replace(cbreg, '$1=' + cbval); // wildcard callback func name
	      } else {
	        cbval = match[3]; // provided callback func name
	      }
	    } else {
	      url = urlappend(url, cbkey + '=' + cbval); // no callback details, add 'em
	    }

	    context[cbval] = generalCallback;

	    script.type = 'text/javascript';
	    script.src = url;
	    script.async = true;
	    if (typeof script.onreadystatechange !== 'undefined' && !isIE10) {
	      // need this for IE due to out-of-order onreadystatechange(), binding script
	      // execution to an event listener gives us control over when the script
	      // is executed. See http://jaubourg.net/2010/07/loading-script-as-onclick-handler-of.html
	      script.htmlFor = script.id = '_reqwest_' + reqId;
	    }

	    script.onload = script.onreadystatechange = function () {
	      if (script[readyState] && script[readyState] !== 'complete' && script[readyState] !== 'loaded' || loaded) {
	        return false;
	      }
	      script.onload = script.onreadystatechange = null;
	      script.onclick && script.onclick();
	      // Call the user callback with the last value stored and clean up values and scripts.
	      fn(lastValue);
	      lastValue = undefined;
	      head.removeChild(script);
	      loaded = 1;
	    };

	    // Add the script to the DOM head
	    head.appendChild(script);

	    // Enable JSONP timeout
	    return {
	      abort: function abort() {
	        script.onload = script.onreadystatechange = null;
	        err({}, 'Request is aborted: timeout', {});
	        lastValue = undefined;
	        head.removeChild(script);
	        loaded = 1;
	      }
	    };
	  }

	  function getRequest(fn, err) {
	    var o = this.o,
	        method = (o['method'] || 'GET').toUpperCase(),
	        url = typeof o === 'string' ? o : o['url']
	    // convert non-string objects to query-string form unless o['processData'] is false
	    ,
	        data = o['processData'] !== false && o['data'] && typeof o['data'] !== 'string' ? reqwest.toQueryString(o['data']) : o['data'] || null,
	        http,
	        sendWait = false;

	    // if we're working on a GET request and we have data then we should append
	    // query string to end of URL and not post data
	    if ((o['type'] == 'jsonp' || method == 'GET') && data) {
	      url = urlappend(url, data);
	      data = null;
	    }

	    if (o['type'] == 'jsonp') return handleJsonp(o, fn, err, url);

	    // get the xhr from the factory if passed
	    // if the factory returns null, fall-back to ours
	    http = o.xhr && o.xhr(o) || xhr(o);

	    http.open(method, url, o['async'] === false ? false : true);
	    setHeaders(http, o);
	    setCredentials(http, o);
	    if (context[xDomainRequest] && http instanceof context[xDomainRequest]) {
	      http.onload = fn;
	      http.onerror = err;
	      // NOTE: see
	      // http://social.msdn.microsoft.com/Forums/en-US/iewebdevelopment/thread/30ef3add-767c-4436-b8a9-f1ca19b4812e
	      http.onprogress = function () {};
	      sendWait = true;
	    } else {
	      http.onreadystatechange = handleReadyState(this, fn, err);
	    }
	    o['before'] && o['before'](http);
	    if (sendWait) {
	      setTimeout(function () {
	        http.send(data);
	      }, 200);
	    } else {
	      http.send(data);
	    }
	    return http;
	  }

	  function Reqwest(o, fn) {
	    this.o = o;
	    this.fn = fn;

	    init.apply(this, arguments);
	  }

	  function setType(header) {
	    // json, javascript, text/plain, text/html, xml
	    if (header === null) return undefined; //In case of no content-type.
	    if (header.match('json')) return 'json';
	    if (header.match('javascript')) return 'js';
	    if (header.match('text')) return 'html';
	    if (header.match('xml')) return 'xml';
	  }

	  function init(o, fn) {

	    this.url = typeof o == 'string' ? o : o['url'];
	    this.timeout = null;

	    // whether request has been fulfilled for purpose
	    // of tracking the Promises
	    this._fulfilled = false;
	    // success handlers
	    this._successHandler = function () {};
	    this._fulfillmentHandlers = [];
	    // error handlers
	    this._errorHandlers = [];
	    // complete (both success and fail) handlers
	    this._completeHandlers = [];
	    this._erred = false;
	    this._responseArgs = {};

	    var self = this;

	    fn = fn || function () {};

	    if (o['timeout']) {
	      this.timeout = setTimeout(function () {
	        timedOut();
	      }, o['timeout']);
	    }

	    if (o['success']) {
	      this._successHandler = function () {
	        o['success'].apply(o, arguments);
	      };
	    }

	    if (o['error']) {
	      this._errorHandlers.push(function () {
	        o['error'].apply(o, arguments);
	      });
	    }

	    if (o['complete']) {
	      this._completeHandlers.push(function () {
	        o['complete'].apply(o, arguments);
	      });
	    }

	    function complete(resp) {
	      o['timeout'] && clearTimeout(self.timeout);
	      self.timeout = null;
	      while (self._completeHandlers.length > 0) {
	        self._completeHandlers.shift()(resp);
	      }
	    }

	    function success(resp) {
	      var type = o['type'] || resp && setType(resp.getResponseHeader('Content-Type')); // resp can be undefined in IE
	      resp = type !== 'jsonp' ? self.request : resp;
	      // use global data filter on response text
	      var filteredResponse = globalSetupOptions.dataFilter(resp.responseText, type),
	          r = filteredResponse;
	      try {
	        resp.responseText = r;
	      } catch (e) {
	        // can't assign this in IE<=8, just ignore
	      }
	      if (r) {
	        switch (type) {
	          case 'json':
	            try {
	              resp = context.JSON ? context.JSON.parse(r) : eval('(' + r + ')');
	            } catch (err) {
	              return error(resp, 'Could not parse JSON in response', err);
	            }
	            break;
	          case 'js':
	            resp = eval(r);
	            break;
	          case 'html':
	            resp = r;
	            break;
	          case 'xml':
	            resp = resp.responseXML && resp.responseXML.parseError // IE trololo
	            && resp.responseXML.parseError.errorCode && resp.responseXML.parseError.reason ? null : resp.responseXML;
	            break;
	        }
	      }

	      self._responseArgs.resp = resp;
	      self._fulfilled = true;
	      fn(resp);
	      self._successHandler(resp);
	      while (self._fulfillmentHandlers.length > 0) {
	        resp = self._fulfillmentHandlers.shift()(resp);
	      }

	      complete(resp);
	    }

	    function timedOut() {
	      self._timedOut = true;
	      self.request.abort();
	    }

	    function error(resp, msg, t) {
	      resp = self.request;
	      self._responseArgs.resp = resp;
	      self._responseArgs.msg = msg;
	      self._responseArgs.t = t;
	      self._erred = true;
	      while (self._errorHandlers.length > 0) {
	        self._errorHandlers.shift()(resp, msg, t);
	      }
	      complete(resp);
	    }

	    this.request = getRequest.call(this, success, error);
	  }

	  Reqwest.prototype = {
	    abort: function abort() {
	      this._aborted = true;
	      this.request.abort();
	    },

	    retry: function retry() {
	      init.call(this, this.o, this.fn);
	    }

	    /**
	     * Small deviation from the Promises A CommonJs specification
	     * http://wiki.commonjs.org/wiki/Promises/A
	     */

	    /**
	     * `then` will execute upon successful requests
	     */
	    , then: function then(success, fail) {
	      success = success || function () {};
	      fail = fail || function () {};
	      if (this._fulfilled) {
	        this._responseArgs.resp = success(this._responseArgs.resp);
	      } else if (this._erred) {
	        fail(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
	      } else {
	        this._fulfillmentHandlers.push(success);
	        this._errorHandlers.push(fail);
	      }
	      return this;
	    }

	    /**
	     * `always` will execute whether the request succeeds or fails
	     */
	    , always: function always(fn) {
	      if (this._fulfilled || this._erred) {
	        fn(this._responseArgs.resp);
	      } else {
	        this._completeHandlers.push(fn);
	      }
	      return this;
	    }

	    /**
	     * `fail` will execute when the request fails
	     */
	    , fail: function fail(fn) {
	      if (this._erred) {
	        fn(this._responseArgs.resp, this._responseArgs.msg, this._responseArgs.t);
	      } else {
	        this._errorHandlers.push(fn);
	      }
	      return this;
	    },
	    'catch': function _catch(fn) {
	      return this.fail(fn);
	    }
	  };

	  function reqwest(o, fn) {
	    return new Reqwest(o, fn);
	  }

	  // normalize newline variants according to spec -> CRLF
	  function normalize(s) {
	    return s ? s.replace(/\r?\n/g, '\r\n') : '';
	  }

	  function serial(el, cb) {
	    var n = el.name,
	        t = el.tagName.toLowerCase(),
	        optCb = function optCb(o) {
	      // IE gives value="" even where there is no value attribute
	      // 'specified' ref: http://www.w3.org/TR/DOM-Level-3-Core/core.html#ID-862529273
	      if (o && !o['disabled']) cb(n, normalize(o['attributes']['value'] && o['attributes']['value']['specified'] ? o['value'] : o['text']));
	    },
	        ch,
	        ra,
	        val,
	        i;

	    // don't serialize elements that are disabled or without a name
	    if (el.disabled || !n) return;

	    switch (t) {
	      case 'input':
	        if (!/reset|button|image|file/i.test(el.type)) {
	          ch = /checkbox/i.test(el.type);
	          ra = /radio/i.test(el.type);
	          val = el.value
	          // WebKit gives us "" instead of "on" if a checkbox has no value, so correct it here
	          ;(!(ch || ra) || el.checked) && cb(n, normalize(ch && val === '' ? 'on' : val));
	        }
	        break;
	      case 'textarea':
	        cb(n, normalize(el.value));
	        break;
	      case 'select':
	        if (el.type.toLowerCase() === 'select-one') {
	          optCb(el.selectedIndex >= 0 ? el.options[el.selectedIndex] : null);
	        } else {
	          for (i = 0; el.length && i < el.length; i++) {
	            el.options[i].selected && optCb(el.options[i]);
	          }
	        }
	        break;
	    }
	  }

	  // collect up all form elements found from the passed argument elements all
	  // the way down to child elements; pass a '<form>' or form fields.
	  // called with 'this'=callback to use for serial() on each element
	  function eachFormElement() {
	    var cb = this,
	        e,
	        i,
	        serializeSubtags = function serializeSubtags(e, tags) {
	      var i, j, fa;
	      for (i = 0; i < tags.length; i++) {
	        fa = e[byTag](tags[i]);
	        for (j = 0; j < fa.length; j++) {
	          serial(fa[j], cb);
	        }
	      }
	    };

	    for (i = 0; i < arguments.length; i++) {
	      e = arguments[i];
	      if (/input|select|textarea/i.test(e.tagName)) serial(e, cb);
	      serializeSubtags(e, ['input', 'select', 'textarea']);
	    }
	  }

	  // standard query string style serialization
	  function serializeQueryString() {
	    return reqwest.toQueryString(reqwest.serializeArray.apply(null, arguments));
	  }

	  // { 'name': 'value', ... } style serialization
	  function serializeHash() {
	    var hash = {};
	    eachFormElement.apply(function (name, value) {
	      if (name in hash) {
	        hash[name] && !isArray(hash[name]) && (hash[name] = [hash[name]]);
	        hash[name].push(value);
	      } else hash[name] = value;
	    }, arguments);
	    return hash;
	  }

	  // [ { name: 'name', value: 'value' }, ... ] style serialization
	  reqwest.serializeArray = function () {
	    var arr = [];
	    eachFormElement.apply(function (name, value) {
	      arr.push({ name: name, value: value });
	    }, arguments);
	    return arr;
	  };

	  reqwest.serialize = function () {
	    if (arguments.length === 0) return '';
	    var opt,
	        fn,
	        args = Array.prototype.slice.call(arguments, 0);

	    opt = args.pop();
	    opt && opt.nodeType && args.push(opt) && (opt = null);
	    opt && (opt = opt.type);

	    if (opt == 'map') fn = serializeHash;else if (opt == 'array') fn = reqwest.serializeArray;else fn = serializeQueryString;

	    return fn.apply(null, args);
	  };

	  reqwest.toQueryString = function (o, trad) {
	    var prefix,
	        i,
	        traditional = trad || false,
	        s = [],
	        enc = encodeURIComponent,
	        add = function add(key, value) {
	      // If value is a function, invoke it and return its value
	      value = 'function' === typeof value ? value() : value == null ? '' : value;
	      s[s.length] = enc(key) + '=' + enc(value);
	    };
	    // If an array was passed in, assume that it is an array of form elements.
	    if (isArray(o)) {
	      for (i = 0; o && i < o.length; i++) {
	        add(o[i]['name'], o[i]['value']);
	      }
	    } else {
	      // If traditional, encode the "old" way (the way 1.3.2 or older
	      // did it), otherwise encode params recursively.
	      for (prefix in o) {
	        if (o.hasOwnProperty(prefix)) buildParams(prefix, o[prefix], traditional, add);
	      }
	    }

	    // spaces should be + according to spec
	    return s.join('&').replace(/%20/g, '+');
	  };

	  function buildParams(prefix, obj, traditional, add) {
	    var name,
	        i,
	        v,
	        rbracket = /\[\]$/;

	    if (isArray(obj)) {
	      // Serialize array item.
	      for (i = 0; obj && i < obj.length; i++) {
	        v = obj[i];
	        if (traditional || rbracket.test(prefix)) {
	          // Treat each array item as a scalar.
	          add(prefix, v);
	        } else {
	          buildParams(prefix + '[' + ((typeof v === 'undefined' ? 'undefined' : _typeof(v)) === 'object' ? i : '') + ']', v, traditional, add);
	        }
	      }
	    } else if (obj && obj.toString() === '[object Object]') {
	      // Serialize object item.
	      for (name in obj) {
	        buildParams(prefix + '[' + name + ']', obj[name], traditional, add);
	      }
	    } else {
	      // Serialize scalar item.
	      add(prefix, obj);
	    }
	  }

	  reqwest.getcallbackPrefix = function () {
	    return callbackPrefix;
	  };

	  // jQuery and Zepto compatibility, differences can be remapped here so you can call
	  // .ajax.compat(options, callback)
	  reqwest.compat = function (o, fn) {
	    if (o) {
	      o['type'] && (o['method'] = o['type']) && delete o['type'];
	      o['dataType'] && (o['type'] = o['dataType']);
	      o['jsonpCallback'] && (o['jsonpCallbackName'] = o['jsonpCallback']) && delete o['jsonpCallback'];
	      o['jsonp'] && (o['jsonpCallback'] = o['jsonp']);
	    }
	    return new Reqwest(o, fn);
	  };

	  reqwest.ajaxSetup = function (options) {
	    options = options || {};
	    for (var k in options) {
	      globalSetupOptions[k] = options[k];
	    }
	  };

	  return reqwest;
	});

/***/ },
/* 7 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Utils = __webpack_require__(2);

	var Utils = _interopRequireWildcard(_Utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Counter = function () {
	  function Counter(value) {
	    _classCallCheck(this, Counter);

	    var elements = {};
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

	  _createClass(Counter, [{
	    key: 'rapidifySpeedMostFastlyBuckaroo',
	    value: function rapidifySpeedMostFastlyBuckaroo() {
	      var _this = this;

	      if (this.state.finished === false && this.state.speed > 2) {
	        setTimeout(function () {
	          _this.state.speed = Math.max(2, _this.state.speed / 2);
	          _this.rapidifySpeedMostFastlyBuckaroo();
	        }, 500);
	      }
	    }
	  }, {
	    key: 'start',
	    value: function start() {
	      var _this2 = this;

	      this.loop();
	      this.rapidifySpeedMostFastlyBuckaroo();

	      var promise = new Promise(function (resolve, reject) {
	        var checkFinished = function checkFinished() {
	          var finished = _this2.state.finished === true;

	          if (finished) {
	            resolve(_this2.state.currentValue);
	          } else {
	            setTimeout(checkFinished, 200);
	          }
	        };

	        checkFinished();
	      });

	      return promise;
	    }
	  }, {
	    key: 'loop',
	    value: function loop() {
	      var _this3 = this;

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
	        setTimeout(function () {
	          _this3.loop();
	        }, this.state.speed);
	      }
	    }
	  }, {
	    key: 'playFinalAnimation',
	    value: function playFinalAnimation() {
	      this.state.elements.counter.className = this.state.elements.counter.className.replace(" increment", "");
	      this.state.elements.counter.className += " finished";
	    }
	  }, {
	    key: 'playIncrementalAnimation',
	    value: function playIncrementalAnimation() {
	      var _this4 = this;

	      this.state.elements.counter.className = this.state.elements.counter.className.replace(" increment", "");
	      setTimeout(function () {
	        if (_this4.state.finished === false) {
	          _this4.state.elements.counter.className += " increment";
	        }
	      }, 15);
	    }
	  }]);

	  return Counter;
	}();

	exports.default = Counter;

/***/ }
/******/ ]);