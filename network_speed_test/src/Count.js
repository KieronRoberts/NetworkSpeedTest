// Count.js
import React, { useState, useEffect } from 'react';

function Count({ isTesting, onCountChange, onComplete }) {
  const [count, setCount] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [target, setTarget] = useState(0);

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

  useEffect(() => {
    if (isTesting) {
      setCount(0); // Reset count
      setCompleted(false); // Reset completion status
      setTarget(Math.floor(Math.random() * 10) + 1); // Set random target between 1 and 10
    }
  }, [isTesting]);

  return (
    <div>
      <p className={`Test_Counter ${completed ? 'completed' : 'incomplete'}`}>Count: {count}</p>
      {completed && <p>Test complete</p>}
    </div>
  );
}

export default Count;
