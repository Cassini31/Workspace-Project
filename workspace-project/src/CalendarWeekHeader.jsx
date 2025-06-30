import React from 'react';

// Functional component to render table headers for each day of the week
const CalendarWeekHeader = ({ headers }) => {
  return (
    <>
      {/* Map over the array of headers (e.g., ['Sun 8', 'Mon 9', ...]) */}
      {headers.map((label, index) => (
        // Render each label inside a <th> element with a unique key
        <th key={index}>{label}</th>
      ))}
    </>
  );
};

export default CalendarWeekHeader;