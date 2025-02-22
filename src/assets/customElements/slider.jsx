
import React from "react";
import { Slider } from 'antd';

export const PriceSlider = () => {
    return (
        <div className="center-text">
            <p style={{paddingRight: '10px'}}>Price</p>
            <Slider className="slider" range={{ draggableTrack: true }} defaultValue={[0, 75]}/>
        </div>
    )
}
