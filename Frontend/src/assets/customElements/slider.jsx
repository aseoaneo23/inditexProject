
import React from "react";
import { Slider } from 'antd';

export const PriceSlider = ({setPriceInterval}) => {

    const handleChange = (value) => {
        setPriceInterval(value);
    }

    return (
        <div className="center-text">
            <p style={{paddingRight: '10px'}}>Price</p>
            <Slider className="slider" range={{ draggableTrack: false }} defaultValue={[0, 15]} onChangeComplete={(value) =>{handleChange(value)}}/>
        </div>
    )
}
