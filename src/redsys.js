

var Redsys = function(options){
    this.terminal = options.terminal;
    this.name = options.name;
    this.merchant = options.merchantCode;
    this.language = options.language;
    this.url = options.url;
    this.secret = options.secret;
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

export default RedsysBuilder;