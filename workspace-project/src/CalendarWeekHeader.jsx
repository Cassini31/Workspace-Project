import React from 'react';

const CalendarWeekHeader = ({ headers }) => {
  return (
    <>
      {headers.map((label, index) => (
        <th key={index}>{label}</th>
      ))}
    </>
  );
};

export default CalendarWeekHeader;