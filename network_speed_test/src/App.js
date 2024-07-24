// App.js
import React, { useState } from 'react';
import './App.css';
import Speedometer from './Speedo'; // Import Speedometer component
import Count from './Count'; // Import Count component

function App() {
  const [isTesting, setIsTesting] = useState(false);
  const [counts, setCounts] = useState({ download: 0, upload: 0, ping: 0 });
  const [completedTests, setCompletedTests] = useState({ download: false, upload: false, ping: false });
  const [testKey, setTestKey] = useState({ download: 0, upload: 0, ping: 0 }); // Add keys to force re-mount

  const startTest = () => {
    setIsTesting(true); // Start the test
    setCompletedTests({ download: false, upload: false, ping: false }); // Reset all completion statuses
    setTestKey({ download: Math.random(), upload: Math.random(), ping: Math.random() }); // Change keys to force re-mount
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
      <header className="App-header">
        <h1>Network Speed Test</h1>
      </header>
      <main>
        <div className="grid-container">
          <div className="grid-item">
            <div className="Download_Test">
              <h2 className={`count ${completedTests.download ? 'completed' : 'incomplete'}`}>Download Test</h2>
              <div className="Download_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.download} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('download')}
                    onCountChange={(newCount, isComplete) => handleCountChange('download', newCount, isComplete)}
                  />
                </div>
                <div className="Speedometer">
                  <Speedometer value={counts.download} /> {/* Add Speedometer component */}
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="Upload_Test">
              <h2 className={`count ${completedTests.upload ? 'completed' : 'incomplete'}`}>Upload Test</h2>
              <div className="Upload_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.upload} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('upload')}
                    onCountChange={(newCount, isComplete) => handleCountChange('upload', newCount, isComplete)}
                  />
                </div>
                <div className="Speedometer">
                  <Speedometer value={counts.upload} /> {/* Add Speedometer component */}
                </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="Ping_Test">
              <h2 className={`count ${completedTests.ping ? 'completed' : 'incomplete'}`}>Ping Test</h2>
              <div className="Ping_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.ping} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('ping')}
                    onCountChange={(newCount, isComplete) => handleCountChange('ping', newCount, isComplete)}
                  />
                </div>
                <div className="Speedometer">
                  <Speedometer value={counts.ping} /> {/* Add Speedometer component */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="button" style={{ verticalAlign: 'middle' }} onClick={startTest}>
            <span>Test Network Connection Speed</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
