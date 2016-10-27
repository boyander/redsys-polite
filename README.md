
[![npm version](https://badge.fury.io/js/redsys-polite.svg)](https://badge.fury.io/js/redsys-polite)
[![GitHub version](https://badge.fury.io/gh/boyander%2Fredsys-polite.svg)](https://badge.fury.io/gh/boyander%2Fredsys-polite)

[![NPM](https://nodei.co/npm/redsys-polite.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redsys-polite/)

# redsys-polite
Use redsys payment platform wherever you want in an easy way. 
It implements the new HMAC-SHA256 for signing the request.


# Importing package

You can install the package with npm:
    
    npm install redsys-polite

Usage is fairly easy first just import the module, if using ES6:

    import {RedsysBuilder, PaymentBuilder} from 'redsys-polite';

Or if using old fashion javascript require:

    var RedsysBuilder = require('redsys-polite').RedsysBuilder;
    var PaymentBuilder = require('redsys-polite').PaymentBuilder;

# Usage

Generate form parameters with the following code.

    const commerce_code = "<your_commerce_code>";
    const secret_code = "<your_secret_key>";

    const redsys = new RedsysBuilder()
        .setMerchantCode(commerce_code)
        .setName("Faable.com")
        .setTitular("Marc Pomar")
        .setSecret(secret_code)
        .enableDebug()
        .build();
    
    const payment = new PaymentBuilder()
        .setTotal(3.20)
        .setOrderId("1")
        .setUrlCallback("http://faable.com")
        .setUrlCancel("http://faable.com/cancel")
        .setUrlOK("http://faable.com/accept")
        .build();
    
    const form_encoded_params = redsys.getFormData(payment);

After that `form_encoded_params` will have the required properties to generate a payment form.

    { redsys_url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
      Ds_SignatureVersion: 'HMAC_SHA256_V1',
      Ds_MerchantParameters: '<encoded merchant parameters>',
      Ds_Signature: '<signature>' }
      
# Author
Marc Pomar Torres
- Email: marc@faable.com
- Twitter: [@boyander](https://twitter.com/boyander)
- [LinkedIn](https://www.linkedin.com/in/marc-pomar-torres-8297a536)