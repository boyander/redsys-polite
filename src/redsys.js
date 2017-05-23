/*jshint esversion:6*/
import PaymentBuilder from './payment';
import crypto from 'crypto';

var Redsys = function(options){
    Object.assign(this, options);
    this.generateMerchantParams = function(payment){
        return {
            "DS_MERCHANT_AMOUNT":payment.total,
            "DS_MERCHANT_ORDER":payment.order_id,
            "DS_MERCHANT_MERCHANTCODE": this.merchantCode,
            "DS_MERCHANT_CURRENCY":payment.currency,
            "DS_MERCHANT_TRANSACTIONTYPE":this.transaction_type,
            "DS_MERCHANT_TERMINAL":this.terminal,
            "DS_MERCHANT_MERCHANTURL":payment.redirect_urls.merchant_url,
            "DS_MERCHANT_URLOK":payment.redirect_urls.ok_url,
            "DS_MERCHANT_URLKO":payment.redirect_urls.cancel_url,
            'DS_MERCHANT_CONSUMERLANGUAGE':'001',
            'DS_MERCHANT_TITULAR':this.titular,
            'DS_MERCHANT_MERCHANTNAME':this.name,

            // Test code
            //"DS_MERCHANT_PAN":"4548812049400004",
            //"DS_MERCHANT_EXPIRYDATE":"1220",
            //"DS_MERCHANT_CVV2":"123"
        };
    };

    this.encodeOrder = function(order_id, secret){
        console.log(secret);
        var secretKey = new Buffer(secret, 'base64');
        var iv = new Buffer(8);
        iv.fill(0);
        var cipher = crypto.createCipheriv('des-ede3-cbc', secretKey, iv);
        cipher.setAutoPadding(false);
        var res = cipher.update(order_id, 'utf8', 'base64') + cipher.final('base64');
        return res;
    };

    this.doSignature = function(order_encoded, merchant){
        var hexMac256 = crypto.createHmac("sha256", new Buffer(order_encoded, 'base64')).update(merchant).digest("hex");
        return new Buffer(hexMac256, 'hex').toString('base64');
    };

    this.getFormData = function(payment){
        // Merchant parameters as a Base64-JSON
        var merchant = new Buffer(JSON.stringify(this.generateMerchantParams(payment))).toString('base64');

        // Calculate signature
        var order_encoded = this.encodeOrder(payment.order_id, this.secret);
        var signature = this.doSignature(order_encoded, merchant);

        return {
            'redsys_url': this.url,
            'Ds_SignatureVersion':'HMAC_SHA256_V1',
            'Ds_MerchantParameters': merchant,
            'Ds_Signature': signature,
        };
    };
};


class RedsysBuilder{
  constructor(){
    this.name = "Default-Redsys";
    this.terminal = "1";
    this.language = "auto";
    this.transaction_type="0";
    // Production URL
    this.url = "https://sis.redsys.es/sis/realizarPago";
  }
  setMerchantCode(merchant_code){
      this.merchantCode = merchant_code;
      return this;
  }
  setTerminal(terminal_number){
      this.terminal = terminal_numbver;
      return this;
  }
  setName(name){
      this.name = name;
      return this;
  }
  setTitular(titular){
      this.titular = titular;
      return this;
  }
  setSecret(secret){
      this.secret = secret;
      return this;
  }
  enableDebug(){
      // Change to debug url
      this.url = "https://sis-t.redsys.es:25443/sis/realizarPago";
      return this;
  }
  build(){
      if(this.merchantCode === undefined) throw new Error("Merchant Code not set");
      if(this.titular === undefined) throw new Error("Titular not set");
      if(this.secret === undefined) throw new Error("Secret not set");
      return new Redsys(this);
  }
}

export {
    PaymentBuilder,
    RedsysBuilder
};
