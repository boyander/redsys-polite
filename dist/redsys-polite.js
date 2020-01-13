/*!
 *  redsys-polite - 1.4.2
 *  Marc Pomar Torres - marc@faable.com 
 *  created by Faable.com 
 *  file:redsys-polite.js 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("crypto"));
	else if(typeof define === 'function' && define.amd)
		define(["crypto"], factory);
	else {
		var a = typeof exports === 'object' ? factory(require("crypto")) : factory(root["crypto"]);
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.codeToMessage = exports.RedsysBuilder = exports.PaymentBuilder = undefined;

var _payment = __webpack_require__(1);

var _payment2 = _interopRequireDefault(_payment);

var _redsys = __webpack_require__(2);

var _redsys2 = _interopRequireDefault(_redsys);

var _error_codes = __webpack_require__(4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.PaymentBuilder = _payment2.default;
exports.RedsysBuilder = _redsys2.default;
exports.codeToMessage = _error_codes.codeToMessage; /* jshint esversion:6 */

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

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
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); /*jshint esversion:6*/


var _crypto = __webpack_require__(3);

var _crypto2 = _interopRequireDefault(_crypto);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Redsys = function () {
  function Redsys(p) {
    _classCallCheck(this, Redsys);

    Object.assign(this, p);
  }

  _createClass(Redsys, [{
    key: "generateMerchantParams",
    value: function generateMerchantParams(payment) {
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
        'DS_MERCHANT_MERCHANTNAME': this.name,
        'DS_MERCHANT_IDENTIFIER': this.setPayByReference,
        'DS_MERCHANT_DIRECTPAYMENT': this.enableDirectPayment
        // Test code
        //"DS_MERCHANT_PAN":"4548812049400004",
        //"DS_MERCHANT_EXPIRYDATE":"1220",
        //"DS_MERCHANT_CVV2":"123"
      };
    }
  }, {
    key: "encodeOrder",
    value: function encodeOrder(order_id, secret) {
      var secretKey = new Buffer(secret, 'base64');
      var iv = new Buffer(8);
      iv.fill(0);
      var cipher = _crypto2.default.createCipheriv('des-ede3-cbc', secretKey, iv);
      cipher.setAutoPadding(false);
      var res = cipher.update(order_id, 'utf8', 'base64') + cipher.final('base64');
      return res;
    }
  }, {
    key: "doSignature",
    value: function doSignature(order_encoded, merchantData) {
      var hexMac256 = _crypto2.default.createHmac("sha256", new Buffer(order_encoded, 'base64')).update(merchantData).digest("hex");
      return new Buffer(hexMac256, 'hex').toString('base64');
    }
  }, {
    key: "_decodeNotifiedMerchantParams",
    value: function _decodeNotifiedMerchantParams(signature, merchantData) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        var decodedData = JSON.parse(new Buffer(merchantData, 'base64'));
        var key = _this.encodeOrder(decodedData.Ds_Order, _this.secret);
        var hexMac256 = _crypto2.default.createHmac("sha256", new Buffer(key, 'base64')).update(merchantData).digest();
        var signatureBuffer = new Buffer(signature, 'base64');
        if (hexMac256.equals(signatureBuffer)) {
          resolve(decodedData);
        } else {
          reject(new Error('Signature is not valid'));
        }
      });
    }
  }, {
    key: "getFormData",
    value: function getFormData(payment) {
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
    }
  }]);

  return Redsys;
}();

var RedsysBuilder = function () {
  function RedsysBuilder() {
    _classCallCheck(this, RedsysBuilder);

    this.name = "Default-Redsys";
    this.terminal = "1";
    this.language = "auto";
    this.transaction_type = "0";
    this.setPayByReference = '';
    this.enableDirectPayment = false;
    // Production URL
    this.url = "https://sis.redsys.es/sis/realizarPago";
  }

  _createClass(RedsysBuilder, [{
    key: "setMerchantCode",
    value: function setMerchantCode(merchant_code) {
      this.merchantCode = merchant_code;
      return this;
    }
  }, {
    key: "setTerminal",
    value: function setTerminal(terminal_number) {
      this.terminal = terminal_number;
      return this;
    }
  }, {
    key: "setName",
    value: function setName(name) {
      this.name = name;
      return this;
    }
  }, {
    key: "setTitular",
    value: function setTitular(titular) {
      this.titular = titular;
      return this;
    }
  }, {
    key: "enablePayByReference",
    value: function enablePayByReference(reference) {
      this.setPayByReference = reference || "REQUIRED";
      return this;
    }
  }, {
    key: "enableDirectPayment",
    value: function enableDirectPayment() {
      this.enableDirectPayment = true;
      return this;
    }
  }, {
    key: "setSecret",
    value: function setSecret(secret) {
      this.secret = secret;
      return this;
    }
  }, {
    key: "enableDebug",
    value: function enableDebug() {
      // Change to debug url
      this.url = "https://sis-t.redsys.es:25443/sis/realizarPago";
      return this;
    }
  }, {
    key: "build",
    value: function build() {
      if (this.merchantCode === undefined) throw new Error("Merchant Code not set");
      if (this.titular === undefined) throw new Error("Titular not set");
      if (this.secret === undefined) throw new Error("Secret not set");
      return new Redsys(this);
    }
  }]);

  return RedsysBuilder;
}();

exports.default = RedsysBuilder;
module.exports = exports["default"];

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = require("crypto");

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
/* jshint esversion:6 */

var OK = function OK(m) {
  return {
    message: m,
    valid: true
  };
};

var NOT_OK = function NOT_OK(m) {
  return {
    message: m,
    valid: false
  };
};

var codeToMessage = function codeToMessage(code) {
  code = parseInt(code);
  if (code >= 0 && code <= 99) {
    return OK("Transacción autorizada para pagos y preautorizaciones");
  }

  switch (code) {
    case 900:
      return OK("Transacción autorizada para devoluciones y confirmaciones");
    case 101:
      return NOT_OK("Tarjeta caducada");
    case 102:
      return NOT_OK("Tarjeta en excepción transitoria o bajo sospecha de fraude");
    case 106:
      return NOT_OK("Intentos de PIN excedidos");
    case 125:
      return NOT_OK("Tarjeta no efectiva");
    case 129:
      return NOT_OK("Código de seguridad (CVV2/CVC2) incorrecto");
    case 180:
      return NOT_OK("Tarjeta ajena al servicio");
    case 184:
      return NOT_OK("Error en la autenticación del titular");
    case 190:
      return NOT_OK("Denegación del emisor sin especificar motivo");
    case 191:
      return NOT_OK("Fecha de caducidad errónea");
    case 202:
      return NOT_OK("Tarjeta en excepción transitoria o bajo sospecha de fraude con retirada de tarjeta");
    case 904:
      return NOT_OK("Comercio no registrado en FUC");
    case 909:
      return NOT_OK("Error de sistema");
    case 913:
      return NOT_OK("Pedido repetido");
    case 944:
      return NOT_OK("Sesión Incorrecta");
    case 950:
      return NOT_OK("Operación de devolución no permitida");
    case 9912:
      return NOT_OK("Emisor no disponible");
    case 912:
      return NOT_OK("Emisor no disponible");
    case 9064:
      return NOT_OK("Número de posiciones de la tarjeta incorrecto");
    case 9078:
      return NOT_OK("Tipo de operación no permitida para esa tarjeta");
    case 9093:
      return NOT_OK("Tarjeta no existente");
    case 9094:
      return NOT_OK("Rechazo servidores internacionales");
    case 9104:
      return NOT_OK("Comercio con “titular seguro” y titular sin clave de compra segura");
    case 9218:
      return NOT_OK("El comercio no permite op. seguras por entrada /operaciones");
    case 9253:
      return NOT_OK("Tarjeta no cumple el check-digit");
    case 9256:
      return NOT_OK("El comercio no puede realizar preautorizaciones");
    case 9257:
      return NOT_OK("Esta tarjeta no permite operativa de preautorizaciones");
    case 9261:
      return NOT_OK("Operación detenida por superar el control de restricciones en la entrada al SIS");
    case 9913:
      return NOT_OK("Error en la confirmación que el comercio envía al TPV Virtual (solo aplicable en la opción de sincronización SOAP)");
    case 9914:
      return NOT_OK("Confirmación “KO” del comercio (solo aplicable en la opción de sincronización SOAP)");
    case 9915:
      return NOT_OK("A petición del usuario se ha cancelado el pago");
    case 9928:
      return NOT_OK("Anulación de autorización en diferido realizada por el SIS (proceso batch)");
    case 9929:
      return NOT_OK("Anulación de autorización en diferido realizada por el comercio");
    case 9997:
      return NOT_OK("Se está procesando otra transacción en SIS con la misma tarjeta");
    case 9998:
      return NOT_OK("Operación en proceso de solicitud de datos de tarjeta");
    case 9999:
      return NOT_OK("Operación que ha sido redirigida al emisor a autenticar");
    case 298:
      return NOT_OK("El comercio no permite realizar operaciones de Tarjeta en Archivo");
    case 319:
      return NOT_OK("El comercio no pertenece al grupo especificado en Ds_Merchant_Group");
    case 321:
      return NOT_OK("La referencia indicada en Ds_Merchant_Identifier no está asociada al comercio");
    case 322:
      return NOT_OK("Error de formato en Ds_Merchant_Group");
    case 325:
      return NOT_OK("Se ha pedido no mostrar pantallas pero no se ha enviado ninguna referencia de tarjeta");
    default:
      return NOT_OK("UNDEFINED ANSWER");
  }
};

exports.codeToMessage = codeToMessage;

/***/ })
/******/ ]);
});
