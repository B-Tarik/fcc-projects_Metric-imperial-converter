/*
*
*
*       Complete the API routing below
*
*
*/

'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  const convertHandler = new ConvertHandler();

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
    });
    
};
