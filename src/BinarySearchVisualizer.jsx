import React, { useState, useEffect } from 'react';

const BinarySearchVisualizer = () => {
  const [array, setArray] = useState([1, 3, 5, 7, 9, 11, 13, 14, 15, 19, 21, 25, 40]);
  const [target, setTarget] = useState(25);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  // Generate steps when target or array changes
  useEffect(() => {
    const newSteps = binarySearch(array, target);
    setSteps(newSteps);
    setCurrentStepIndex(0);
  }, [array, target]);

  // Animate steps
  useEffect(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length) return;

    const timer = setTimeout(() => {
      setCurrentStepIndex((prev) => prev + 1);
    }, 2000);

    return () => clearTimeout(timer);
  }, [steps, currentStepIndex]);

  const currentStep = steps[currentStepIndex - 1]; // -1 because index starts at 0 after first step

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h2>🔍 Binary Search Visualizer</h2>

      <div style={{ margin: '10px 0' }}>
        <label>Target: </label>
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
        />
        <button onClick={() => {
          const newSteps = binarySearch(array, target);
          setSteps(newSteps);
          setCurrentStepIndex(0);
        }}>
          Start
        </button>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
        {array.map((value, index) => {
          const isLeft = currentStep?.left === index;
          const isRight = currentStep?.right === index;
          const isMid = currentStep?.mid === index;
          const isFound = currentStep?.found && isMid;

          return (
            <div
              key={index}
              style={{
                width: '50px',
                height: '50px',
                lineHeight: '50px',
                textAlign: 'center',
                border: '2px solid black',
                backgroundColor: isFound
                  ? 'green'
                  : isMid
                  ? 'orange'
                  : isLeft
                  ? 'lightblue'
                  : isRight
                  ? 'lightpink'
                  : 'white',
              }}
            >
              {value}
            </div>
          );
        })}
      </div>

      {currentStep && (
        <div style={{ marginTop: '20px' }}>
          <p>Left Index: {currentStep.left}</p>
          <p>Right Index: {currentStep.right}</p>
          <p>Mid Index: {currentStep.mid}</p>
          {currentStep.found && <p style={{ color: 'green' }}>✅ Found at index {currentStep.mid}</p>}
        </div>
      )}
    </div>
  );
};

// Binary search function that records steps
function binarySearch(arr, target) {
  const steps = [];
  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      array: [...arr],
      left,
      right,
      mid,
      found: arr[mid] === target,
    });

    if (arr[mid] === target) {
      break;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }

  return steps;
}

export default BinarySearchVisualizer;
