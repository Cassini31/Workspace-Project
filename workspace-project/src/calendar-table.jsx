import React, { useState, useEffect } from 'react';
import CurrentMonthandYear from './current-month-and-year.jsx';
import CurrentWeekNumber from './current-week-number.jsx';
import CalendarWeekHeader from './CalendarWeekHeader.jsx';
import TaskCell from './TaskCell.jsx';
import AddPartnerInput from './AddPartnerInput.jsx';

// Main calendar table component
const CalendarTable = ({ onStartDateChange }) => {
  const [owners, setOwners] = useState([]); // List of owners (team members)
  const [newOwners, setNewOwners] = useState(''); // New owner input field state
  const [tasks, setTasks] = useState({}); // Tasks stored by date and owner

  // Compute the start of the current week (Sunday)
  const getInitialStartDate = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    return firstDayOfWeek;
  };

  const [startDate, setStartDate] = useState(getInitialStartDate); // Visible week's start date

  const dayFormat = { weekday: 'short' }; // Display format for weekday names

  // Retrieve and format the 7-day labels starting from startDate
  const getWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      const dayName = day.toLocaleDateString(undefined, dayFormat);
      const dateNum = day.getDate();
      weekDays.push(`${dayName} ${dateNum}`);
    }
    return weekDays;
  };

  const weekHeaders = getWeekDays();

  // Converts a Date object to an ISO string (yyyy-mm-dd)
  const getDateKey = (date) => date.toISOString().split('T')[0];

  // Add a new team member
  const handleAddOwners = () => {
    const trimmed = newOwners.trim();
    if (!trimmed || owners.includes(trimmed)) return;
    setOwners([...owners, trimmed]);
    setNewOwners('');
  };

  // Add a task for a specific owner and date
  const handleAddTask = (owner, dayIndex, newTask) => {
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + dayIndex);
    const dateKey = getDateKey(targetDate);

    setTasks((prev) => {
      const prevTasksForDate = prev[dateKey]?.[owner] || [];
      return {
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          [owner]: [...prevTasksForDate, newTask]
        }
      };
    });
  };

  // Toggle completion for a task on a specific date
  const handleToggleTask = (owner, dayIndex, taskIndex) => {
    const targetDate = new Date(startDate);
    targetDate.setDate(startDate.getDate() + dayIndex);
    const dateKey = getDateKey(targetDate);

    setTasks((prev) => {
      const updatedTasks = prev[dateKey]?.[owner]?.map((task, i) =>
        i === taskIndex ? { ...task, completed: !task.completed } : task
      ) || [];

      return {
        ...prev,
        [dateKey]: {
          ...prev[dateKey],
          [owner]: updatedTasks
        }
      };
    });
  };

  // Navigate forward 7 days
  const handleNextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() + 7);
    setStartDate(newStart);
    onStartDateChange(newStart);
  };

  // Navigate back 7 days
  const handlePreviousWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() - 7);
    setStartDate(newStart);
    onStartDateChange(newStart);
  };

  // Return to current week
  const handleResetToCurrentWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    setStartDate(firstDayOfWeek);
    onStartDateChange(firstDayOfWeek);
  };

  return (
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'center', width: '100%' }}>
        <CurrentMonthandYear startDate={startDate} />
      </div>
      <CurrentWeekNumber startDate={startDate} />

      {/* Navigation Buttons */}
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={handlePreviousWeek}>Previous 7 Days</button>
        <button onClick={handleResetToCurrentWeek} style={{ margin: '0 12px' }}>Current Week</button>
        <button onClick={handleNextWeek}>Next 7 Days</button>
      </div>

      {/* Calendar Table */}
      <table border="1" cellSpacing="0" cellPadding="30">
        <thead>
          <tr>
            <th>Partners</th>
            <CalendarWeekHeader headers={weekHeaders} />
          </tr>
        </thead>
        <tbody>
          {owners.map((owner, ownerIndex) => (
            <tr key={ownerIndex}>
              <td>{owner}</td>
              {Array(7).fill(0).map((_, dayIndex) => {
                const dateKey = getDateKey(new Date(startDate.getTime() + dayIndex * 86400000));
                const dayTasks = tasks[dateKey]?.[owner] || [];
                return (
                  <TaskCell
                    key={dayIndex}
                    tasks={dayTasks}
                    onAddTask={(newTask) => handleAddTask(owner, dayIndex, newTask)}
                    onToggleTask={(taskIndex) => handleToggleTask(owner, dayIndex, taskIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <AddPartnerInput
        value={newOwners}
        onChange={setNewOwners}
        onAdd={handleAddOwners}
      />
    </div>
  );
};

export default CalendarTable;