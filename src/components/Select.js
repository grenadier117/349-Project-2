import React from 'react';

export const Select = ({ data, onChange, value }) => {
  return (
    <div style={{ margin: '24px 0px 12px 12px' }}>
      Select Country: 
      <select value={value} onChange={onChange} style={{ margin: '0px 12px' }}>
        <option value={undefined}>All Countries</option>
        {data.map(item => (
          <option value={item}>{item}</option>
        ))}
      </select>
    </div>
  )
}
