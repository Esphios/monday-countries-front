import React from 'react';
import Form from 'react-bootstrap/Form';

interface Props {
  searchQuery: string;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBox: React.FC<Props> = ({ searchQuery, handleChange }) => {
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
