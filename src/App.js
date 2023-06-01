import React, { useState } from 'react';
import BatteryForm from './components/BatteryForm';
import BudgetLandEnergy from './components/BudgetLandEnergy';
import SiteLayout from './components/SiteLayout';

import './App.css';

function App() {

  const [batteryConfig, setBatteryConfig] = useState({
    megapack2XL: 0,
    megapack2: 0,
    megapack: 0,
    powerpack: 0,
  });

  const handleBatteryConfigChange = (newBatteryConfig) => {
    setBatteryConfig(newBatteryConfig);
  };

  return (
    <div className="container py-4">
      <h1 className="mb-4">Industrial Energy Battery Site</h1>
      <div className="mb-4">
        <BatteryForm onBatteryConfigChange={handleBatteryConfigChange} />
      </div>
      <div className="mb-4">
        <BudgetLandEnergy batteryConfig={batteryConfig} />
      </div>
      <div className="container">
        <div className="layout-border">
          <div className="row">
            <SiteLayout batteryConfig={batteryConfig} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
