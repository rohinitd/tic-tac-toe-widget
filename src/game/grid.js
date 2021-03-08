import React from 'react';

const Grid = ({gridData, handleGridClick, rowId, colId}) => {

  return (
      <div style={{display : 'inline-block', overflow: 'auto', border: '1px solid black', width: '50px', height:'50px', textAlign: 'center', paddingTop: '25px'}}
        onClick={() => handleGridClick(rowId, colId)} >
        {gridData}
      </div>
  );
};

export default Grid;
