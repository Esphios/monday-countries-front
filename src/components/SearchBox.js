import React from 'react';
import Form from 'react-bootstrap/Form';

const SearchBox = ({ searchQuery, handleChange }) => {
  return (
    <Form.Control
      type="text"
      placeholder="Input the country's name fragment..."
      value={searchQuery}
      onChange={handleChange}
    />
  );
};

export default SearchBox;
