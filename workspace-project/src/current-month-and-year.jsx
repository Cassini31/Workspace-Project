import React from 'react'; // Import React to enable JSX and functional component features

// Stateless functional component that displays the current month and year
// Accepts a 'startDate' prop passed from the parent component (CalendarTable)
const CurrentMonthandYear = ({ startDate }) => {
  // Define how the month and year should be displayed (e.g., "June 2025")
  const monthAndYearFormat = {
    month: 'long',    // Full month name (e.g., "June")
    year: 'numeric',  // Full numeric year (e.g., "2025")
  };

  // Convert the startDate to a formatted string using the specified format
  const formattedDate = startDate.toLocaleDateString('en-US', monthAndYearFormat);

  // Render the formatted date inside an <h1> tag for display
  return <h1>{formattedDate}</h1>;
};

export default CurrentMonthandYear; // Export component so it can be imported elsewhere