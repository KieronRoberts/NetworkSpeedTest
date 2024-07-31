import React, { useState } from 'react';
import './App.css';
import Speedometer from './Speedo'; // Import Speedometer component
import Count from './Count'; // Import Count component

function App() {
  const [isTesting, setIsTesting] = useState(false);
  const [counts, setCounts] = useState({ download: 0, upload: 0, ping: 0, jitter: 0, latency: 0 });
  const [completedTests, setCompletedTests] = useState({ download: false, upload: false, ping: false, jitter: false, latency: false });
  const [testKey, setTestKey] = useState({ download: 0, upload: 0, ping: 0, jitter: 0, latency: 0 }); // Keys to force re-mount
  const [color, setColor] = useState('black'); // Default color for counts
  const [selectedIP, setSelectedIP] = useState('http://ip1.example.com');

  // Function to start the tests
  const startTest = async () => {
    setIsTesting(true); // Start the test
    setCompletedTests({ download: false, upload: false, ping: false, jitter: false, latency: false }); // Reset all completion statuses
    setTestKey({ download: Math.random(), upload: Math.random(), ping: Math.random(), jitter: Math.random(), latency: Math.random() }); // Change keys to force re-mount

    // Conduct the network tests
    await testNetworkSpeeds();
  };

  // Function to handle reset
  const handleReset = () => {
    setCounts({ download: 0, upload: 0, ping: 0, jitter: 0, latency: 0 }); // Reset counts
    setCompletedTests({ download: false, upload: false, ping: false, jitter: false, latency: false }); // Reset completion statuses
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

  // Function to test network speeds and update counts
  const testNetworkSpeeds = async () => {
    try {
      const pingResult = await testPing(selectedIP);
      setCounts(prevCounts => ({ ...prevCounts, ping: pingResult }));
      handleTestComplete('ping');

      const downloadSpeed = await testDownloadSpeed(selectedIP);
      setCounts(prevCounts => ({ ...prevCounts, download: downloadSpeed }));
      handleTestComplete('download');

      const uploadSpeed = await testUploadSpeed(selectedIP);
      setCounts(prevCounts => ({ ...prevCounts, upload: uploadSpeed }));
      handleTestComplete('upload');

      const jitter = await testJitter(selectedIP);
      setCounts(prevCounts => ({ ...prevCounts, jitter: jitter }));
      handleTestComplete('jitter');

      const latency = await testLatency(selectedIP);
      setCounts(prevCounts => ({ ...prevCounts, latency: latency }));
      handleTestComplete('latency');
    } catch (error) {
      console.error('Error testing network speeds:', error);
    } finally {
      setIsTesting(false);
    }
  };

  // Mock function to test ping to a selected IP address
  const testPing = async (ip) => {
    try {
      const startTime = performance.now();
      await fetch(ip, { mode: 'no-cors' }); // Note: no-cors mode is used for simplicity
      const endTime = performance.now();
      return (endTime - startTime).toFixed(2);
    } catch (error) {
      return 'Error';
    }
  };

  // Mock function to test download speed
  const testDownloadSpeed = async (ip) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((Math.random() * 100).toFixed(2)); // Return a random value for download speed
      }, 1000);
    });
  };

  // Mock function to test upload speed
  const testUploadSpeed = async (ip) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((Math.random() * 50).toFixed(2)); // Return a random value for upload speed
      }, 1000);
    });
  };

  // Mock function to test jitter
  const testJitter = async (ip) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((Math.random() * 20).toFixed(2)); // Return a random value for jitter
      }, 1000);
    });
  };

  // Mock function to test latency
  const testLatency = async (ip) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve((Math.random() * 100).toFixed(2)); // Return a random value for latency
      }, 1000);
    });
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
                className={`count ${completedTests.latency ? 'completed' : 'incomplete'}`} 
                title="Measure the overall delay in network communication."
              >
                Latency Test
              </h4>
              <div className="Latency_Result">
                <div className="Test-Status">
                  <Count
                    key={testKey.latency} // Use unique key to force re-mount
                    isTesting={isTesting}
                    onComplete={() => handleTestComplete('latency')}
                    onCountChange={(newCount, isComplete) => handleCountChange('latency', newCount, isComplete)}
                    color={color} // Pass color prop to Count component
                  />
                </div>
                <div className="Count-Value"> {/* Display the count value */}
                  {counts.latency} ms
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* IP Selection */}
        <div className="ip-selection">
          <h3>Select IP Address:</h3>
          <select onChange={(e) => setSelectedIP(e.target.value)} value={selectedIP}>
            <option value="http://ip1.example.com">IP Address 1</option>
            <option value="http://ip2.example.com">IP Address 2</option>
            <option value="http://ip3.example.com">IP Address 3</option>
          </select>
        </div>

        {/* Buttons */}
        <div className="button-container">
          <button className="button" onClick={startTest} disabled={isTesting}>
            <span>Start Test</span>
          </button>
          <button className="button" onClick={handleReset}>
            <span>Reset</span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
