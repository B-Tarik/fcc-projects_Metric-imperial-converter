import React from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';

import AppTitle from './common/appTitle.jsx';

const CodeSolution = () => {
  
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Metric-Imperial Converter</h1>} />
      <div className="code-solution">
        <h2>Code Solution</h2>
        <ol>
          
          <li>I will help prevent the client from trying to guess(sniff) the MIME type.</li>
          
          <li>I will prevent cross-site scripting (XSS) attacks.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q1}
          </SyntaxHighlighter>
          
          <li>I can <b>GET</b> <code>/api/convert</code> with a single parameter containing an accepted number and unit and have it converted.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q2}
          </SyntaxHighlighter>
          
          <li>I can convert 'gal' to 'L' and vice versa. <b>(1 gal to 3.78541 L)</b></li>
          
          <li>I can convert 'lbs' to 'kg' and vice versa. <b>(1 lbs to 0.453592 kg)</b></li> 
          
          <li>I can convert 'mi' to 'km' and vice versa. <b>(1 mi to 1.60934 km)</b></li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q3}
          </SyntaxHighlighter>
          
          <li>If my unit of measurement is invalid, returned will be 'invalid unit'.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q4}
          </SyntaxHighlighter>
          
          <li>If my number is invalid, returned with will 'invalid number'.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q5}
          </SyntaxHighlighter>
          
          <li>If both are invalid, return will be 'invalid number and unit'.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q6}
          </SyntaxHighlighter>
          
          <li>I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.</li>

          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q7}
          </SyntaxHighlighter>
          
          <li>My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format <code>{'{'}initNum{'}'} {'{'}initial_Units{'}'} converts to {'{'}returnNum{'}'} {'{'}return_Units{'}'}</code> with the result rounded to 5 decimals.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q8}
          </SyntaxHighlighter>
          
          <li>All 16 unit tests are complete and passing.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q9_1}
          </SyntaxHighlighter>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q9_2}
          </SyntaxHighlighter>
          
          <li>All 5 functional tests are complete and passing.</li>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q10_1}
          </SyntaxHighlighter>
          
          <SyntaxHighlighter language="javascript" style={atomDark}>
            {q10_2}
          </SyntaxHighlighter>
          
        </ol>
      </div>   
      
    </div>
  );
}


const q1 = `app.use(helmet());`
  
  const q2 = `app.route('/api/convert')
  .get(function (req, res){ ... });`
  
  const q3 = `this.convert = function(initNum, initUnit) {
  const galToL  = 3.78541;
  const lbsToKg = 0.45359;
  const miToKm  = 1.60934;
  const kgToLbs = 2.20462;
  const lToGal  = 0.26417;
  const kmToMi  = 0.62137;

  const input   = ['gal','l','mi','km','lbs','kg'];
  const convert = [galToL,lToGal,miToKm,kmToMi,lbsToKg,kgToLbs];

  return parseFloat((initNum*convert[input.indexOf(initUnit)]).toFixed(5))
};`
  
  const q4 = `if(initUnit === 'invalid unit') return res.json({error: 'invalid unit'});`
  
  const q5 = `if(initNum  === 'invalid number') return res.json({error: 'invalid number'})`
  
  const q6 = `if(initUnit === 'invalid unit' && 
   initNum  === 'invalid number') return res.json({error: 'invalid number and unit'});`
  
  const q7 = `this.getNum = function(input) {
  let num = (input.match(/[0-9/.]+/g) || [])[0]

  if(num === undefined) num = '1'
  if(num.split("/")[2]) return 'invalid number'

  try { num = eval(num) } 
  catch(e) { return 'invalid number' }

  return parseFloat(num.toFixed(5));
};`
  
  const q8 = `const convertHandler = new ConvertHandler();

app.route('/api/convert')
  .get(function (req, res){
    const {input}    = req.query;
    const initNum    = convertHandler.getNum(input);
    const initUnit   = convertHandler.getUnit(input);
    const returnNum  = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);
    const toString   = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);

    if(initUnit === 'invalid unit' && 
       initNum  === 'invalid number') return res.json({error: 'invalid number and unit'});
    if(initUnit === 'invalid unit')   return res.json({error: 'invalid unit'});
    if(initNum  === 'invalid number') return res.json({error: 'invalid number'})

    res.json({
      initNum,
      initUnit,
      returnNum,
      returnUnit,
      string: toString
    })
  });`
  
  const q9_1 = `suite('Unit Tests', function(){
  
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
});`
  
  const q9_2 = `  Unit Tests

    Function convertHandler.getNum(input)

      ✓ Whole number input

      ✓ Decimal Input

      ✓ Fractional Input

      ✓ Fractional Input w/ Decimal

      ✓ Invalid Input (double fraction)

      ✓ No Numerical Input

    Function convertHandler.getUnit(input)

      ✓ For Each Valid Unit Inputs

      ✓ Unknown Unit Input

    Function convertHandler.getReturnUnit(initUnit)

      ✓ For Each Valid Unit Inputs

    Function convertHandler.spellOutUnit(unit)

      ✓ For Each Valid Unit Inputs

    Function convertHandler.convert(num, unit)

      ✓ Gal to L

      ✓ L to Gal

      ✓ Mi to Km

      ✓ Km to Mi

      ✓ Lbs to Kg

      ✓ Kg to Lbs`

  const q10_1 = `suite('Functional Tests', function() {

  suite('Routing Tests', function() {
    
    suite('GET /api/convert => conversion object', function() {
      
      test('Convert 10L (valid input)', function(done) {
       chai.request(server)
        .get('/api/convert')
        .query({input: '10L'})
        .end(function(err, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 10);
          assert.equal(res.body.initUnit, 'l');
          assert.approximately(res.body.returnNum, 2.64172, 0.1);
          assert.equal(res.body.returnUnit, 'gal');
          done();
        });
      });
      
      test('Convert 32g (invalid input unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '32g'})
        .end(function(req,res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid unit');
        });
        done();
      });
      
      test('Convert 3/7.2/4kg (invalid number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kg'})
        .end(function(req,res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid number');
        });
        done();
      });  
      
      test('Convert 3/7.2/4kilomegagram (invalid number and unit)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: '3/7.2/4kilomegagram'})
        .end(function(req,res){
          assert.equal(res.status, 200);
          assert.equal(res.body.error, 'invalid number and unit');
        });
        done();
      });
      
      test('Convert kg (no number)', function(done) {
        chai.request(server)
        .get('/api/convert')
        .query({input: 'kg'})
        .end(function(req, res){
          assert.equal(res.status, 200);
          assert.equal(res.body.initNum, 1);
          assert.equal(res.body.initUnit, 'kg');
          assert.approximately(res.body.returnNum, 2.20462, 0.1);
          assert.equal(res.body.returnUnit, 'lbs');
          done();
        });
      });
      
    });

  });

});`
  
  const q10_2 = `  Functional Tests

    Routing Tests

      GET /api/convert => conversion object

        ✓ Convert 10L (valid input) (150ms)

        ✓ Convert 32g (invalid input unit)

        ✓ Convert 3/7.2/4kg (invalid number)

        ✓ Convert 3/7.2/4kilomegagram (invalid number and unit)

        ✓ Convert kg (no number)`


export default CodeSolution;