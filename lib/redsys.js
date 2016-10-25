module.exports =
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
/***/ function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});


	var Redsys = function Redsys(options) {
	    this.terminal = options.terminal;
	    this.name = options.name;
	    this.merchant = options.merchantCode;
	    this.language = options.language;
	    this.url = options.url;
	    this.secret = options.secret;
	};

	var RedsysBuilder = function RedsysBuilder() {
	    this.name = "Default-Redsys";
	    this.terminal = "1";
	    this.language = "auto";
	    // Production URL
	    this.url = "https://sis.redsys.es/sis/realizarPago";
	    this.setMerchantCode = function (merchant_code) {
	        this.merchantCode = merchant_code;
	        return this;
	    };
	    this.setTerminal = function (terminal_number) {
	        this.terminal = terminal_number;
	        return this;
	    };
	    this.setName = function (name) {
	        this.name;
	        return this;
	    };
	    this.setTitular = function (titular) {
	        this.titular = titular;
	        return this;
	    };
	    this.setSecret = function (secret) {
	        this.secret = secret;
	        return this;
	    };
	    this.enableDebug = function () {
	        // Change to debug url
	        this.url = "https://sis-t.redsys.es:25443/sis/realizarPago";
	    };
	    this.build = function () {
	        if (this.merchantCode == undefined) throw new Error("Merchant Code not set");

	        if (this.titular == undefined) throw new Error("Titular not set");

	        if (this.secret == undefined) throw new Error("Secret not set");

	        return new Redsys(this);
	    };
	};

	exports.default = RedsysBuilder;
	module.exports = exports["default"];

/***/ }
/******/ ]);