import React, { useState, useEffect, useCallback } from 'react';

function Count({ isTesting, onCountChange, onComplete }) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [target, setTarget] = useState(Math.floor(Math.random() * 10) + 1); // Initial target

  const getColor = (value) => {
    if (value <= 3) return 'red';
    if (value <= 7) return 'yellow';
    return 'green';
  };

  // Function to reset count and completion status without affecting target
  const resetCounters = useCallback(() => {
    setCount(0);
    setCompleted(false);
  }, []);

  useEffect(() => {
    if (isTesting) {
      resetCounters(); // Reset counters when isTesting changes
    }
  }, [isTesting, resetCounters]);

  useEffect(() => {
    let interval;
    if (isTesting && count < target && !completed) {
      interval = setInterval(() => {
        setCount(prevCount => {
          const newCount = prevCount + 1;
          if (newCount >= target) {
            clearInterval(interval);
            setCompleted(true);
            onComplete();
          }
          onCountChange(newCount, newCount >= target); // Notify parent component of count change
          return newCount;
        });
      }, 1000); // Increment every 1 second
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [count, completed, isTesting, target, onComplete, onCountChange]);

  return (
    <div>
      <p 
        className={`Test_Counter ${completed ? 'completed' : 'incomplete'}`} 
        style={{ color: getColor(count) }}
      >
        Count: {count}
      </p>
      {completed && <p>Test complete</p>}
    </div>
  );
}

export default Count;
