import React, { useState } from 'react';
import CalendarWeekHeader from './CalendarWeekHeader.jsx';
import AddTask from './AddTask.jsx';
import TaskCell from './TaskCell.jsx';
import AddPartnerInput from './AddPartnerInput.jsx';

const CalendarTable = () => {
  const today = new Date();
  const currentDayIndex = today.getDay();
  const dayFormat = { weekday: 'short' };

  const [owners, setOwners] = useState([]);
  const [newOwners, setNewOwners] = useState('');
  const [tasks, setTasks] = useState({});

  const getWeekDays = () => {
    const weekDays = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(today);
      day.setDate(today.getDate() - currentDayIndex + i);
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

  return (
    <div>
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
              {Array(7).fill(0).map((_, dayIndex) => (
                <TaskCell
                  key={dayIndex}
                  tasks={tasks[owner]?.[dayIndex] || []}
                  onAddTask={(newTask) => {
                    setTasks(prev => ({
                      ...prev,
                      [owner]: prev[owner].map((dayTasks, i) =>
                        i === dayIndex ? [...dayTasks, newTask] : dayTasks
                      )
                    }));
                  }}
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
