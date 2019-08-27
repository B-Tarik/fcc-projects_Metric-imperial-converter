import React, {useState} from 'react';

import Convert from './convert.jsx';
import Output from './output.jsx';
import AppTitle from './common/appTitle.jsx';

const Home = ({history}) => {
  
  const [result, setResult] = useState('');
  
  return (
    <div className="inner-container">
      
      <AppTitle title={<h1>Metric-Imperial Converter</h1>} />
      <Convert setResult={setResult} />
      <Output result={result} />
      
    </div>
  );
  
}

export default Home;