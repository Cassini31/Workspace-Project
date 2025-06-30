import React from 'react';

// Component for inputting and adding a new team member to the calendar
const AddPartnerInput = ({ value, onChange, onAdd }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      {/* Text input for entering a team member */}
      <input
        type="text"
        placeholder="Add Partner" // Placeholder text shown when input is empty
        value={value} // Controlled input tied to parent state
        onChange={(e) => onChange(e.target.value)} // Pass new value back to parent handler
        style={{ marginLeft: '50px', width: '200px' }} // Styling for spacing and width
      />

      {/* Button to add the team member */}
      <button onClick={onAdd} style={{ marginLeft: '8px' }}>
        +
      </button>
    </div>
  );
};

export default AddPartnerInput;
