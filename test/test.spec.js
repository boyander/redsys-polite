/*jshint esversion:6*/
require('dotenv').config()
import test from 'ava';
import {RedsysBuilder, PaymentBuilder} from '../lib/redsys';

const secret_data = {
  commerce_code: process.env.COMMERCE_CODE || '000000000',
  secret_code: process.env.COMMERCE_SECRET || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};
console.log(secret_data);

test('builder works with all required properties set',t => {
  var redsys = new RedsysBuilder()
              .setMerchantCode(secret_data.commerce_code)
              .setTitular("Marc Pomar")
              .setSecret(secret_data.secret_code)
              .build();
  t.is(redsys.secret, secret_data.secret_code);
  t.not(redsys.url,undefined);
});

test('throws error if missing properties on builder',t => {
  var builder = new RedsysBuilder()
      .setMerchantCode("33")
      .setTitular("Marc Pomar");
  t.throws(() => builder.build());
});

test('throws error if missing properties on builder',t => {
  var paymentBuilder = new PaymentBuilder()
      .setTotal(3.20)
      .setOrderId("123456")
      .setUrlMerchant("http://faable.com")
      .setUrlCancel("http://faable.com/cancel")
      .setUrlOK("http://faable.com/accept");
  t.notThrows(() => paymentBuilder.build());
});


test('throws error if missing properties on builder',t => {
  const redsys = new RedsysBuilder()
      .setMerchantCode(secret_data.commerce_code)
      .setName("Faable.com")
      .setTitular("Marc Pomar")
      .setSecret(secret_data.secret_code)
      .enableDebug()
      .build();

  const payment = new PaymentBuilder()
      .setTotal(3.20)
      .setOrderId("1")
      .setUrlMerchant("http://faable.com")
      .setUrlCancel("http://faable.com/cancel")
      .setUrlOK("http://faable.com/accept")
      .build();

  const form_encoded_params = redsys.getFormData(payment);
  const all_params = redsys.generateMerchantParams(payment);
  t.not(form_encoded_params, undefined);
  t.not(all_params, undefined);
  t.snapshot(form_encoded_params);
  t.snapshot(all_params);
});
