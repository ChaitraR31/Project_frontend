import React, { useState } from 'react';
import { Button, Select, MenuItem } from '@mui/material';

const ColorModeSelect = ({ sx }) => {
  const [colorMode, setColorMode] = useState('light');

  const handleColorModeChange = (event) => {
    setColorMode(event.target.value);
    // Here you can apply logic to change the theme mode (light/dark) in the actual application
    console.log(`Color Mode changed to: ${event.target.value}`);
  };

  return (
    <div style={sx}>
      <Select
        value={colorMode}
        onChange={handleColorModeChange}
        displayEmpty
        sx={{
          backgroundColor: 'white',
          padding: '5px 15px',
          borderRadius: '5px',
        }}
      >
        <MenuItem value="light">Light Mode</MenuItem>
        <MenuItem value="dark">Dark Mode</MenuItem>
      </Select>
    </div>
  );
};

export default ColorModeSelect;
