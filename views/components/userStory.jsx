import React from 'react';
import AppTitle from './common/appTitle.jsx';

const UserStory = () => {
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Metric-Imperial Converter</h1>} />
      
      <div className="user-story" >
        <h2>User Story</h2>
        <ol>
          
          <li>I will help prevent the client from trying to guess(sniff) the MIME type.</li>
          
          <li>I will prevent cross-site scripting (XSS) attacks.</li>
          
          <li>I can <b>GET</b> <code>/api/convert</code> with a single parameter containing an accepted number and unit and have it converted.</li>
          
          <li>I can convert 'gal' to 'L' and vice versa. <b>(1 gal to 3.78541 L)</b></li>
          
          <li>I can convert 'lbs' to 'kg' and vice versa. <b>(1 lbs to 0.453592 kg)</b></li> 
          
          <li>I can convert 'mi' to 'km' and vice versa. <b>(1 mi to 1.60934 km)</b></li>
          
          <li>If my unit of measurement is invalid, returned will be 'invalid unit'.</li>
          
          <li>If my number is invalid, returned with will 'invalid number'.</li>
          
          <li>If both are invalid, return will be 'invalid number and unit'.</li>
          
          <li>I can use fractions, decimals or both in my parameter(ie. 5, 1/2, 2.5/6), but if nothing is provided it will default to 1.</li>
          
          <li>My return will consist of the initNum, initUnit, returnNum, returnUnit, and string spelling out units in format <code>{'{'}initNum{'}'} {'{'}initial_Units{'}'} converts to {'{'}returnNum{'}'} {'{'}return_Units{'}'}</code> with the result rounded to 5 decimals.</li>
          
          <li>All 16 unit tests are complete and passing.</li>
          
          <li>All 5 functional tests are complete and passing.</li>

        </ol>
      </div>      
      
    </div>
  );
}

export default UserStory;