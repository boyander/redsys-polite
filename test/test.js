/**
 * Created by boyander on 24/10/16.
 */
import chai from 'chai';
import RedsysBuilder from '../lib/redsys.js';

chai.should();
var assert = chai.assert;

describe('Redsys', function() {
    describe('builder', function() {
        it('builder works with all required properties set', function() {
            var redsys = new RedsysBuilder()
                        .setMerchantCode("33")
                        .setTitular("Marc Pomar")
                        .setSecret("jajajajaj")
                        .build();
            redsys.should.have.property('secret');
            redsys.should.have.property('url');
            console.log(redsys);
        });
        it('throws error if missing properties on builder', function(){
            var builder = new RedsysBuilder()
                .setMerchantCode("33")
                .setTitular("Marc Pomar");
            assert.throws(builder.build, Error);
        });
    });
});