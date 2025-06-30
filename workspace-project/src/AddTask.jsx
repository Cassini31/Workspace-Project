import React, { useState } from 'react';

// Component to input a new task with name and duration (in hours)
const AddTask = ({ onAdd }) => {
  // State for task name input
  const [task, setTask] = useState('');
  // State for task hours input
  const [hours, setHours] = useState('');

  // Handle button click to add the task
  const handleAddClick = () => {
    const numericHours = parseFloat(hours); // Convert hours to number
    if (task && !isNaN(numericHours)) {
      // Trigger parent handler with new task object
      onAdd({ name: task, duration: `${numericHours} hrs` });
      // Clear input fields
      setTask('');
      setHours('');
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {/* Input for task name */}
      <input
        type="text"
        placeholder="Task name"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ alignItems: 'top' }}
      />
      {/* Input for task duration in hours */}
      <input
        type="number"
        placeholder="Hours"
        value={hours}
        onChange={(e) => setHours(e.target.value)}
        style={{ marginLeft: '8px', width: '60px', alignItems: 'top' }}
      />
      {/* Button to submit the task */}
      <button onClick={handleAddClick} style={{ marginLeft: '8px' }}>
        +
      </button>
    </div>
  );
};

export default AddTask;
