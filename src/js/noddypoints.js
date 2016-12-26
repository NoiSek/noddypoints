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

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _utils = __webpack_require__(1);

	var Utils = _interopRequireWildcard(_utils);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function getModifier() {
	  return Utils.randomRange(0.8, 1.6, 2);
	}

	function spawnParticles(container, n) {
	  var particles = [];

	  for (var i = 0; i < n; i++) {
	    var el = document.createElement('div');
	    el.className = "particle particle-" + i;
	    container.appendChild(el);

	    particles[i] = new Particle(el, i);
	  }

	  return particles;
	}

	var Particle = function () {
	  function Particle(el, number) {
	    _classCallCheck(this, Particle);

	    this.state = {
	      el: el,
	      number: number
	    };

	    // Easier to set it up this way.
	    this.die();
	  }

	  _createClass(Particle, [{
	    key: "die",
	    value: function die() {
	      var birth = new Date();
	      var now = new Date();
	      now.setMilliseconds(now.getMilliseconds() + Utils.randomRange(200, 3000));

	      this.state.modifier = getModifier();
	      this.state.birth = birth;
	      this.state.expiration = now;
	      this.state.el.style = "";
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
	  }, {
	    key: "step",
	    value: function step() {
	      var lifetime = this.state.expiration - this.state.birth;
	      var elapsed = this.state.expiration - window.currentTime;

	      if (elapsed <= 0) {
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
	      this.state.el.style.transform = "translateX(" + x + "px) translateY(" + y + "px";
	    }
	  }]);

	  return Particle;
	}();

	var Main = function () {
	  function Main() {
	    _classCallCheck(this, Main);

	    this.fps = 60;

	    var elements = {};
	    elements.bar = document.getElementsByClassName("bar")[0];
	    elements.fill = document.getElementsByClassName("fill")[0];
	    elements.particleContainer = document.getElementsByClassName("particle-container")[0];

	    var particles = spawnParticles(elements.particleContainer, 10);

	    this.state = {
	      elements: elements,
	      particles: particles
	    };
	  }

	  _createClass(Main, [{
	    key: "loop",
	    value: function loop() {
	      var _this = this;

	      window.currentTime = new Date();

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

	      setTimeout(function () {
	        window.requestAnimationFrame(_this.loop.bind(_this));
	      }, 1000 / this.fps);
	    }
	  }]);

	  return Main;
	}();

	exports.default = Main;


	var app = new Main();
	app.loop();

/***/ },
/* 1 */
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.randomRange = randomRange;
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

/***/ }
/******/ ]);