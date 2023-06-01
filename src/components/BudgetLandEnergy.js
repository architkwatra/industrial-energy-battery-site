import React from 'react';

const BatteryInfo = {
  megapack2XL: {
    dimension: '40FT x 10FT',
    energy: '4 MWh',
    cost: '120000',
    releaseDate: '2022',
  },
  megapack2: {
    dimension: '30FT x 10FT',
    energy: '3 MWh',
    cost: '80000',
    releaseDate: '2021',
  },
  megapack: {
    dimension: '30FT x 10FT',
    energy: '2 MWh',
    cost: '50000',
    releaseDate: '2005',
  },
  powerpack: {
    dimension: '10FT x 10FT',
    energy: '1 MWh',
    cost: '20000',
    releaseDate: '2000',
  },
  transformer: {
    dimension: '10FT x 10FT',
    energy: '-0.25 MWh',
    cost: '10000',
  },
};

const BudgetLandEnergy = ({ batteryConfig }) => {
  const calculateBudget = () => {
    let budget = 0;
    let count = 0;
    for (const battery in batteryConfig) {
      budget += batteryConfig[battery] * parseFloat(BatteryInfo[battery].cost);
      count += batteryConfig[battery];
    }
    budget += Math.floor(count/4) * parseFloat(BatteryInfo["transformer"].cost);
    return budget.toLocaleString();
  };

  const calculateLandSize = () => {
    let landSize = 0, count = 0;
    for (const battery in batteryConfig) {
      landSize +=
        batteryConfig[battery] *
        (parseFloat(BatteryInfo[battery].dimension.split(' x ')[0]) *
          parseFloat(BatteryInfo[battery].dimension.split(' x ')[1]));
        count += batteryConfig[battery];
    }
    landSize += Math.floor(count/4) * (parseFloat(BatteryInfo["transformer"].dimension.split(' x ')[0]) *
    parseFloat(BatteryInfo["transformer"].dimension.split(' x ')[1]));
    return landSize.toFixed(2);
  };

  const calculateEnergy = () => {
    let energy = 0, count = 0;
    for (const battery in batteryConfig) {
      energy += batteryConfig[battery] * parseFloat(BatteryInfo[battery].energy);
      count += batteryConfig[battery];
    }
    energy += Math.floor(count/4) * parseFloat(BatteryInfo["transformer"].energy);
    return energy.toLocaleString();
  };

  return (
    <div>
      <h2>Budget, Land Size, and Required Energy</h2>
      <p>
        Total Budget: <strong>${calculateBudget()}</strong>
      </p>
      <p>
        Land Size: <strong>{calculateLandSize()} sq ft</strong>
      </p>
      <p>
        Required Energy: <strong>{calculateEnergy()} MWh</strong>
      </p>
    </div>
  );
};

export default BudgetLandEnergy;
