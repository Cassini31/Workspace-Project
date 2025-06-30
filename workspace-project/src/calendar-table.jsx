import React, { useState } from 'react';
import CalendarWeekHeader from './CalendarWeekHeader.jsx';
import TaskCell from './TaskCell.jsx';
import AddPartnerInput from './AddPartnerInput.jsx';

// Main component that renders the calendar table
const CalendarTable = () => {
  // Get current date
  const today = new Date();
  // Get the index of the current day (0 = Sunday, 1 = Monday, etc.)
  const currentDayIndex = today.getDay();
  // Format to return the short name of the day (e.g., Mon, Tue)
  const dayFormat = { weekday: 'short' };

  // State for list of owners (e.g., team members)
  const [owners, setOwners] = useState([]);
  // State for tracking new team member input
  const [newOwners, setNewOwners] = useState('');
  // State for tasks mapped per team member and per day
  const [tasks, setTasks] = useState({});

  // Function to return the labels for each day in the current week
  const getWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(today); // Safe copy of today
      day.setDate(today.getDate() - currentDayIndex + i); // Shift to get day of week
      const dayName = day.toLocaleDateString(undefined, dayFormat); // Get short name (e.g., Mon)
      const dateNum = day.getDate(); // Get numeric date (e.g., 8)
      weekDays.push(`${dayName} ${dateNum}`); // Combine for label
    }
    return weekDays;
  };

  // Store the generated weekday headers
  const weekHeaders = getWeekDays();

  // Function to add new team member
  const handleAddOwners = () => {
    const trimmed = newOwners.trim(); // Remove leading/trailing spaces
    if (!trimmed || owners.includes(trimmed)) return; // Avoid duplicates and empty names
    setOwners([...owners, trimmed]); // Add new team member to list
    setTasks({ ...tasks, [trimmed]: Array.from({ length: 7 }, () => []) }); // Initialize 7-day task array
    setNewOwners(''); // Clear input field
  };

  // Function to add a task to a specific owner and day
  const handleAddTask = (owner, dayIndex, newTask) => {
    setTasks((prev) => ({
      ...prev,
      [owner]: prev[owner].map((dayTasks, i) =>
        i === dayIndex ? [...dayTasks, newTask] : dayTasks // Add to the correct day
      )
    }));
  };

  // Function to toggle a task's completion status
  const handleToggleTask = (owner, dayIndex, taskIndex) => {
    setTasks((prev) => ({
      ...prev,
      [owner]: prev[owner].map((dayTasks, i) =>
        i === dayIndex
          ? dayTasks.map((task, j) =>
              j === taskIndex ? { ...task, completed: !task.completed } : task
            )
          : dayTasks
      )
    }));
  };

  return (
    <div>
      {/* Render calendar table */}
      <table border="1" cellSpacing="0" cellPadding="30">
        <thead>
          <tr>
            <th>Partners</th>
            {/* Render weekday headers */}
            <CalendarWeekHeader headers={weekHeaders} />
          </tr>
        </thead>
        <tbody>
          {/* Loop through each team member */}
          {owners.map((owner, ownerIndex) => (
            <tr key={ownerIndex}>
              {/* Display team member's name */}
              <td>{owner}</td>
              {/* Render task cell for each day of the week */}
              {Array(7)
                .fill(0)
                .map((_, dayIndex) => (
                  <TaskCell
                    key={dayIndex}
                    tasks={tasks[owner]?.[dayIndex] || []} // Default to empty array
                    onAddTask={(newTask) => handleAddTask(owner, dayIndex, newTask)}
                    onToggleTask={(taskIndex) => handleToggleTask(owner, dayIndex, taskIndex)}
                  />
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input field to add new owners */}
      <AddPartnerInput
        value={newOwners}
        onChange={setNewOwners}
        onAdd={handleAddOwners}
      />
    </div>
  );
};

export default CalendarTable;