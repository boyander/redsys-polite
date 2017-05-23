[![npm version](https://badge.fury.io/js/redsys-polite.svg)](https://badge.fury.io/js/redsys-polite)
[![GitHub version](https://badge.fury.io/gh/boyander%2Fredsys-polite.svg)](https://badge.fury.io/gh/boyander%2Fredsys-polite)
[![NPM](https://nodei.co/npm/redsys-polite.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redsys-polite/)

# redsys-polite

Redsys payment gateway compatible with ES6. It implements the new HMAC-SHA256 requiest signing.

# Install package

You can install the package with npm:

    npm install --save redsys-polite

Import package using ES6:

    import {RedsysBuilder, PaymentBuilder} from 'redsys-polite';

If using ES5 (with node):

    var RedsysBuilder = require('redsys-polite').RedsysBuilder;
    var PaymentBuilder = require('redsys-polite').PaymentBuilder;

# How to use it

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

Then `form_encoded_params` will have the required properties to generate a payment form. Use this object to

    { redsys_url: 'https://sis-t.redsys.es:25443/sis/realizarPago',
      Ds_SignatureVersion: 'HMAC_SHA256_V1',
      Ds_MerchantParameters: '<encoded merchant parameters>',
      Ds_Signature: '<signature>' }

Form example using React:

      <form action={sign_payment.redsys_url} method="POST" ref="payform" >
        <input type="hidden" name="Ds_SignatureVersion" value={sign_payment.Ds_SignatureVersion}/>
        <input type="hidden" name="Ds_MerchantParameters" value={sign_payment.Ds_MerchantParameters}/>
        <input type="hidden" name="Ds_Signature" value={sign_payment.Ds_Signature}/>
      </form>

# Author
Marc Pomar Torres
- Email: marc@faable.com
- Twitter: [@boyander](https://twitter.com/boyander)
- [LinkedIn](https://www.linkedin.com/in/marc-pomar-torres-8297a536)
