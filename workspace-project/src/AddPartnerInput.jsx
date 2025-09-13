import React from 'react';

// Component for inputting and adding a new team member to the calendar
const AddPartnerInput = ({ value, onChange, onAdd, loading, error }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Add Partner"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: '50px', width: '200px' }}
        disabled={loading}
      />
      <button onClick={onAdd} style={{ marginLeft: '8px' }} disabled={loading}>
        +
      </button>
      {loading && <span style={{ marginLeft: 12 }}>Adding...</span>}
      {error && <span style={{ color: 'red', marginLeft: 12 }}>{error}</span>}
    </div>
  );
};

export default AddPartnerInput;
