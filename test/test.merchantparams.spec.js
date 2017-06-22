/* jshint esversion:6 */

require('dotenv').config();
import test from 'ava';
import {RedsysBuilder, PaymentBuilder, codeToMessage} from '../src/index';

const secret_data = {
  commerce_code: process.env.COMMERCE_CODE || '000000000',
  secret_code: process.env.COMMERCE_SECRET || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

var Ds_SignatureVersion = process.env.EXAMPLE_DS_SIGNATURE_VERSION;
var Ds_MerchantParameters = process.env.EXAMPLE_DS_MERCHANT_PARAMETERS;
var Ds_Signature = process.env.EXAMPLE_DS_SIGNATURE;

test.beforeEach(t => {
	t.context.redsys = new RedsysBuilder()
              .setMerchantCode(secret_data.commerce_code)
              .setTitular("Marc Pomar")
              .setSecret(secret_data.secret_code)
              .build();
});

test('Merchant parameters are ok set',t => {
  t.plan(1);
  return t.context.redsys._decodeNotifiedMerchantParams(Ds_Signature, Ds_MerchantParameters)
          .then((decodedParams) => {
            t.pass();
          });
});

test('Error code is not valid',t => {
  t.plan(1);
  return t.context.redsys._decodeNotifiedMerchantParams(Ds_Signature, Ds_MerchantParameters)
          .then((decodedParams) => {
            var obj = codeToMessage(decodedParams.Ds_Response);
            t.false(obj.valid);
          });
});
