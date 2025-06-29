import React from 'react';

const AddPartnerInput = ({ value, onChange, onAdd }) => {
  return (
    <div style={{ marginTop: '20px' }}>
      <input
        type="text"
        placeholder="Add Partner"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{ marginLeft: '50px', width: '200px' }}
      />
      <button onClick={onAdd} style={{ marginLeft: '8px' }}>
        +
      </button>
    </div>
  );
};

export default AddPartnerInput;
