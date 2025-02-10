import React, { useState } from 'react';

const SearchDemo = () => {
  const [query, setQuery] = useState('');
  
  // Array to be searched
  const array = ['ba', 'bana', 'be', 'aa', 'banana'];

  // Filter the array based on the query
  const filteredResults = array.filter(item =>
    item.toLowerCase().includes(query.toLowerCase())
  );

  // Handle input change
  const handleInputChange = (event) => {
    setQuery(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={handleInputChange}
        style={{
          padding: '8px',
          marginBottom: '10px',
          width: '200px',
          borderRadius: '4px',
          border: '1px solid #ccc',
        }}
      />
      <ul style={{ listStyleType: 'none', padding: 0 }}>
        {filteredResults.map((item, index) => (
          <li key={index} style={{ padding: '5px', margin: '5px 0', border: '1px solid #ccc' }}>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchDemo;