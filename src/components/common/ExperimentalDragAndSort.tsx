// @ts-nocheck
import React, { useState } from "react";
function ExperimentalDragAndSort({ fields, setFields }) {
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (index) => {
    setDraggingItem(index);
  };

  const handleDragEnter = (index) => {
    const newList = [...fields];
    const draggingItemContent = newList[draggingItem];
    newList.splice(draggingItem, 1);
    newList.splice(index, 0, draggingItemContent);
    setDraggingItem(index);
    setFields(newList);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div className="w-full">
      {fields.map((item, index) => (
        <div
          key={item.id} // Assuming each item has a unique 'id' property
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          className="w-auto h-auto border-2 border-dashed border-gray-300 rounded-md p-2 m-2"
          style={{
            userSelect: "none",
            padding: "10px",
            margin: "10px",
            backgroundColor: draggingItem === index ? "lightgreen" : "white",
          }}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
}

export default ExperimentalDragAndSort;
