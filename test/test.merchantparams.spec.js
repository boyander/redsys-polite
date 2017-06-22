/* jshint esversion:6 */

require('dotenv').config();
import test from 'ava';
import {RedsysBuilder, PaymentBuilder} from '../src/index';

const secret_data = {
  commerce_code: process.env.COMMERCE_CODE || '000000000',
  secret_code: process.env.COMMERCE_SECRET || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
};

var Ds_SignatureVersion = process.env.EXAMPLE_DS_SIGNATURE_VERSION;
var Ds_MerchantParameters = process.env.EXAMPLE_DS_MERCHANT_PARAMETERS;
var Ds_Signature = process.env.EXAMPLE_DS_SIGNATURE;

test('Merchant parameters are ok set',t => {
  t.plan(1);
  var redsys = new RedsysBuilder()
              .setMerchantCode(secret_data.commerce_code)
              .setTitular("Marc Pomar")
              .setSecret(secret_data.secret_code)
              .build();
  return redsys._decodeNotifiedMerchantParams(Ds_Signature, Ds_MerchantParameters)
          .then((decodedParams) => {
            t.pass();
          });
});
