import React, { useState } from 'react';

// Component to input a new task with name and duration (in hours)
const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');        // State for task name input
  const [hours, setHours] = useState('');      // State for hours input
  const [showInputs, setShowInputs] = useState(false); // State to toggle visibility

  // Handles showing input fields
  const handleShowInputs = () => {
    setShowInputs(true);
  };

  // Handles submission of task
  const handleAddClick = () => {
    const numericHours = parseFloat(hours);
    if (task && !isNaN(numericHours)) {
      onAdd({ name: task, duration: `${numericHours} hrs` });
      setTask('');
      setHours('');
      setShowInputs(false); // Optionally hide after submit
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
      {!showInputs ? (
        // Only show "+" button initially
        <button onClick={handleShowInputs}>+</button>
      ) : (
        // Show input fields and add button once toggled
        <>
          <input
            type="text"
            placeholder="Task name"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          <input
            type="number"
            placeholder="Hours"
            value={hours}
            onChange={(e) => setHours(e.target.value)}
            style={{ marginLeft: '8px', width: '60px' }}
          />
          <button onClick={handleAddClick} style={{ marginLeft: '8px' }}>
            +
          </button>
        </>
      )}
    </div>
  );
};

export default AddTask;