var Payment = function(options){
    Object.assign(this, options);
};

var PaymentBuilder = function(){
    this.currency = '978'; // for euros
    this.description = "";
    this.data = "";
    this.transaction_type = 0;
    this.redirect_urls = {
        callback_url: "",
        return_url: "",
        cancel_url: ""
    };
    this.setTotal = function(total){
        this.total = total;
        return this;
    };
    this.setOrderId = function(id){
        this.order_id = id;
        return this;
    };
    this.setDescription = function(description){
        this.description = description;
        return this;
    };
    this.setCurrency = function(currency){
        this.currency = currency;
        return this;
    };
    this.setUrlOK = function(url){
        this.redirect_urls.return_url = url;
        return this;
    };
    this.setUrlCancel = function(url){
        this.redirect_urls.cancel_url = url;
        return this;
    };
    this.setUrlCallback = function(url){
        this.redirect_urls.callback_url = url;
        return this;
    };
    this.build = function(){
        if(this.total == undefined)
            throw new Error("Total to charge not set");
        if(this.order_id == undefined)
            throw new Error("You should set an order id");

        if(
            this.redirect_urls.callback_url == "" ||
            this.redirect_urls.cancel_url == "" ||
            this.redirect_urls.return_url == ""
        )
            throw new Error("Urls to return from Redsys shoud be setted properly");
        return new Payment(this);
    }
};

export default PaymentBuilder;