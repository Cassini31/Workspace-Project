import React from 'react';
import AddTask from './AddTask.jsx';

// Component to render a single calendar cell with its associated tasks and add functionality
const TaskCell = ({ tasks, onAddTask, onToggleTask }) => {
  return (
    <td>
      {/* Component for adding new tasks */}
      <AddTask onAdd={onAddTask} />

      {/* Render list of tasks with checkbox to toggle completion */}
      <div style={{ marginTop: '10px' }}>
        {tasks.map((task, i) => (
          <div
            key={i} // Unique key for React's reconciliation
            style={{
              display: 'flex', // Align checkbox and text in a row
              alignItems: 'top', // Vertically align items
              marginBottom: '6px', // Space between tasks
              textDecoration: task.completed ? 'line-through' : 'none' // Strike-through if task is completed
            }}
          >
            {/* Checkbox to mark task as done */}
            <input
              type="checkbox"
              checked={task.completed || false} // Defaults to unchecked if undefined
              onChange={() => onToggleTask(i)} // Trigger toggle handler from parent
              style={{ marginRight: '6px' }}
            />
            {/* Task name and duration display */}
            {task.name} {task.duration}
          </div>
        ))}
      </div>
    </td>
  );
};

export default TaskCell;