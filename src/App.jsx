import React from "react";
import BubbleSortVisualizer from "./BubbleSortVisualizer";

function App() {
  const sampleArray = [10, 40, 20, 30, 50, 25, 5];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white">
      <h1 className="text-3xl font-bold mb-6">Bubble Sort Visualizer</h1>
      <BubbleSortVisualizer inputArray={sampleArray} />
    </div>
  );
}

export default App;
