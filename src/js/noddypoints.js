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

	var _ProgressBar = __webpack_require__(1);

	var _ProgressBar2 = _interopRequireDefault(_ProgressBar);

	var _TaskManager = __webpack_require__(5);

	var _TaskManager2 = _interopRequireDefault(_TaskManager);

	var _Counter = __webpack_require__(4);

	var _Counter2 = _interopRequireDefault(_Counter);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var bar = new _ProgressBar2.default();
	var counter = new _Counter2.default(1200);
	var taskManager = new _TaskManager2.default();

	setTimeout(function () {
	  taskManager.start().then(function (_) {
	    counter.start().then(function (_) {
	      bar.playGrowAnimation();
	    });
	  });
	}, 2000);

	bar.loop();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _Particle = __webpack_require__(3);

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
	    var xParticles = spawnParticles(elements.particleXContainer, 100, 'particle-x');

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
	        var now = new Date();
	        now.setMilliseconds(now.getMilliseconds() + Utils.randomRange(200, 3000));

	        this.state.birth = birth;
	        this.state.expiration = now;

	        if (this.state.type === 'particle-x') {
	          this.state.curve = [{
	            "x": Utils.randomRange(-window.xContainerWidth, 0),
	            "y": Utils.randomRange(-350, 350)
	          }, {
	            "x": Utils.randomRange(-window.xContainerWidth, 0),
	            "y": Utils.randomRange(-350, 350)
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
	            "y": Utils.randomRange(0, 95)
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
	      this.state.elements.counter.className += " finished";
	    }
	  }, {
	    key: 'playIncrementalAnimation',
	    value: function playIncrementalAnimation() {
	      var _this4 = this;

	      this.state.elements.counter.className = this.state.elements.counter.className.replace(" increment", "");
	      setTimeout(function () {
	        _this4.state.elements.counter.className += " increment";
	      }, 10);
	    }
	  }]);

	  return Counter;
	}();

	exports.default = Counter;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var TaskManager = function () {
	  function TaskManager(value) {
	    _classCallCheck(this, TaskManager);

	    var elements = {};
	    elements.todo = document.getElementsByClassName('todo')[0];
	    elements.tasks = Array.from(document.getElementsByClassName('test'));

	    this.state = {
	      "elements": elements,
	      "finished": false
	    };
	  }

	  _createClass(TaskManager, [{
	    key: 'start',
	    value: function start() {
	      var _this = this;

	      var promise = new Promise(function (resolve, reject) {
	        var animationDelay = 200;

	        _this.state.elements.tasks.map(function (task, i, a) {
	          var delay = i === 0 ? 0 : i * animationDelay + i * 1000;

	          setTimeout(function () {
	            task.className = task.className + " drop-in";

	            if (i === a.length - 1) {
	              setTimeout(function () {
	                resolve(true);
	              }, delay);
	            }
	          }, delay);
	        });
	      });

	      return promise;
	    }
	  }]);

	  return TaskManager;
	}();

	exports.default = TaskManager;

/***/ }
/******/ ]);