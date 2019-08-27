/*
*
*
*       FILL IN EACH UNIT TEST BELOW COMPLETELY
*       -----[Keep the tests in the same order!]----
*       (if additional are added, keep them at the very end!)
*/

const chai = require('chai');
const assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

const convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
  
  suite('Function convertHandler.getNum(input)', function() {
    
    test('Whole number input', function(done) {
      const input = '32L';
      assert.equal(convertHandler.getNum(input),32);
      done();
    });
    
    test('Decimal Input', function(done) {
      const input = '3.2KM';
      assert.equal(convertHandler.getNum(input),3.2)
      done();
    });
    
    test('Fractional Input', function(done) {
      const input = '3/2L';
      assert.equal(convertHandler.getNum(input),1.5)
      done();
    });
    
    test('Fractional Input w/ Decimal', function(done) {
      const input = '3.3/3.3mi';
      assert.equal(convertHandler.getNum(input),1)
      done();
    });
    
    test('Invalid Input (double fraction)', function(done) {
      const input = '3//3mi';
      assert.equal(convertHandler.getNum(input),'invalid number')
      done();
    });
    
    test('No Numerical Input', function(done) {
      const input = 'mi';
      assert.equal(convertHandler.getNum(input),1);
      done();
    }); 
    
  });
  
  suite('Function convertHandler.getUnit(input)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
      input.forEach(function(elm) {
        assert.equal(convertHandler.getUnit(elm),elm.toLowerCase())
      });
      done();
    });
    
    test('Unknown Unit Input', function(done) {
    const input = ['gal','l','mi','km','lbs','kg','GAL','L','MI','KM','LBS','KG'];
    input.forEach(function(elm){
      assert.notEqual(convertHandler.getUnit(elm),'invalid unit')
    })
      done();
    });  
    
  });
  
  suite('Function convertHandler.getReturnUnit(initUnit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expect = ['l','gal','km','mi','kg','lbs'];
      input.forEach(function(elm, i) {
        assert.equal(convertHandler.getReturnUnit(elm), expect[i]);
      });
      done();
    });
    
  });  
  
  suite('Function convertHandler.spellOutUnit(unit)', function() {
    
    test('For Each Valid Unit Inputs', function(done) {
      const input = ['gal','l','mi','km','lbs','kg'];
      const expected = ['gallons', 'liters', 'miles', 'kilometers','pounds','kilograms'];
      input.forEach(function(elm,i){
      assert.equal(convertHandler.spellOutUnit(elm),expected[i])
      })
      done();
    });
    
  });
  
  suite('Function convertHandler.convert(num, unit)', function() {
    
    test('Gal to L', function(done) {
      const input = [5, 'gal'];
      const expected = 18.9271;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1); 
      done();
    });
    
    test('L to Gal', function(done) {
      const input = [5, 'l'];
      const expected = 1.32086;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Mi to Km', function(done) {
      const input = [5, 'mi'];
      const expected = 8.0467;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
      //done();
    });
    
    test('Km to Mi', function(done) {
      const input = [5, 'km'];
      const expected = 3.10686;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Lbs to Kg', function(done) {
      const input = [1, 'lbs'];
      const expected = 0.45359;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
    
    test('Kg to Lbs', function(done) {
      const input = [1, 'kg'];
      const expected = 2.20462;
      assert.approximately(convertHandler.convert(input[0],input[1]),expected,0.1);
      done();
    });
  });
});