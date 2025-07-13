import React, { useState } from 'react'; // Importing React and the useState hook
import CurrentMonthandYear from './current-month-and-year.jsx'; // Component to display current month and year
import CurrentWeekNumber from './current-week-number.jsx'; // Component to display current week number
import CalendarWeekHeader from './CalendarWeekHeader.jsx'; // Component to render week header cells
import TaskCell from './TaskCell.jsx'; // Component to manage tasks per day and owner
import AddPartnerInput from './AddPartnerInput.jsx'; // Component to input and add a new team member

// Main calendar table component
const CalendarTable = ({ onStartDateChange }) => {
  // State to track the list of owners (team members)
  const [owners, setOwners] = useState([]);

  // State to handle the input text for a new owner
  const [newOwners, setNewOwners] = useState('');

  // State to store tasks per owner and per day (2D structure: owner -> day -> task[])
  const [tasks, setTasks] = useState({});

  // State to track the first visible day (start of the current week view)
  const [startDate, setStartDate] = useState(() => {
    const today = new Date(); // Get today's date
    const firstDayOfWeek = new Date(today); // Create a copy
    firstDayOfWeek.setDate(today.getDate() - today.getDay()); // Set to Sunday of current week
    return firstDayOfWeek;
  });

  const dayFormat = { weekday: 'short' }; // Format for displaying short day name (e.g., "Sun")

  // Function to generate array of 7-day labels starting from startDate
  const getWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate); // Create a fresh date copy
      day.setDate(startDate.getDate() + i); // Offset by index to get each day
      const dayName = day.toLocaleDateString(undefined, dayFormat); // Get day name (e.g., "Mon")
      const dateNum = day.getDate(); // Get day of month
      weekDays.push(`${dayName} ${dateNum}`); // Combine for header label
    }
    return weekDays;
  };

  const weekHeaders = getWeekDays(); // Generate week headers for current view

  // Add a new owner (team member) if input is valid and not duplicate
  const handleAddOwners = () => {
    const trimmed = newOwners.trim(); // Remove extra spaces
    if (!trimmed || owners.includes(trimmed)) return; // Skip if invalid or duplicate
    setOwners([...owners, trimmed]); // Add to owner list
    setTasks({ ...tasks, [trimmed]: Array.from({ length: 7 }, () => []) }); // Initialize 7 empty day arrays for this owner
    setNewOwners(''); // Clear input
  };

  // Add a new task for a specific team member on a specific day
  const handleAddTask = (owner, dayIndex, newTask) => {
    setTasks((prev) => ({
      ...prev,
      [owner]: prev[owner].map((dayTasks, i) =>
        i === dayIndex ? [...dayTasks, newTask] : dayTasks // Append to correct day
      )
    }));
  };

  // Toggle task completion status (done/undone)
  const handleToggleTask = (owner, dayIndex, taskIndex) => {
    setTasks((prev) => ({
      ...prev,
      [owner]: prev[owner].map((dayTasks, i) =>
        i === dayIndex
          ? dayTasks.map((task, j) =>
              j === taskIndex ? { ...task, completed: !task.completed } : task // Flip 'completed' flag
            )
          : dayTasks
      )
    }));
  };

  // Move calendar forward by 7 days
  const handleNextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() + 7);
    setStartDate(newStart);
    onStartDateChange(newStart); // Notify parent (e.g., to update month header)
  };

  // Move calendar backward by 7 days
  const handlePreviousWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() - 7);
    setStartDate(newStart);
    onStartDateChange(newStart);
  };

  // Reset calendar to current week (starting Sunday)
  const handleResetToCurrentWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    setStartDate(firstDayOfWeek);
    onStartDateChange(firstDayOfWeek);
  };

  return (
    <div>
      {/* Display current month and year based on startDate */}
      <CurrentMonthandYear startDate={startDate} />

      {/* Display current week number based on startDate */}
      <CurrentWeekNumber startDate={startDate} />

      {/* Navigation buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={handlePreviousWeek}>Previous 7 Days</button>
        <button onClick={handleResetToCurrentWeek} style={{ margin: '0 12px' }}>Current Week</button>
        <button onClick={handleNextWeek}>Next 7 Days</button>
      </div>

      {/* Calendar table */}
      <table border="1" cellSpacing="0" cellPadding="30">
        <thead>
          <tr>
            <th>Partners</th> {/* Header for owner names */}
            <CalendarWeekHeader headers={weekHeaders} /> {/* Render 7 headers */}
          </tr>
        </thead>
        <tbody>
          {/* Render each owner row */}
          {owners.map((owner, ownerIndex) => (
            <tr key={ownerIndex}>
              <td>{owner}</td> {/* Display owner's name */}
              {Array(7)
                .fill(0)
                .map((_, dayIndex) => (
                  <TaskCell
                    key={dayIndex}
                    tasks={tasks[owner]?.[dayIndex] || []} // Get task list or fallback to empty array
                    onAddTask={(newTask) => handleAddTask(owner, dayIndex, newTask)}
                    onToggleTask={(taskIndex) => handleToggleTask(owner, dayIndex, taskIndex)}
                  />
                ))}
            </tr>
          ))}
        </tbody>
      </table>

      {/* Input field and button to add new team members */}
      <AddPartnerInput
        value={newOwners}
        onChange={setNewOwners}
        onAdd={handleAddOwners}
      />
    </div>
  );
};

export default CalendarTable;