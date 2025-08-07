import React, { useState, useEffect } from "react";

const getBubbleSortSteps = (arr) => {
  const steps = [];
  const a = [...arr];

  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < a.length - i - 1; j++) {
      steps.push({
        array: [...a],
        comparing: [j, j + 1],
        swapping: false,
      });

      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        steps.push({
          array: [...a],
          comparing: [j, j + 1],
          swapping: true,
        });
      }
    }
  }

  steps.push({ array: [...a], comparing: [], swapping: false });
  return steps;
};

const BubbleSortVisualizer = ({ inputArray }) => {
  const [array, setArray] = useState([...inputArray]);
  const [steps, setSteps] = useState([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);

  useEffect(() => {
    const generatedSteps = getBubbleSortSteps(inputArray);
    setSteps(generatedSteps);
    setCurrentStepIndex(0);
  }, [inputArray]);

  useEffect(() => {
    if (steps.length === 0 || currentStepIndex >= steps.length) return;

    const timer = setTimeout(() => {
      const step = steps[currentStepIndex];
      setArray(step.array);
      setCurrentStepIndex((prev) => prev + 1);
    }, 400); // delay between steps

    return () => clearTimeout(timer);
  }, [steps, currentStepIndex]);

  const currentStep = steps[currentStepIndex - 1] || {};
  const { comparing = [], swapping = false } = currentStep;

  return (
    <div className="flex justify-center items-end h-64 gap-1 p-4 bg-gray-100 border rounded">
      {array.map((value, index) => {
        let bgColor = "bg-blue-500";
        if (comparing.includes(index)) {
          bgColor = swapping ? "bg-red-500" : "bg-yellow-400";
        }

        return (
          <div
            key={index}
            className={`transition-all duration-300 w-6 ${bgColor}`}
            style={{
              height: `${value * 3}px`,
            }}
          />
        );
      })}
    </div>
  );
};

export default BubbleSortVisualizer;
