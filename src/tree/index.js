import React, { useEffect, useState } from "react";
import data from "./data.json";
import "./index.css";

// NOTE: This is the main component.
export default function Tree() {
  const [treeData, setTreeData] = useState(data);
  const [treeList, setTreeList] = useState([]);

  const handleAddChild = (parentId, childName) => {
    const childId = Date.now().toString();
    const updatedData = JSON.parse(JSON.stringify(treeData));

    updatedData[parentId].children.push(childId);
    updatedData[childId] = { name: childName, parent: parentId, children: [] };

    setTreeData(updatedData);
  };

  // NOTE: This renders a component for each node.
  function TreeNode({ nodeId, onAddChild }) {
    const [inputValue, setInputValue] = useState("");

    const nodeData = treeData[nodeId];

    const handleInputChange = (event) => {
      setInputValue(event.target.value);
    };

    const handleInputSubmit = (event) => {
      console.log("nodeData", nodeData);
      event.preventDefault();

      if (inputValue.trim() !== "") {
        onAddChild(nodeId, inputValue);
        setInputValue("");
      }
    };

    return (
      <li key={nodeId}>
        <div className="item-label">
          {nodeData?.name}
          <form onSubmit={handleInputSubmit}>
            <input
              type="text"
              value={inputValue}
              onChange={handleInputChange}
            />
          </form>
        </div>
        {nodeData.children?.length > 0 && (
          <ul>
            {nodeData?.children.map((childId) => (
              <TreeNode
                key={childId}
                nodeId={childId}
                onAddChild={onAddChild}
              />
            ))}
          </ul>
        )}
      </li>
    );
  }

  useEffect(() => {
    setTreeList(
      treeData.root.children.map((nodeId) => (
        <TreeNode
          key={nodeId}
          nodeId={nodeId}
          parentId={"root"}
          onAddChild={handleAddChild}
        />
      ))
    );
    // eslint-disable-next-line
  }, [treeData]);

  return (
    <div className="tree">
      <ul className="trunk">{treeList}</ul>
    </div>
  );
}
