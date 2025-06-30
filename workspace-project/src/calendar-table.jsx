import React, { useState } from 'react';
import CurrentMonthandYear from './current-month-and-year.jsx';
import CalendarWeekHeader from './CalendarWeekHeader.jsx';
import TaskCell from './TaskCell.jsx';
import AddPartnerInput from './AddPartnerInput.jsx';

const CalendarTable = ({ onStartDateChange }) => {
  const [owners, setOwners] = useState([]);
  const [newOwners, setNewOwners] = useState('');
  const [tasks, setTasks] = useState({});
  const [startDate, setStartDate] = useState(() => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    return firstDayOfWeek;
  });

  const dayFormat = { weekday: 'short' };

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

  const handleAddOwners = () => {
    const trimmed = newOwners.trim();
    if (!trimmed || owners.includes(trimmed)) return;
    setOwners([...owners, trimmed]);
    setTasks({ ...tasks, [trimmed]: Array.from({ length: 7 }, () => []) });
    setNewOwners('');
  };

  const handleAddTask = (owner, dayIndex, newTask) => {
    setTasks((prev) => ({
      ...prev,
      [owner]: prev[owner].map((dayTasks, i) =>
        i === dayIndex ? [...dayTasks, newTask] : dayTasks
      )
    }));
  };

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

  const handleNextWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() + 7);
    setStartDate(newStart);
    onStartDateChange(newStart);
  };

  const handlePreviousWeek = () => {
    const newStart = new Date(startDate);
    newStart.setDate(startDate.getDate() - 7);
    setStartDate(newStart);
    onStartDateChange(newStart);
  };

  const handleResetToCurrentWeek = () => {
    const today = new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    setStartDate(firstDayOfWeek);
    onStartDateChange(firstDayOfWeek);
  };

  return (
    <div>
      <CurrentMonthandYear startDate={startDate} />
      <div style={{ display: 'flex', justifyContent: 'center', margin: '10px 0' }}>
        <button onClick={handlePreviousWeek}>Previous 7 Days</button>
        <button onClick={handleResetToCurrentWeek} style={{ margin: '0 12px' }}>Current Week</button>
        <button onClick={handleNextWeek}>Next 7 Days</button>
      </div>
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
              {Array(7)
                .fill(0)
                .map((_, dayIndex) => (
                  <TaskCell
                    key={dayIndex}
                    tasks={tasks[owner]?.[dayIndex] || []}
                    onAddTask={(newTask) => handleAddTask(owner, dayIndex, newTask)}
                    onToggleTask={(taskIndex) => handleToggleTask(owner, dayIndex, taskIndex)}
                  />
                ))}
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