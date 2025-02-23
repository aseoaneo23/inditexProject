import React, { useState } from 'react';
import { Slider } from 'antd';

const SimpleSlider = () => {
  // Estado para almacenar el valor actual del slider
  const [value, setValue] = useState(50);

  // Función para manejar el cambio de valor del slider
  const handleChange = (newValue) => {
    setValue(newValue);
    console.log("Valor del slider:", newValue);
    // Aquí puedes agregar la lógica que necesites, por ejemplo, enviar el valor a una API o actualizar otros estados.
  };

  return (
    <div className='slider-container'>
      <Slider 
        min={0}         // Valor mínimo
        max={100}       // Valor máximo
        value={value}   // Valor controlado del slider
        onChange={handleChange} // Función que se ejecuta al cambiar el valor
      />
    </div>
  );
};

export default SimpleSlider;
