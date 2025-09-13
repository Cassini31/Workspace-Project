import React, { useState, useEffect } from 'react';
import CurrentMonthandYear from './current-month-and-year.jsx';
import CurrentWeekNumber from './current-week-number.jsx';
import CalendarWeekHeader from './CalendarWeekHeader.jsx';
import TaskCell from './TaskCell.jsx';
import AddPartnerInput from './AddPartnerInput.jsx';

// Main calendar table component
const CalendarTable = ({ onStartDateChange, onLogout }) => {
  const [partners, setPartners] = useState([]); // List of partners (team members)
  const [newPartner, setNewPartner] = useState(''); // New partner input field state
  const [tasks, setTasks] = useState({}); // Tasks stored by date and owner
  const [loadingPartners, setLoadingPartners] = useState(false);
  const [errorPartners, setErrorPartners] = useState('');

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

  // Fetch partners from backend
  useEffect(() => {
    setLoadingPartners(true);
    fetch('http://localhost:4000/partners')
      .then(res => res.json())
      .then(data => {
        setPartners(data);
        setLoadingPartners(false);
      })
      .catch(() => {
        setErrorPartners('Failed to load partners');
        setLoadingPartners(false);
      });
  }, []);

  // Add a new partner
  const handleAddPartner = async () => {
    const trimmed = newPartner.trim();
    if (!trimmed || partners.some(p => p.name === trimmed)) return;
    try {
      const res = await fetch('http://localhost:4000/partners', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: trimmed })
      });
      if (res.ok) {
        const added = await res.json();
        setPartners([...partners, added]);
        setNewPartner('');
      }
    } catch {
      setErrorPartners('Failed to add partner');
    }
  };

  // Remove a partner
  const handleRemovePartner = async (id) => {
    try {
      const res = await fetch(`http://localhost:4000/partners/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPartners(partners.filter(p => p._id !== id));
      }
    } catch {
      setErrorPartners('Failed to remove partner');
    }
  };

  // Rename a partner
  const handleRenamePartner = async (id, newName) => {
    try {
      const res = await fetch(`http://localhost:4000/partners/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: newName })
      });
      if (res.ok) {
        const updated = await res.json();
        setPartners(partners.map(p => p._id === id ? updated : p));
      }
    } catch {
      setErrorPartners('Failed to rename partner');
    }
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
    <div style={{ minHeight: '100vh', width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', position: 'relative' }}>
      {/* Logout Button */}
      <button
        onClick={onLogout}
        style={{
          position: 'absolute',
          top: 24,
          right: 32,
          padding: '8px 18px',
          background: '#f0f0f0', // match Current Week button background
          color: '#222',
          border: '1px solid #ccc',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: '500',
          fontSize: '1rem',
          boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
          transition: 'background 0.2s',
        }}
        onMouseOver={e => e.currentTarget.style.background = '#e0e0e0'}
        onMouseOut={e => e.currentTarget.style.background = '#f0f0f0'}
      >
        Logout
      </button>

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
          {partners.map((partner, partnerIndex) => (
            <tr key={partner._id}>
              <td>
                {partner.name}
                <button onClick={() => handleRemovePartner(partner._id)} style={{ marginLeft: 8 }}>🗑️</button>
                <button onClick={() => {
                  const newName = prompt('Enter new name:', partner.name);
                  if (newName && newName.trim() && newName !== partner.name) {
                    handleRenamePartner(partner._id, newName.trim());
                  }
                }} style={{ marginLeft: 4 }}>✏️</button>
              </td>
              {Array(7).fill(0).map((_, dayIndex) => {
                const dateKey = getDateKey(new Date(startDate.getTime() + dayIndex * 86400000));
                const dayTasks = tasks[dateKey]?.[partner.name] || [];
                return (
                  <TaskCell
                    key={dayIndex}
                    tasks={dayTasks}
                    onAddTask={(newTask) => handleAddTask(partner.name, dayIndex, newTask)}
                    onToggleTask={(taskIndex) => handleToggleTask(partner.name, dayIndex, taskIndex)}
                  />
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>

      <AddPartnerInput
        value={newPartner}
        onChange={setNewPartner}
        onAdd={handleAddPartner}
        loading={loadingPartners}
        error={errorPartners}
      />
    </div>
  );
};

export default CalendarTable;