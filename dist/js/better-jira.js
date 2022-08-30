/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Jira = function () {
  function Jira() {
    _classCallCheck(this, Jira);

    this._isPresent = null;
  }

  _createClass(Jira, [{
    key: 'isPresent',
    value: function isPresent() {
      if (this._isPresent !== null) {
        return this._isPresent;
      }

      try {
        var jira = document.querySelector('meta[name="application-name"]');
        return this._isPresent = jira.content === 'JIRA';
      } catch (e) {
        return this._isPresent = false;
      }
    }
  }, {
    key: 'isNotPresent',
    value: function isNotPresent() {
      return !this.isPresent();
    }
  }, {
    key: 'hasLoadedSwimlanes',
    value: function hasLoadedSwimlanes() {
      return !!document.querySelector('.ghx-swimlane, #ghx-mapping, #jira-board > div > div');
    }
  }, {
    key: 'hasNotLoadedSwimlanes',
    value: function hasNotLoadedSwimlanes() {
      return !this.hasLoadedSwimlanes();
    }
  }, {
    key: 'columnsContainer',
    value: function columnsContainer() {
      return document.querySelector('.ghx-swimlane > .ghx-columns, #ghx-mapping, .aui-page-panel-content > #jira-board');
    }
  }, {
    key: 'columns',
    value: function columns() {
      return this.columnsContainer().querySelectorAll('.ghx-column, .ghx-column-wrapper, [class*="hook__column"]');
    }
  }, {
    key: 'content',
    value: function content() {
      return document.getElementById('content');
    }
  }]);

  return Jira;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Jira());

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(2);
__webpack_require__(7);
__webpack_require__(8);
module.exports = __webpack_require__(9);


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__components_DetailResizer__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_BetterJira__ = __webpack_require__(4);



var betterJira = __WEBPACK_IMPORTED_MODULE_1__components_BetterJira__["a" /* default */].initialize();
__WEBPACK_IMPORTED_MODULE_0__components_DetailResizer__["a" /* default */].run();

document.addEventListener('better-jira:updated', function (event) {
  console.log('🔧: ', event.detail);
  betterJira.update(event);
});

/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Jira__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var DetailResizer = function () {
  function DetailResizer() {
    _classCallCheck(this, DetailResizer);

    this.id = 'ghx-detail-view';
    this.Storage = chrome.storage.sync;
    this.listening = false;
    this.running = true;
    this.manageMouseListener = this.manageMouse.bind(this);
  }

  _createClass(DetailResizer, [{
    key: 'run',
    value: function run() {
      var _this = this;

      if (__WEBPACK_IMPORTED_MODULE_0__Jira__["a" /* default */].isNotPresent()) {
        this.running = false;
        return;
      }

      var detailView = document.getElementById(this.id);
      if (!detailView) {
        this.running = false;
        return;
      }
      detailView.addEventListener('mouseenter', function () {
        if (detailView.querySelector('.better-resize') !== null) {
          return;
        }

        var resizer = document.createElement('div');
        resizer.classList.add('better-resize');
        detailView.appendChild(resizer);

        detailView.querySelector('.better-resize').addEventListener('mousedown', function (event) {
          event.preventDefault();
          if (event.button === 2) {
            return;
          }

          document.addEventListener('mousemove', _this.manageMouseListener);
          _this.listening = true;
        });

        document.addEventListener('mouseup', function (event) {
          if (!_this.listening) {
            return;
          }

          document.removeEventListener('mousemove', _this.manageMouseListener);
          _this.listening = false;

          _this.saveDetailViewWidth();
        });
      });

      // detailView.addEventListener('mouseleave', () => {
      //   console.log('You are now exiting');
      //   detailView.querySelector('.better-resize').remove();
      // });
    }
  }, {
    key: 'manageMouse',
    value: function manageMouse(event) {
      if (!this.running) {
        return;
      }

      var width = window.innerWidth - event.pageX + 2;

      document.documentElement.style.setProperty('--detail-view-width', width + 'px');
    }
  }, {
    key: 'saveDetailViewWidth',
    value: function saveDetailViewWidth() {
      if (!this.running) {
        return;
      }

      console.log('🔧: Detail Width', document.documentElement.style.getPropertyValue('--detail-view-width'));
      this.Storage.set({
        detailViewWidth: document.documentElement.style.getPropertyValue('--detail-view-width')
      });
    }
  }]);

  return DetailResizer;
}();

/* harmony default export */ __webpack_exports__["a"] = (new DetailResizer());

/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Standup__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Jira__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__OpenGithubInNewTab__ = __webpack_require__(6);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }





var BetterJira = function () {
  _createClass(BetterJira, null, [{
    key: 'initialize',
    value: function initialize() {
      return new this();
    }
  }]);

  function BetterJira() {
    var _this = this;

    _classCallCheck(this, BetterJira);

    this.data = {};
    this.Storage = chrome.storage.sync;
    this.running = true;
    this.instructionsCssClass = 'BetterJira-instructions';

    if (__WEBPACK_IMPORTED_MODULE_1__Jira__["a" /* default */].isNotPresent()) {
      this.running = false;
      return;
    }

    this._initialColumnResize();
    this.Storage.get('standup', function (storage) {
      _this._initiateStandup(storage.standup);
    });
    this._openGithubLinksInNewTabs();
  }

  _createClass(BetterJira, [{
    key: 'update',
    value: function update(event) {
      this._updateColumnWidths(event.detail);
      this._initiateStandup(event.detail.standup);
    }
  }, {
    key: '_updateColumnWidths',
    value: function _updateColumnWidths(detail) {
      if (!this.running) {
        return;
      }

      if (!detail.enabled) {
        document.body.classList.remove('better-jira');
        document.getElementById('ghx-pool').style.width = 'auto';
        return;
      }
      document.body.classList.add('better-jira');
      this._getPreferredWidth(detail);
    }
  }, {
    key: '_ifEnabled',
    value: function _ifEnabled(enabledCallback) {
      var disabledCallback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function () {};

      if (!this.running) {
        return;
      }

      this.Storage.get('enabled', function (storage) {
        if (!storage.enabled) {
          disabledCallback();
          return;
        }

        enabledCallback();
      });
    }
  }, {
    key: '_initialColumnResize',
    value: function _initialColumnResize() {
      var _this2 = this;

      if (!this.running) {
        return;
      }

      setTimeout(function () {
        if (__WEBPACK_IMPORTED_MODULE_1__Jira__["a" /* default */].hasNotLoadedSwimlanes()) {
          // console.log('🔧: Swimlanes not present, waiting 100ms.');
          return _this2._initialColumnResize();
        }
        // console.log('🔧: Swimlanes are present, resizing now.');

        var enabled = function enabled() {
          document.body.classList.add('better-jira');
          _this2.Storage.get('columnWidth', _this2._getPreferredWidth.bind(_this2));
          _this2._protectAgainstReactBoardReloading();
        };

        //-- Disallow setting columns if the plugin is not enabled
        var disabled = function disabled() {
          document.body.classList.remove('better-jira');
          document.getElementById('ghx-pool').style.width = 'auto';
        };
        _this2._ifEnabled(enabled, disabled);
      }, 100);
    }
  }, {
    key: '_getPreferredWidth',
    value: function _getPreferredWidth(storage) {
      if (!this.running) {
        return;
      }

      this.data.columnWidth = storage.columnWidth;

      if (isNaN(this.data.columnWidth)) {
        this.data.columnWidth = 200;
      }

      this._setPreferredWidth();
    }
  }, {
    key: '_setPreferredWidth',
    value: function _setPreferredWidth() {
      if (!this.running) {
        return;
      }

      var preferredWidth = void 0,
          columnCount = void 0,
          padding = void 0,
          width = void 0;

      preferredWidth = this.data.columnWidth;

      columnCount = __WEBPACK_IMPORTED_MODULE_1__Jira__["a" /* default */].columns().length;

      padding = columnCount * 12;
      width = columnCount * preferredWidth + padding;

      if (width < 10) {
        return;
      }

      //-- Handle Smaller Boards
      if (width < window.innerWidth) {
        width = 'auto';
      }

      try {
        var items = { poolWidth: width };
        this.Storage.set(items);

        this._setPoolWidth(width);
      } catch (e) {
        console.error(e);
      }
    }
  }, {
    key: '_setPoolWidth',
    value: function _setPoolWidth(width) {
      if (width === 'auto') {
        document.getElementById('ghx-pool').style.width = 'auto';
      } else {
        document.getElementById('ghx-pool').style.width = 'var(--viewport-width)';
        document.documentElement.style.setProperty('--viewport-width', width + 'px');
      }
    }
  }, {
    key: '_setDetailViewWidth',
    value: function _setDetailViewWidth(width) {
      document.documentElement.style.setProperty('--detail-view-width', width);
    }
  }, {
    key: '_initiateStandup',
    value: function _initiateStandup(config) {
      __WEBPACK_IMPORTED_MODULE_0__Standup__["a" /* default */].run(config);
    }
  }, {
    key: '_protectAgainstReactBoardReloading',
    value: function _protectAgainstReactBoardReloading() {
      var _this3 = this;

      var mutationObserver = new MutationObserver(function (mutations) {
        var contentHasBeenDeleted = mutations.find(function (mutation) {
          if (mutation.removedNodes < 1) {
            return false;
          }

          var removedNodes = [].concat(_toConsumableArray(mutation.removedNodes));
          return removedNodes.find(function (node) {
            return node.id === 'ghx-pool-column';
          });
        });

        if (contentHasBeenDeleted) {
          mutationObserver.disconnect();
          _this3._initialColumnResize();
        }
      });
      mutationObserver.observe(__WEBPACK_IMPORTED_MODULE_1__Jira__["a" /* default */].content(), {
        childList: true,
        subtree: true
      });
    }
  }, {
    key: '_openGithubLinksInNewTabs',
    value: function _openGithubLinksInNewTabs() {
      __WEBPACK_IMPORTED_MODULE_2__OpenGithubInNewTab__["a" /* default */].initialize();
    }
  }]);

  return BetterJira;
}();

/* harmony default export */ __webpack_exports__["a"] = (BetterJira);

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Jira__ = __webpack_require__(0);
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }



var Standup = function () {
  function Standup() {
    _classCallCheck(this, Standup);

    this.cssClass = 'standup';
    this.instructionsCssClass = 'BetterJira-instructions';
    this.data = {};
    this.running = true;
  }

  _createClass(Standup, [{
    key: 'run',
    value: function run(state) {
      var _this = this;

      if (__WEBPACK_IMPORTED_MODULE_0__Jira__["a" /* default */].isNotPresent()) {
        this.running = false;
        return;
      }

      // Open standup listener
      this._listener = function (click) {
        var standupButton = click.target.closest('[data-standup-open]');
        if (!standupButton) {
          return;
        }

        chrome.storage.sync.set({ standup: true }, function () {
          _this.initializeStandup(true);
        });
      };
      document.addEventListener('click', this._listener);

      //-- Add open Standup Mode button element
      var openStandupModeBtn = document.createElement('div');
      openStandupModeBtn.setAttribute('data-standup-open', '');
      openStandupModeBtn.classList.add(this.instructionsCssClass);
      openStandupModeBtn.innerHTML = '<span class="text">Standup Mode <span class="open">&nbsp;&laquo;&nbsp;</span></span>';
      openStandupModeBtn.style.display = 'none';
      document.getElementById('ghx-operations').appendChild(openStandupModeBtn);

      // Close standup listener
      this._listener = function (click) {
        var closeButton = click.target.closest('[data-standup-close]');
        if (!closeButton) {
          return;
        }

        chrome.storage.sync.set({ standup: false }, function () {
          _this._cleanupStandup();
        });
      };
      document.addEventListener('click', this._listener);

      //-- Add close Standup Mode button element
      var closeStandupModeBtn = document.createElement('div');
      closeStandupModeBtn.setAttribute('data-standup-close', '');
      closeStandupModeBtn.classList.add(this.instructionsCssClass);
      closeStandupModeBtn.innerHTML = '<span class="text">Standup Mode <span class="close">&nbsp;&laquo;&nbsp;</span></span>';
      closeStandupModeBtn.style.display = 'none';
      document.getElementById('ghx-operations').appendChild(closeStandupModeBtn);

      if (!state) {
        this._cleanupStandup();
        return;
      }

      this.initializeStandup();
    }
  }, {
    key: 'initializeStandup',
    value: function initializeStandup() {
      if (!this.running) {
        return;
      }

      window.standup = true;

      //-- Add `standup` class to the body
      document.body.classList.add(this.cssClass);

      //-- Show close standup mode button
      document.querySelector('[data-standup-close]').style.display = 'block';

      //-- Hide open standup mode button
      document.querySelector('[data-standup-open]').style.display = 'none';

      //-- Hide breadcrumbs
      document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'none';
    }
  }, {
    key: '_cleanupStandup',
    value: function _cleanupStandup() {

      //-- Remove standup class
      document.body.classList.remove(this.cssClass);

      //-- Turn off standup mode
      window.standup = false;

      //-- Hide close standup mode button
      document.querySelector('[data-standup-close]').style.display = 'none';

      //-- Show open standup mode button
      document.querySelector('[data-standup-open]').style.display = 'block';

      //-- Show breadcrumbs
      document.querySelector('[data-testid="rapidboard-breadcrumbs"]').style.display = 'block';
    }
  }]);

  return Standup;
}();

/* harmony default export */ __webpack_exports__["a"] = (new Standup());

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var OpenGithubInNewTab = function () {
  _createClass(OpenGithubInNewTab, null, [{
    key: 'initialize',
    value: function initialize() {
      return new this();
    }
  }]);

  function OpenGithubInNewTab() {
    _classCallCheck(this, OpenGithubInNewTab);

    document.addEventListener('click', function (click) {
      var githubLink = click.target.closest('.pullrequest-link, .repository-link, .branch-link, .create-pullrequest-link, .changesetid, .filename a, .filerow a.more-files-info');
      if (!githubLink) {
        return;
      }

      click.preventDefault();

      var newWindow = window.open(githubLink.href, '_blank');
      newWindow.opener = null;
    });
  }

  return OpenGithubInNewTab;
}();

/* harmony default export */ __webpack_exports__["a"] = (OpenGithubInNewTab);

/***/ }),
/* 7 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 8 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ }),
/* 9 */
/***/ (function(module, exports) {

// removed by extract-text-webpack-plugin

/***/ })
/******/ ]);