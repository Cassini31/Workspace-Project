import React from 'react';

// Stateless functional component that displays the ISO week number
// Accepts a 'startDate' prop, representing the start of the current 7-day view
const CurrentWeekNumber = ({ startDate }) => {
  // Get the day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday)
  const dayOfWeek = startDate.getUTCDay();

  // Find the nearest Thursday to ensure ISO week calculation (ISO weeks start on Monday, and week 1 is the one with the first Thursday of the year)
  const nearestThursday = new Date(startDate);
  nearestThursday.setUTCDate(startDate.getUTCDate() + 4 - (dayOfWeek === 0 ? 7 : dayOfWeek));

  // Get January 1st of the year in UTC
  const yearStart = new Date(Date.UTC(nearestThursday.getUTCFullYear(), 0, 1));

  // Calculate the ISO week number
  const weekNumber = Math.ceil((((nearestThursday - yearStart) / 86400000) + 1) / 7);

  // Display the week number inside a header tag
  return (
    <h2 style={{ textAlign: 'center', marginTop: '10px', marginBottom: '30px' }}>Week {weekNumber}</h2>
  );
};

export default CurrentWeekNumber;