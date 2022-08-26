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
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ({

/***/ 10:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(11);


/***/ }),

/***/ 11:
/***/ (function(module, exports) {

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Popup = function () {
  function Popup() {
    _classCallCheck(this, Popup);

    this.Storage = chrome.storage.sync;
    this.data = {};
    this.defaults = {
      columnWidth: 200,
      enabled: true,
      standup: false,
      updatedEvent: 'better-jira:updated'
    };

    this.loadListener = this.boot.bind(this);
    window.addEventListener('load', this.loadListener);
  }

  _createClass(Popup, [{
    key: 'boot',
    value: function boot() {
      window.removeEventListener('load', this.loadListener);

      this.setDefaults();
      this.handleFormEvents();
    }
  }, {
    key: 'setDefaults',
    value: function setDefaults() {
      var _this = this;

      this.Storage.get('columnWidth', function (storage) {
        console.log('storage', storage);
        var value = storage.columnWidth;
        console.log('columnWidth from Storage', value);
        if (!value) {
          value = _this.defaults.columnWidth;
          _this.Storage.set({ columnWidth: value });
        }
        _this.data.columnWidth = value;

        document.getElementById('columnWidth').value = _this.data.columnWidth;
      });

      this.Storage.get('enabled', function (storage) {
        var value = storage.enabled;
        if (value === undefined) {
          value = _this.defaults.enabled;
          _this.Storage.set({ enabled: value });
        }

        _this.data.enabled = value;
        console.log('enabled storage', storage);

        document.getElementById('enabled').checked = !!value;
      });

      this.Storage.get('standup', function (storage) {
        var value = storage.standup;
        if (value === undefined) {
          value = _this.defaults.standup;
          _this.Storage.set({ standup: value });
        }

        _this.data.standup = value;
        console.log('standup storage', storage);

        document.getElementById('standup').checked = !!value;
      });
    }
  }, {
    key: 'handleFormEvents',
    value: function handleFormEvents() {
      var _this2 = this;

      //-- Close the window
      var close = document.getElementById('close');
      close.addEventListener('click', function (event) {
        window.close();
      });

      //-- Trigger Enabled (as a 1-click event)
      var enabled = document.getElementById('enabled');
      enabled.addEventListener('click', function (event) {
        _this2.data.enabled = enabled.checked;
        _this2.save();
      });

      //-- Trigger Standup (as a 1-click event)
      var standup = document.getElementById('standup');
      standup.addEventListener('click', function (event) {
        console.log('you clicked it!', standup.checked, event);
        _this2.data.standup = standup.checked;
        _this2.save();
      });

      //-- Auto update DOM
      document.querySelector('#better-jira #columnWidth').addEventListener('change', function (changeEvent) {
        if (changeEvent.target.value > 10) {
          _this2.data.columnWidth = document.getElementById('columnWidth').value;
          _this2.save();
        }
      });
    }
  }, {
    key: 'save',
    value: function save() {
      var _this3 = this;

      this.Storage.set({ enabled: this.data.enabled }, function () {
        _this3.Storage.set({ columnWidth: _this3.data.columnWidth }, function () {
          _this3.Storage.set({ standup: _this3.data.standup }, _this3.refresh.bind(_this3));
        });
      });
    }
  }, {
    key: 'refresh',
    value: function refresh() {
      var code = ['(function()', '{', '\'use strict\';', 'let updateEvent = new CustomEvent(\'' + this.defaults.updatedEvent + '\', {', 'detail: {', 'columnWidth: ' + this.data.columnWidth + ',', 'enabled: ' + this.data.enabled + ',', 'standup: ' + this.data.standup + ',', '}', '});', 'document.dispatchEvent(updateEvent);', '})();'];

      chrome.tabs.executeScript({
        code: code.join('')
      });
    }
  }]);

  return Popup;
}();

new Popup();

/***/ })

/******/ });