import React from 'react';
import AddTask from './AddTask.jsx';

// Component to render a single calendar cell with its associated tasks and add functionality
const TaskCell = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  return (
    <td>
      {/* Component for adding new tasks */}
      <AddTask onAdd={onAddTask} />

      {/* Render list of tasks with checkbox to toggle completion */}
      <div style={{ marginTop: '10px' }}>
        {tasks.map((task, i) => (
          <div
            key={i}
            style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '6px',
              textDecoration: task.completed ? 'line-through' : 'none'
            }}
          >
            <input
              type="checkbox"
              checked={task.completed || false}
              onChange={() => onToggleTask(i)}
              style={{ marginRight: '6px' }}
            />
            {task.taskName} {typeof task.hours === 'number' ? `${task.hours} hrs` : ''}
            <button
              onClick={() => onDeleteTask(i)}
              style={{ marginLeft: '8px', fontSize: '0.9em', cursor: 'pointer' }}
              title="Delete task"
            >🗑️</button>
          </div>
        ))}
      </div>
    </td>
  );
};

export default TaskCell;