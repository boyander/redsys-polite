/*jshint esversion:6*/

/**
 * Created by boyander on 24/10/16.
 */
import chai from 'chai';
import {RedsysBuilder, PaymentBuilder} from '../lib/redsys';

chai.should();
var assert = chai.assert;

const commerce_code = process.env.COMMERCE_CODE || '000000000';
console.log("Using commerce code -> " + commerce_code);

const secret_code = process.env.SECRET_CODE || "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";
console.log("Using secret -> " + secret_code);

describe('Redsys', function() {
    describe('RedsysBuilder', function() {
        it('builder works with all required properties set', function() {
            var redsys = new RedsysBuilder()
                        .setMerchantCode(commerce_code)
                        .setTitular("Marc Pomar")
                        .setSecret(secret_code)
                        .build();
            redsys.should.have.property('secret');
            redsys.should.have.property('url');
        });
        it('throws error if missing properties on builder', function(){
            var builder = new RedsysBuilder()
                .setMerchantCode("33")
                .setTitular("Marc Pomar");
            assert.throws(builder.build, Error);
        });
    });
    describe('PaymentBuilder', function() {
        it('builder works with all required properties set', function() {
            var payment = new PaymentBuilder()
                .setTotal(3.20)
                .setOrderId("123456")
                .setUrlMerchant("http://faable.com")
                .setUrlCancel("http://faable.com/cancel")
                .setUrlOK("http://faable.com/accept")
                .build();
        });
        it('test generate form params', function() {

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
                .setUrlMerchant("http://faable.com")
                .setUrlCancel("http://faable.com/cancel")
                .setUrlOK("http://faable.com/accept")
                .build();

            const form_encoded_params = redsys.getFormData(payment);
            const all_params = redsys.generateMerchantParams(payment);
            console.log(form_encoded_params);
            console.log(all_params);
        });
    });
});
