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

const SiteLayout = ({ batteryConfig }) => {

    const calculateLayoutWidth = () => {
        let layoutWidth = 0;
        for (const battery in batteryConfig) {
            layoutWidth +=
                batteryConfig[battery] *
                parseFloat(BatteryInfo[battery].dimension.split('FT x ')[0]);
        }
        const numTransformers = Math.floor(Object.values(batteryConfig).reduce((acc, val) => acc + val, 0) / 4);
        layoutWidth += numTransformers * parseFloat(BatteryInfo.transformer.dimension.split('FT x ')[0]);
        return layoutWidth;
    };

    const calculateLayoutHeight = () => {
        let layoutHeight = 0;
        for (const battery in batteryConfig) {
            layoutHeight = Math.max(
                layoutHeight,
                batteryConfig[battery] *
                parseFloat(BatteryInfo[battery].dimension.split('FT x ')[1])
            );
        }
        return layoutHeight;
    };

    const renderBatteries = () => {
        const batteries = [];
        let currentLine = 1;
        let currentWidth = 0;
        let currentHeight = 0;
        let batteryCount = 0;

        for (const battery in batteryConfig) {
            for (let i = 0; i < batteryConfig[battery]; i++) {
                const dimension = BatteryInfo[battery].dimension;
                const width = parseFloat(dimension.split('FT x ')[0]);
                const height = parseFloat(dimension.split('FT x ')[1]);

                // If adding the battery exceeds the width limit, move to the next line
                if (currentWidth + width > 100) {
                    currentWidth = 0;
                    currentHeight += height * 10 + 20; // Add extra margin for battery and transformer
                    currentLine++;
                }

                const batteryStyle = {
                    width: `${width * 10}px`,
                    height: `${height * 10}px`,
                    position: 'absolute',
                    left: `${currentWidth * 10}px`,
                    top: `${currentHeight}px`,
                };

                batteries.push(
                    <div
                        key={`${battery}-${i}`}
                        className="battery container"
                        style={batteryStyle}
                    >
                        <div className="battery-content">
                            <div className="battery-name">{battery}</div>
                            <div className="battery-dimension">{dimension}</div>
                        </div>
                    </div>
                );

                currentWidth += width;
                batteryCount++;

                // Insert a transformer after every 4 batteries
                if (batteryCount % 4 === 0) {
                    if (currentWidth + width > 100) {
                        currentWidth = 0;
                        currentHeight += height * 10 + 20; // Add extra margin for battery and transformer
                        currentLine++;
                    }
                    const transformerStyle = {
                        width: `${parseFloat(BatteryInfo.transformer.dimension.split('FT x ')[0]) * 10}px`,
                        height: `${parseFloat(BatteryInfo.transformer.dimension.split('FT x ')[1]) * 10}px`,
                        position: 'absolute',
                        left: `${currentWidth * 10}px`,
                        top: `${currentHeight}px`,
                    };

                    batteries.push(
                        <div
                            key={`transformer-${batteryCount}`}
                            className="transformer"
                            style={transformerStyle}
                        >
                            <div className="battery-content">
                                <div className="battery-name">Transformer</div>
                                <div className="battery-dimension">{BatteryInfo.transformer.dimension}</div>
                            </div>
                        </div>
                    );

                    currentWidth += parseFloat(BatteryInfo.transformer.dimension.split('FT x ')[0]);
                }
            }
        }

        return batteries;
    };

    return (
        <div className='layout-container container'>
            <h2>Site Layout</h2>
            <div className='container'>
                <div className="container battery-container" style={{ width: '100%', maxWidth: '100ft' }}>
                    <div
                        className="container layout"
                        style={{ width: `${calculateLayoutWidth()}px`, height: `${calculateLayoutHeight()}px` }}
                    >
                        {renderBatteries()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SiteLayout;
