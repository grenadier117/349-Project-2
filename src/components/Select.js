import React from 'react';

export const Select = ({ data, onChange, value }) => {
  return <select value={value} onChange={onChange}>
    <option value={undefined}>All Countries</option>
    {data.map(item => (
      <option value={item}>{item}</option>
    ))}
  </select>
}
