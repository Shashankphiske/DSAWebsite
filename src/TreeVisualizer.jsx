import React, { useEffect, useState } from "react";

// Step 1: Define the tree structure
const treeData = {
  value: "A",
  left: {
    value: "B",
    left: { value: "D", left: null, right: null },
    right: { value: "E", left: null, right: null },
  },
  right: {
    value: "C",
    left: null,
    right: { value: "F", left: null, right: null },
  },
};

// Step 2: Inorder traversal (with steps)
function getInorderSteps(node, steps = []) {
  if (!node) return;
  getInorderSteps(node.left, steps);
  steps.push(node.value);
  getInorderSteps(node.right, steps);
  return steps;
}

const TreeVisualizer = () => {
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const traversalSteps = getInorderSteps(treeData);
    setSteps(traversalSteps);
    setCurrentStep(0);
  }, []);

  useEffect(() => {
    if (currentStep >= steps.length) return;
    const timer = setTimeout(() => {
      setHighlightedNode(steps[currentStep]);
      setCurrentStep((prev) => prev + 1);
    }, 800);

    return () => clearTimeout(timer);
  }, [steps, currentStep]);

  const renderNode = (value, left, right) => {
    const isHighlighted = value === highlightedNode;
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: isHighlighted ? "orange" : "#3b82f6",
            color: "white",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontWeight: "bold",
            fontSize: "18px",
            marginBottom: 10,
            transition: "background-color 0.4s",
          }}
        >
          {value}
        </div>
        {(left || right) && (
          <div style={{ display: "flex", gap: 40, marginTop: 10 }}>
            {left ? renderNode(left.value, left.left, left.right) : <div style={{ width: 50 }}></div>}
            {right ? renderNode(right.value, right.left, right.right) : <div style={{ width: 50 }}></div>}
          </div>
        )}
      </div>
    );
  };

  return (
    <div style={{ padding: 30 }}>
      <h2 style={{ fontSize: "24px", marginBottom: "20px", textAlign: "center" }}>
        Inorder Traversal Visualizer
      </h2>
      <div style={{ display: "flex", justifyContent: "center" }}>
        {renderNode(treeData.value, treeData.left, treeData.right)}
      </div>
    </div>
  );
};

export default TreeVisualizer;
