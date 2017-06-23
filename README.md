[![npm version](https://badge.fury.io/js/redsys-polite.svg)](https://badge.fury.io/js/redsys-polite)
[![GitHub version](https://badge.fury.io/gh/boyander%2Fredsys-polite.svg)](https://badge.fury.io/gh/boyander%2Fredsys-polite)
[![NPM](https://nodei.co/npm/redsys-polite.png?downloads=true&downloadRank=true&stars=true)](https://nodei.co/npm/redsys-polite/)

# redsys-polite

Redsys payment gateway compatible with ES6. It implements the new HMAC-SHA256 request signing procedure.

# Install package

You can install the package with npm:

    npm install --save redsys-polite

Import package using ES6:

    import {RedsysBuilder, PaymentBuilder} from 'redsys-polite';

With node:

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

# Decode POST notification received from payment server

With initialized redsys object using RedsysBuilder call the method like this:
  var Ds_Signature = req.body.Ds_Signature;
  var Ds_MerchantParameters = req.body.Ds_MerchantParameters;
  redsys.decodeNotifiedMerchantParams(Ds_Signature, Ds_MerchantParameters)
      .then((decodedParams) => console.log(decodedParams))
      .catch(e => console.log(e)); // Catch error for invalid signature

`_decodeNotifiedMerchantParams` returns a promise that is rejected if signature is not valid. Remember to catch it like the shown example.

# Redsys server notification

Convert response DS_Code to a message string:

  import {codeToMessage} from 'redsys-polite';
  var obj = codeToMessage('9915'); // Example Ds_Response code can be 9915, user canceled the payment;
  console.log(obj.message); // Prints text description for this code

# Author
Marc Pomar Torres
- Email: marc@faable.com
- Twitter: [@boyander](https://twitter.com/boyander)
- [LinkedIn](https://www.linkedin.com/in/marc-pomar-torres-8297a536)
