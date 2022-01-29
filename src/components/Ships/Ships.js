import React from 'react';
import './Ships.css';

const Ships = ({ ship }) => {
    const { name, image, home_port } = ship;

    return (
        <div className='ship_box'>
            <div className='image_box'>
                <img style={{ width: '100%' }} src={image} alt={name} />
            </div>
            <div className='ship_content'>
                <h2>{name}</h2>
                <h2>PORT: <span>{home_port}</span></h2>
            </div>
        </div>
    );
};

export default Ships;