import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="homepage">
      <div className="buttons-container">
        {/* Use Link component for navigation */}
        <Link to="/homemidwife" className="button"><center>PHI</center></Link>
        <Link to="/homemidwife" className="button"><center>Midwife</center></Link>
        <Link to="/homemidwife" className="button"><center>Doctor</center></Link>
      </div>
    </div>
  );
}

export default HomePage;
