import React from 'react';
import Select from 'react-select';
import {initOptions} from './util.js';

const Init = ({setSize, boardSize}) => {

  const [selectedSize, setSelectedSize] = React.useState(3);
  const options = initOptions();

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex" }}>
      <div>{label}</div>
    </div>
  );

  const handleSubmit = () => {
    setSize(selectedSize);
  };

  const handleSelect = (e) => {
    setSelectedSize(Number(e.value));
  };

  return (
      <div style={{padding: '30px'}}>
        <Select
          defaultValue={boardSize || options[0]}
          formatOptionLabel={formatOptionLabel}
          options={options}
          onChange={handleSelect}
        />
        <button onClick = {handleSubmit}>Submit</button>
      </div>
  );
};

export default Init;
