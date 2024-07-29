import React, { useState } from 'react';
import './App.css';
import Speedometer from './Speedo'; // Import Speedometer component
import Count from './Count'; // Import Count component

function App() {
  const [isTesting, setIsTesting] = useState(false);
  const [counts, setCounts] = useState({ download: 0, upload: 0, ping: 0, jitter: 0, Latency: 0 });
  const [completedTests, setCompletedTests] = useState({ download: false, upload: false, ping: false, jitter: false, Latency: false });
  const [testKey, setTestKey] = useState({ download: 0, upload: 0, ping: 0, jitter: 0, Latency: 0 }); // Keys to force re-mount
  const [color, setColor] = useState('black'); // Default color for counts

  // Function to start the tests
  const startTest = () => {
    setIsTesting(true); // Start the test
    setCompletedTests({ download: false, upload: false, ping: false, jitter: false, Latency: false }); // Reset all completion statuses
    setTestKey({ download: Math.random(), upload: Math.random(), ping: Math.random(), jitter: Math.random(), Latency: Math.random() }); // Change keys to force re-mount
  };

  // Function to handle reset
  const handleReset = () => {
    setCounts({ download: 0, upload: 0, ping: 0, jitter: 0, Latency: 0 }); // Reset counts
    setCompletedTests({ download: false, upload: false, ping: false, jitter: false, Latency: false }); // Reset completion statuses
    // Change color to a new random color
    const newColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    setColor(newColor);
  };

  const handleTestComplete = (testType) => {
    setCompletedTests(prevState => ({ ...prevState, [testType]: true }));
  };

  const handleCountChange = (testType, newCount, isComplete) => {
    setCounts(prevState => ({ ...prevState, [testType]: newCount }));
    if (isComplete) {
      handleTestComplete(testType);
    }
  };

  return (
    <div className="App">
      {/* Header */}
      <header className="App-header">
        <img src="Logo.png" alt="Logo" className="App-logo" />
        <h1 className="App-title"> Network Speed Test</h1>
      </header>


      {/* Main */}
      <main>
        <div className="grid-container">

          {/* Download Test */}
          <div className="grid-item">
            <div className="Download_Test">
              <h2 
                className={`count ${completedTests.download ? 'completed' : 'incomplete'}`} 
                title="Test the download speed of your network."
              >
                Download Test
              </h2>
              <div className="Download_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.download} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('download')}
                    onCountChange={(newCount, isComplete) => handleCountChange('download', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Speedometer">
                  <Speedometer value={counts.download} /> {/* Add Speedometer component */}
                </div>
              </div>
            </div>
          </div>

          {/* Upload Test */}
          <div className="grid-item">
            <div className="Upload_Test">
              <h2 
                className={`count ${completedTests.upload ? 'completed' : 'incomplete'}`} 
                title="Test the upload speed of your network."
              >
                Upload Test
              </h2>
              <div className="Upload_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.upload} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('upload')}
                    onCountChange={(newCount, isComplete) => handleCountChange('upload', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Speedometer">
                  <Speedometer value={counts.upload} /> {/* Add Speedometer component */}
                </div>
              </div>
            </div>
          </div>

          {/* Ping, Jitter, and Latency Tests */}
          <div className="grid-item vertical-tests">

            {/* Ping Test */}
            <div className="Ping_Test">
              <h4 
                className={`count ${completedTests.ping ? 'completed' : 'incomplete'}`} 
                title="Measure the network latency in milliseconds."
              >
                Ping Test
              </h4>
              <div className="Ping_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.ping} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('ping')}
                    onCountChange={(newCount, isComplete) => handleCountChange('ping', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Count-Value"> {/* Display the count value */}
                  {counts.ping} ms
                </div>
              </div>
            </div>

            {/* Jitter Test */}
            <div className="Jitter_Test">
              <h4 
                className={`count ${completedTests.jitter ? 'completed' : 'incomplete'}`} 
                title="Measure the variation in network latency."
              >
                Jitter Test
              </h4>
              <div className="Jitter_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.jitter} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('jitter')}
                    onCountChange={(newCount, isComplete) => handleCountChange('jitter', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Count-Value"> {/* Display the count value */}
                  {counts.jitter} ms
                </div>
              </div>
            </div>

            {/* Latency Test */}
            <div className="Latency_Test">
              <h4 
                className={`count ${completedTests.Latency ? 'completed' : 'incomplete'}`} 
                title="Measure the overall delay in network communication."
              >
                Latency Test
              </h4>
              <div className="Latency_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.Latency} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('Latency')}
                    onCountChange={(newCount, isComplete) => handleCountChange('Latency', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Count-Value"> {/* Display the count value */}
                  {counts.Latency} ms
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Buttons */}
        <div className="button-container">
          
          {/* Test Network Connection Speed Button */}
          <button className="button" style={{ verticalAlign: 'middle' }} onClick={startTest}>
            <span>Test Network Connection Speed</span>
          </button>
          {/* Reset Test Button */}
          <button className="button" style={{ verticalAlign: 'middle' }} onClick={handleReset}>
            <span>Reset Test</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
