import React, { useState } from "react";
import './App.css'; // Import the updated CSS file

const initialTasks = {
  unplanned: [
    "Task 1",
    "Task 2",
    "Task 3",
    "Task 4",
    "Task 5",
    "Task 6",
    "Task 7",
    "Task 8",
    "Task 9",
    "Task 10"
  ],
  today: [],
  tomorrow: [],
  thisWeek: [],
  nextWeek: []
};

const columns = {
  unplanned: { name: "Unplanned", id: "unplanned" },
  today: { name: "Today", id: "today" },
  tomorrow: { name: "Tomorrow", id: "tomorrow" },
  thisWeek: { name: "This Week", id: "thisWeek" },
  nextWeek: { name: "Next Week", id: "nextWeek" }
};

const App = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [draggedTask, setDraggedTask] = useState(null);
  const [sourceColumn, setSourceColumn] = useState(null);

  // When dragging starts
  const handleDragStart = (task, column) => {
    setDraggedTask(task);
    setSourceColumn(column);
  };

  // When dragging over a droppable area
  const handleDragOver = (e) => {
    e.preventDefault(); // Needed to allow the drop
  };

  // When the task is dropped
  const handleDrop = (column) => {
    if (!draggedTask || sourceColumn === column) return;

    const sourceTasks = Array.from(tasks[sourceColumn]);
    const destinationTasks = Array.from(tasks[column]);

    // Remove the dragged task from source and add it to the destination
    const updatedSourceTasks = sourceTasks.filter((task) => task !== draggedTask);
    destinationTasks.push(draggedTask);

    setTasks({
      ...tasks,
      [sourceColumn]: updatedSourceTasks,
      [column]: destinationTasks
    });

    setDraggedTask(null);
    setSourceColumn(null);
  };

  return (
    <div className="App">
      <h2>Drag & Drop Task List</h2>
      <div className="columns-container">
        {Object.entries(columns).map(([key, column]) => (
          <div
            key={key}
            className="task-column"
            onDragOver={handleDragOver}
            onDrop={() => handleDrop(key)}
          >
            <h3>{column.name}</h3>
            {tasks[key].map((task, index) => (
              <div
                key={task}
                className="task-item"
                draggable="true"
                onDragStart={() => handleDragStart(task, key)}
              >
                {task}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
