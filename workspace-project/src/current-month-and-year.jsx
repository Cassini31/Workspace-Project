import React from 'react';

// Component that receives a startDate prop and renders the month and year based on it
const CurrentMonthandYear = ({ startDate }) => {
  const monthAndYearFormat = {
    month: 'long',
    year: 'numeric',
  };

  const formattedDate = startDate.toLocaleDateString('en-US', monthAndYearFormat);

  return <h1>{formattedDate}</h1>;
};

export default CurrentMonthandYear;