import React from 'react';

const Init = ({setSize}) => {

  const [selectedSize, setSelectedSize] = React.useState(3);

  const handleSubmit = () => {
    setSize(selectedSize);
  };

  const handleSelect = (e) => {
    setSelectedSize(Number(e.target.value));
  };

  return (
      <div style={{padding: '30px'}}>
        <select name = "boardsize" onChange={handleSelect}>
          <option value="3">3 X 3</option>
          <option value="4">4 X 4</option>
          <option value="5">5 X 5</option>
          <option value="6">6 X 6</option>
          <option value="7">7 X 7</option>
          <option value="8">8 X 8</option>
          <option value="9">9 X 9</option>
          <option value="10">10 X 10</option>
          <option value="11">11 X 11</option>
          <option value="12">12 X 13</option>
          <option value="13">13 X 13</option>
          <option value="14">14 X 14</option>
          <option value="15">15 X 15</option>
          <option value="16">16 X 16</option>
          <option value="17">17 X 17</option>
          <option value="18">18 X 18</option>
        </select>
        <button onClick = {handleSubmit}>Submit</button>
      </div>
  );
};

export default Init;
