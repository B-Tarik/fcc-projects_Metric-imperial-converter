import React, {useState} from 'react';

import Output from './output.jsx';
import AppTitle from './common/appTitle.jsx';

const Convert = ({setResult}) => {

  const [input, setInput] = useState('');
  
  const handleSubmit = e => {
    e.preventDefault();
    
    fetch('/api/convert?input='+ input)
      .then(response => response.json())
      .then((data) => {
      
        setResult(JSON.stringify(data))
      
      })
      .catch(error => console.error('Error:', error));
  }
  
  return (
      <div className="submit-unit">
      
        <h3>Submit a measuring unit to convert</h3>
 
        <div className="form-container">
            <form className="submit-unit-form" onSubmit={handleSubmit}>
              <input className="form-unit" type="text" name="input" placeholder="3.1mi (gal, l, mi, km, lbs, kg)" onChange={e => setInput(e.target.value)}/>
              <input className="form-submit" type="submit" value="Convert"/>
            </form>
        </div>
      
      </div>
  );
  
}

export default Convert;