import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
const [count, setCount] = useState(0);
const [completed, setCompleted] = useState(false);

useEffect(() => {
  let interval;
  if (count < 10 && !completed) {
    interval = setInterval(() => {
      setCount(prevCount => {
        if (prevCount < 9) {
          return prevCount + 1;
        } else {
          clearInterval(interval);
          setCompleted(true);
          return prevCount + 1;
        }
      });
    }, 1000); // Increment every 1 second
  }
  return () => clearInterval(interval); // Cleanup interval on component unmount
}, [count, completed]);

const startTest = () => {
  setCount(0); // Reset count
  setCompleted(false); // Reset completion status
};

const statusClass = completed ? 'completed' : 'incomplete';

  return (
    <div className="App">
      <header className="App-header">
        <h1>Network Speed Test</h1>
      </header>
      <main>
        <div className="grid-container">
          <div className="grid-item">
            <div className="Download_Test">
              <h2 className={`count ${statusClass}`}>Download Test</h2>
              <div className="Download_Result">
                <div className="Test-Status">
                <p className="Test_Counter">
                  Count: {count}
                  </p>
                {
                completed && <p>
                  Test complete
                  </p>
                  }
                 </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="Upload_Test">
              <h2 className={`count ${statusClass}`}>Upload Test</h2>
              <div className="Upload_Result">
                <div className="Test-Status">
                <p className="Test_Counter">
                  Count: {count}
                  </p>
                {
                completed && <p>
                  Test complete
                  </p>
                  }
                 </div>
              </div>
            </div>
          </div>
          <div className="grid-item">
            <div className="Ping_Test">
              <h2 className={`count ${statusClass}`}>Ping Test</h2>
              <div className="Upload_Result">
                <div className="Test-Status">
                <p className="Test_Counter">
                  Count: {count}
                  </p>
                {
                completed && <p>
                  Test complete
                  </p>
                  }
                 </div>
              </div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="button" style={{verticalAlign: 'middle'}} onClick={startTest}>  
            <span>
              Test Network Connection Speed 
            </span>
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
