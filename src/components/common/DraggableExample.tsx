import React, { useState } from "react";

function DraggableExample() {
  const [list, setList] = useState(["Item 1", "Item 2", "Item 3", "Item 4"]);
  const [draggingItem, setDraggingItem] = useState(null);

  const handleDragStart = (index: any) => {
    setDraggingItem(index);
  };

  const handleDragEnter = (index) => {
    const newList = [...list];
    const draggingItemContent = newList[draggingItem];
    newList.splice(draggingItem, 1);
    newList.splice(index, 0, draggingItemContent);
    setDraggingItem(index);
    setList(newList);
  };

  const handleDragEnd = () => {
    setDraggingItem(null);
  };

  return (
    <div>
      {list.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={() => handleDragStart(index)}
          onDragEnter={() => handleDragEnter(index)}
          onDragEnd={handleDragEnd}
          style={{
            userSelect: "none",
            padding: "10px",
            margin: "10px",
            backgroundColor: draggingItem === index ? "lightgreen" : "white",
          }}
        >
          {item}
        </div>
      ))}
    </div>
  );
}

export default DraggableExample;
