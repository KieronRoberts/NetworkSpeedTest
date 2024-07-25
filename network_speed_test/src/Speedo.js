import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import './Speedo.css';

const Speedometer = ({ value }) => {
  const [gaugeValue, setGaugeValue] = useState(value);

  useEffect(() => {
    setGaugeValue(value);
  }, [value]);

  return (
    <div className="speedometer">
      <Plot
        data={[
          {
            type: 'indicator',
            mode: 'gauge+number',
            value: gaugeValue,
            domain: { x: [0, 1], y: [0, 1] },
            gauge: {
              axis: { range: [0, 100], tickwidth: 1, tickcolor: '#000' },
              borderwidth: 2,
              bordercolor: 'black',
              bar: { color: '#7de0e3' },
              bgcolor: '#868686',
              steps: [
                { range: [0, 25], color: '#BF211E' },
                { range: [25, 75], color: '#D98324' },
                { range: [75, 100], color: '#1C7C54' }
              ],
              threshold: {
                line: { color: '#7de0e3', width: 3 },
                thickness: 0.75,
                value: gaugeValue
              }
            }
          }
        ]}
        layout={{
          width: 450,
          height: 400,
          margin: { t: 0, b: 0 },
          paper_bgcolor: 'rgba(0,0,0,0)',  // Transparent background
          plot_bgcolor: 'rgba(0,0,0,0)',   // Transparent plot area
          font: { color: '#D9D9D9' }
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
};

export default Speedometer;
