import React from 'react';
import AddTask from './AddTask.jsx';

const TaskCell = ({ tasks, onAddTask }) => {
  return (
    <td>
      <AddTask onAdd={onAddTask} />
      <ul>
        {tasks.map((task, i) => (
          <li key={i}>
            {task.name} {task.duration}
          </li>
        ))}
      </ul>
    </td>
  );
};

export default TaskCell;
