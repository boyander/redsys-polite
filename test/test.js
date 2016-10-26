/**
 * Created by boyander on 24/10/16.
 */
import chai from 'chai';
import {RedsysBuilder, PaymentBuilder} from '../src/redsys';

chai.should();
var assert = chai.assert;

var commerce_code = process.env.COMMERCE_CODE || '0001';
console.log("Using commerce code -> " + commerce_code);

var secret_code = process.env.SECRET_CODE || "invalid-secret-code";
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
            //console.log(redsys);
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
                .setOrderId(123456)
                .setUrlCallback("http://faable.com")
                .setUrlCancel("http://faable.com/cancel")
                .setUrlOK("http://faable.com/accept")
                .build();
        });
        it('test generate form params', function() {
            var payment = new PaymentBuilder()
                .setTotal("3.20")
                .setOrderId("00000000000000001")
                .setUrlCallback("http://faable.com")
                .setUrlCancel("http://faable.com/cancel")
                .setUrlOK("http://faable.com/accept")
                .build();

            var redsys = new RedsysBuilder()
                .setMerchantCode(commerce_code)
                .setTitular("Marc Pomar")
                .setSecret(secret_code)
                .enableDebug()
                .build();

            var form_encoded_params = redsys.getFormData(payment)
            var all_params = redsys.generateMerchantParams(payment);

            //console.log(payment);
            console.log(form_encoded_params);
            console.log(all_params);

        });
    });
});