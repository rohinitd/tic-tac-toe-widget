import React from 'react';
import Select from 'react-select';
import {initOptions} from './util.js';

const Init = ({setSize, boardSize}) => {

  const [selectedSize, setSelectedSize] = React.useState(boardSize);
  const options = initOptions();

  const formatOptionLabel = ({ value, label }) => (
    <div style={{ display: "flex" }}>
      <div>{label}</div>
    </div>
  );

  /*
  * on click handler for submitting the size of tic tac tor board
  * after its selected from option
  */
  const handleSubmit = () => {
    if(selectedSize === boardSize) {
      return;
    }

    setSize(selectedSize);
  };

  /*
  * on change handler for selecting board size from drop down.
  */
  const handleSelect = (e) => {
    setSelectedSize(Number(e.value));
  };

  return (
      <div style={{padding: '10px'}}>
        <Select
          defaultValue={options[boardSize - 3]}
          formatOptionLabel={formatOptionLabel}
          options={options}
          onChange={handleSelect}
        />
        <button onClick = {handleSubmit}>Submit</button>
      </div>
  );
};

export default Init;
