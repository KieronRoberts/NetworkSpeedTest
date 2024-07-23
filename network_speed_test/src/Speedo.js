// Speedometer.js
import React from 'react';
import './Speedo.css'; // For additional styling if needed

const Speedometer = ({ value }) => {
  // Calculate the angle of the indicator based on the count (0-10)
  // 0 value starts at 9 o'clock, 10 value ends at 3 o'clock
  const angle = (value / 10) * 180; // Map count (0-10) to angle (0 to 180 degrees)

  // Calculate the end coordinates of the indicator line
  const x2 = 50 + 40 * Math.cos(((angle - 180) * Math.PI) / 180); // Adjust for 9 o'clock start
  const y2 = 50 + 40 * Math.sin(((angle - 180) * Math.PI) / 180); // Adjust for 9 o'clock start

  return (
    <div className="speedometer">
      <svg viewBox="0 0 100 50" className="speedometer-svg">
        <path
          className="speedometer-arc"
          d="M10,40 A40,40 0 0,1 90,40"
        />
        <line
          className="speedometer-indicator"
          x1="50"
          y1="50"
          x2={x2}
          y2={y2}
        />
      </svg>
      <div className="speedometer-label">
        {value}
      </div>
    </div>
  );
};

export default Speedometer;
