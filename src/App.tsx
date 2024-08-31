/* eslint-disable */

import React from 'react';
import logo from './logo.svg';
import './App.css';
import ICBMSimulation from './Simulation/ICBMSimulation';
import ICBMInfo from './Simulation/Components/Info';

function App() {
  return (
    <div className="App container">
      <ICBMSimulation />
      <ICBMInfo />
    </div>
  );
}

export default App;
