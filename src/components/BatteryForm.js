import React, { useState } from 'react';

const BatteryForm = ({ onBatteryConfigChange }) => {
    const [megapack2XL, setMegapack2XL] = useState(0);
    const [megapack2, setMegapack2] = useState(0);
    const [megapack, setMegapack] = useState(0);
    const [powerpack, setPowerpack] = useState(0);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        switch (name) {
            case 'megapack2XL':
                setMegapack2XL(parseInt(value));
                break;
            case 'megapack2':
                setMegapack2(parseInt(value));
                break;
            case 'megapack':
                setMegapack(parseInt(value));
                break;
            case 'powerpack':
                setPowerpack(parseInt(value));
                break;
            default:
                break;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const batteryConfig = {
            megapack2XL,
            megapack2,
            megapack,
            powerpack,
        };
        onBatteryConfigChange(batteryConfig);
    };

    return (
        <form onSubmit={handleSubmit}>

            <ul className="list-group">
                <li className="list-group-item">
                    <div className='container-fluid'>
                        <label htmlFor="megapack2XL">Megapack 2XL:</label>
                        <input
                            type="number"
                            id="megapack2XL"
                            name="megapack2XL"
                            value={megapack2XL}
                            onChange={handleInputChange}
                            min="0" max="100"
                        />
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='container-fluid'>
                        <label htmlFor="megapack2">Megapack 2:</label>
                        <input
                            type="number"
                            id="megapack2"
                            name="megapack2"
                            value={megapack2}
                            onChange={handleInputChange}
                            min="0" max="100"
                        />
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='container-fluid'>
                        <label htmlFor="megapack">Megapack:</label>
                        <input
                            type="number"
                            id="megapack"
                            name="megapack"
                            value={megapack}
                            onChange={handleInputChange}
                            min="0" max="100"
                        />
                    </div>
                </li>
                <li className="list-group-item">
                    <div className='container-fluid'>
                        <label htmlFor="powerpack">Powerpack:</label>
                        <input
                            type="number"
                            id="powerpack"
                            name="powerpack"
                            value={powerpack}
                            onChange={handleInputChange}
                            min="0" max="100"
                        />
                    </div>
                </li>
            </ul>

            <button type="submit" className='btn btn-dark'>See Layout</button>
        </form>
    );
};

export default BatteryForm;
