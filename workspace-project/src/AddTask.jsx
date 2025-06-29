import React, { useState } from 'react';

const AddTask = ({ onAdd }) => {
  const [task, setTask] = useState('');
  const [hours, setHours] = useState('');

  const handleAddClick = () => {
    const numericHours = parseFloat(hours);
    if (task && !isNaN(numericHours)) {
      onAdd({ name: task, duration: `${numericHours} hrs` });
      setTask('');
      setHours('');
    }
  };

  return (
    <div style={{ marginTop: '10px' }}>
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
    </div>
  );
};

export default AddTask;
