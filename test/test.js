/**
 * Created by boyander on 24/10/16.
 */
import chai from 'chai';
import Redsys from '../lib/redsys'

chai.should();

describe('Redsys', function() {
    describe('return-value', function() {
        it('should return -1 when the value is not present', function() {
            var redsys = new Redsys();
            redsys.should.have.property('key');
        });
    });
});