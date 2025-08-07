import React, { useEffect, useRef, useState } from "react";

// Tree structure
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

// Inorder traversal (left, node, right)
const getInorderSteps = (node, steps = []) => {
  if (!node) return;
  getInorderSteps(node.left, steps);
  steps.push(node.value);
  getInorderSteps(node.right, steps);
  return steps;
};

const TreeVisualizerWithArrows = () => {
  const [highlightedNode, setHighlightedNode] = useState(null);
  const [steps, setSteps] = useState([]);
  const [currentStep, setCurrentStep] = useState(0);
  const nodeRefs = useRef({}); // store DOM refs for positioning

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

  // Helper to get positions of nodes
  const getLineCoords = (parentKey, childKey) => {
    const parent = nodeRefs.current[parentKey];
    const child = nodeRefs.current[childKey];
    if (!parent || !child) return null;

    const parentRect = parent.getBoundingClientRect();
    const childRect = child.getBoundingClientRect();
    const svgRect = nodeRefs.current.svg.getBoundingClientRect();

    return {
      x1: parentRect.left + parentRect.width / 2 - svgRect.left,
      y1: parentRect.top + parentRect.height / 2 - svgRect.top,
      x2: childRect.left + childRect.width / 2 - svgRect.left,
      y2: childRect.top + childRect.height / 2 - svgRect.top,
    };
  };

  // Recursive render
  const renderNode = (node, x, y, level, key) => {
    if (!node) return null;

    const offsetX = 120 / level;
    const verticalGap = 100;
    const nodeKey = key || node.value;

    const leftChild = node.left
      ? renderNode(node.left, x - offsetX, y + verticalGap, level + 1, `${nodeKey}-L`)
      : null;

    const rightChild = node.right
      ? renderNode(node.right, x + offsetX, y + verticalGap, level + 1, `${nodeKey}-R`)
      : null;

    return (
      <>
        <div
          ref={(el) => (nodeRefs.current[nodeKey] = el)}
          style={{
            position: "absolute",
            top: y,
            left: x,
            width: 50,
            height: 50,
            borderRadius: "50%",
            backgroundColor: highlightedNode === node.value ? "orange" : "#3b82f6",
            color: "white",
            fontWeight: "bold",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            transition: "background-color 0.4s",
          }}
        >
          {node.value}
        </div>
        {leftChild}
        {rightChild}
      </>
    );
  };

  // Generate all arrow lines
  const renderLines = () => {
    const lines = [];

    const drawLine = (parentKey, childKey) => {
      const coords = getLineCoords(parentKey, childKey);
      if (coords) {
        lines.push(
          <line
            key={`${parentKey}-${childKey}`}
            x1={coords.x1}
            y1={coords.y1}
            x2={coords.x2}
            y2={coords.y2}
            stroke="gray"
            strokeWidth="2"
            markerEnd="url(#arrowhead)"
          />
        );
      }
    };

    // Define connections manually using the same keys
    drawLine("A", "A-L"); // A → B
    drawLine("A", "A-R"); // A → C
    drawLine("A-L", "A-L-L"); // B → D
    drawLine("A-L", "A-L-R"); // B → E
    drawLine("A-R", "A-R-R"); // C → F

    return lines;
  };

  return (
    <div style={{ position: "relative", height: "400px", width: "100%", padding: "20px" }}>
      <svg
        ref={(el) => (nodeRefs.current.svg = el)}
        style={{ position: "absolute", width: "100%", height: "100%", zIndex: 0 }}
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="10"
            markerHeight="7"
            refX="10"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 10 3.5, 0 7" fill="gray" />
          </marker>
        </defs>
        {renderLines()}
      </svg>

      <div style={{ position: "relative", zIndex: 1 }}>
        {renderNode(treeData, window.innerWidth / 2 - 25, 10, 1, "A")}
      </div>
    </div>
  );
};

export default TreeVisualizerWithArrows;
