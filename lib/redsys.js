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
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	exports.RedsysBuilder = exports.PaymentBuilder = undefined;

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion:6*/


	var _payment = __webpack_require__(1);

	var _payment2 = _interopRequireDefault(_payment);

	var _crypto = __webpack_require__(2);

	var _crypto2 = _interopRequireDefault(_crypto);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	var Redsys = function Redsys(options) {
	    Object.assign(this, options);
	    this.generateMerchantParams = function (payment) {
	        return {
	            "DS_MERCHANT_AMOUNT": payment.total,
	            "DS_MERCHANT_ORDER": payment.order_id,
	            "DS_MERCHANT_MERCHANTCODE": this.merchantCode,
	            "DS_MERCHANT_CURRENCY": payment.currency,
	            "DS_MERCHANT_TRANSACTIONTYPE": this.transaction_type,
	            "DS_MERCHANT_TERMINAL": this.terminal,
	            "DS_MERCHANT_MERCHANTURL": payment.redirect_urls.merchant_url,
	            "DS_MERCHANT_URLOK": payment.redirect_urls.ok_url,
	            "DS_MERCHANT_URLKO": payment.redirect_urls.cancel_url,
	            'DS_MERCHANT_CONSUMERLANGUAGE': '001',
	            'DS_MERCHANT_TITULAR': this.titular,
	            'DS_MERCHANT_MERCHANTNAME': this.name

	        };
	    };

	    this.encodeOrder = function (order_id, secret) {
	        var secretKey = new Buffer(secret, 'base64');
	        var iv = new Buffer(8);
	        iv.fill(0);
	        var cipher = _crypto2.default.createCipheriv('des-ede3-cbc', secretKey, iv);
	        cipher.setAutoPadding(false);
	        var res = cipher.update(order_id, 'utf8', 'base64') + cipher.final('base64');
	        return res;
	    };

	    this.doSignature = function (order_encoded, merchant) {
	        var hexMac256 = _crypto2.default.createHmac("sha256", new Buffer(order_encoded, 'base64')).update(merchant).digest("hex");
	        return new Buffer(hexMac256, 'hex').toString('base64');
	    };

	    this.getFormData = function (payment) {
	        // Merchant parameters as a Base64-JSON
	        var merchant = new Buffer(JSON.stringify(this.generateMerchantParams(payment))).toString('base64');

	        // Calculate signature
	        var order_encoded = this.encodeOrder(payment.order_id, this.secret);
	        var signature = this.doSignature(order_encoded, merchant);

	        return {
	            'redsys_url': this.url,
	            'Ds_SignatureVersion': 'HMAC_SHA256_V1',
	            'Ds_MerchantParameters': merchant,
	            'Ds_Signature': signature
	        };
	    };
	};

	var RedsysBuilder = function () {
	    function RedsysBuilder() {
	        _classCallCheck(this, RedsysBuilder);

	        this.name = "Default-Redsys";
	        this.terminal = "1";
	        this.language = "auto";
	        this.transaction_type = "0";
	        // Production URL
	        this.url = "https://sis.redsys.es/sis/realizarPago";
	    }

	    _createClass(RedsysBuilder, [{
	        key: 'setMerchantCode',
	        value: function setMerchantCode(merchant_code) {
	            this.merchantCode = merchant_code;
	            return this;
	        }
	    }, {
	        key: 'setTerminal',
	        value: function setTerminal(terminal_number) {
	            this.terminal = terminal_numbver;
	            return this;
	        }
	    }, {
	        key: 'setName',
	        value: function setName(name) {
	            this.name = name;
	            return this;
	        }
	    }, {
	        key: 'setTitular',
	        value: function setTitular(titular) {
	            this.titular = titular;
	            return this;
	        }
	    }, {
	        key: 'setSecret',
	        value: function setSecret(secret) {
	            this.secret = secret;
	            return this;
	        }
	    }, {
	        key: 'enableDebug',
	        value: function enableDebug() {
	            // Change to debug url
	            this.url = "https://sis-t.redsys.es:25443/sis/realizarPago";
	            return this;
	        }
	    }, {
	        key: 'build',
	        value: function build() {
	            if (this.merchantCode === undefined) throw new Error("Merchant Code not set");
	            if (this.titular === undefined) throw new Error("Titular not set");
	            if (this.secret === undefined) throw new Error("Secret not set");
	            return new Redsys(this);
	        }
	    }]);

	    return RedsysBuilder;
	}();

	exports.PaymentBuilder = _payment2.default;
	exports.RedsysBuilder = RedsysBuilder;

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	/* jshint esversion:6 */

	var Payment = function Payment(options) {
	    Object.assign(this, options);
	};

	var PaymentBuilder = function () {
	    function PaymentBuilder() {
	        _classCallCheck(this, PaymentBuilder);

	        this.currency = 978; // for euros
	        this.description = "";
	        this.data = "";
	        this.transaction_type = 0;
	        this.redirect_urls = {
	            merchant_url: "",
	            ok_url: "",
	            cancel_url: ""
	        };
	    }

	    _createClass(PaymentBuilder, [{
	        key: "setTotal",
	        value: function setTotal(total) {
	            this.total = parseInt(total * 100);
	            return this;
	        }
	    }, {
	        key: "setOrderId",
	        value: function setOrderId(id) {
	            function zfill(num, len) {
	                return (Array(len).join("0") + num).slice(-len);
	            }
	            this.order_id = zfill(id, 8);
	            return this;
	        }
	    }, {
	        key: "setDescription",
	        value: function setDescription(description) {
	            this.description = description;
	            return this;
	        }
	    }, {
	        key: "setCurrency",
	        value: function setCurrency(currency) {
	            this.currency = currency;
	            return this;
	        }
	    }, {
	        key: "setUrlOK",
	        value: function setUrlOK(url) {
	            this.redirect_urls.ok_url = url;
	            return this;
	        }
	    }, {
	        key: "setUrlCancel",
	        value: function setUrlCancel(url) {
	            this.redirect_urls.cancel_url = url;
	            return this;
	        }
	    }, {
	        key: "setUrlMerchant",
	        value: function setUrlMerchant(url) {
	            this.redirect_urls.merchant_url = url;
	            return this;
	        }
	    }, {
	        key: "build",
	        value: function build() {
	            if (this.total === undefined) throw new Error("Total to charge not set");
	            if (this.order_id === undefined) throw new Error("You should set an order id");

	            if (this.redirect_urls.callback_url === "" || this.redirect_urls.cancel_url === "" || this.redirect_urls.return_url === "") {
	                throw new Error("Urls to return from Redsys shoud be setted properly");
	            }
	            return new Payment(this);
	        }
	    }]);

	    return PaymentBuilder;
	}();

	exports.default = PaymentBuilder;
	module.exports = exports["default"];

/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = require("crypto");

/***/ })
/******/ ]);