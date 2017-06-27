/* jshint esversion:6 */
require('dotenv').config();
import {RedsysBuilder, PaymentBuilder} from '../src/index';

const commerce_code = process.env.COMMERCE_CODE || '000000000';
const secret_code = process.env.COMMERCE_SECRET || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

const redsys = new RedsysBuilder()
    .setMerchantCode(commerce_code)
    .setName("Faable.com")
    .setTitular("Marc Pomar")
    .setSecret(secret_code)
    .enablePayByReference()
    .enableDebug()
    .build();

const express = require('express');
const app = express();

app.post('/accept', function(req,res){
  console.log("TEST");
});

app.get('/', function (req, res) {

  const payment = new PaymentBuilder()
      .setTotal(3.20)
      .setOrderId(Date.now())
      .setUrlMerchant("http://localhost:3000/notify")
      .setUrlCancel("http://localhost:3000/cancel")
      .setUrlOK("http://localhost:3000/accept")
      .build();

  const form_encoded_params = redsys.getFormData(payment);
  console.log(form_encoded_params);

  var sampleForm = `
  <!DOCTYPE html>
  <html>
  <head>
  <meta charset="UTF-8">
  <title>Payment form example</title>
  </head>
  <body>
  <form action="${form_encoded_params.redsys_url}" method="POST" ref="payform" >
    <input name="Ds_SignatureVersion" value="${form_encoded_params.Ds_SignatureVersion}"/>
    <input name="Ds_MerchantParameters" value="${form_encoded_params.Ds_MerchantParameters}"/>
    <input name="Ds_Signature" value="${form_encoded_params.Ds_Signature}"/>
    <button type="submit" value="Submit">Submit</button>
  </form>
  </body>
  </html>
  `;
  res.send(sampleForm);
});

app.listen(3000, function () {
  console.log('Redsys-polite demo running on port 3000!');
});
