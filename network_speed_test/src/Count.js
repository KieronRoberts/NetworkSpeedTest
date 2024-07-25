import React, { useState, useEffect, useCallback } from 'react';

function Count({ isTesting, onCountChange, onComplete }) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [target, setTarget] = useState(Math.floor(Math.random() * 100) + 1); // Initial target

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
      }, 25); // Increment every 25 milliseconds
    }
    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, [count, completed, isTesting, target, onComplete, onCountChange]);

  return (
    <div>
      {isTesting && !completed && <p>Testing...</p>}
      {completed && <p>Test Complete</p>}
    </div>
  );
}

export default Count;
