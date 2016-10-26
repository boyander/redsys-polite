
import PaymentBuilder from './payment';
import base64 from 'base-64';
import Crypto from 'crypto-js';


var Redsys = function(options){
    Object.assign(this, options);


    this.generateMerchantParams = function(payment){
        return {
            "DS_MERCHANT_AMOUNT":payment.total,
            "DS_MERCHANT_ORDER":payment.order_id,
            "DS_MERCHANT_MERCHANTCODE": this.merchantCode,
            "DS_MERCHANT_CURRENCY":payment.currency,
            "DS_MERCHANT_TRANSACTIONTYPE":this.transaction_type ,
            "DS_MERCHANT_TERMINAL":this.terminal,
            "DS_MERCHANT_MERCHANTURL":payment.redirect_urls.callback_url,
            "DS_MERCHANT_URLOK":payment.redirect_urls.callback_url,
            "DS_MERCHANT_URLKO":payment.redirect_urls.cancel_url,
            //"DS_MERCHANT_PAN":"4548812049400004",
            //"DS_MERCHANT_EXPIRYDATE":"1512",
            //"DS_MERCHANT_CVV2":"123"
        };
    };

    this.encodeOrder = function(_order_id, secret){
        // Calculate signature
        var order_id = "asdfasdfasdfasdfasdfasdfd";
        var crypted = Crypto.DES.encrypt(order_id, secret,{mode: Crypto.mode.CBC });
        return crypted.toString();
    };

    this.doSignature = function(order_encoded, merchant){
        var signature = Crypto.HmacSHA256(merchant, order_encoded); //message, key
        return base64.encode(signature);
    };

    this.getFormData = function(payment){

        // Merchant parameters as a Base64-JSON
        var merchant = base64.encode(JSON.stringify(this.generateMerchantParams(payment)));

        // Calculate signature
        var order_encoded = this.encodeOrder(payment.order_id, this.secret);
        var signature = this.doSignature(order_encoded,merchant);

        return {
            'redsys_url': this.url,
            'Ds_SignatureVersion':'HMAC_SHA256_V1',
            'Ds_MerchantParameters': merchant,
            'Ds_Signature': signature,
        };
    }
}

var RedsysBuilder = function() {
    this.name = "Default-Redsys";
    this.terminal = "1";
    this.language = "auto";
    // Production URL
    this.url = "https://sis.redsys.es/sis/realizarPago";
    this.setMerchantCode = function(merchant_code){
        this.merchantCode = merchant_code;
        return this;
    };
    this.setTerminal = function(terminal_number){
        this.terminal = terminal_number;
        return this;
    };
    this.setName = function(name){
        this.name;
        return this;
    };
    this.setTitular = function(titular){
        this.titular = titular;
        return this;
    };
    this.setSecret = function(secret){
        this.secret = secret;
        return this;
    };
    this.enableDebug = function(){
        // Change to debug url
        this.url = "https://sis-t.redsys.es:25443/sis/realizarPago";
        return this;
    }
    this.build = function(){
        if(this.merchantCode == undefined)
            throw new Error("Merchant Code not set");

        if(this.titular == undefined)
            throw new Error("Titular not set");

        if(this.secret == undefined)
            throw new Error("Secret not set");

        return new Redsys(this);
    };
};


export {
    RedsysBuilder,
    PaymentBuilder
};
