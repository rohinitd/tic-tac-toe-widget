import React from 'react';

const Grid = ({gridData, handleGridClick, rowId, colId}) => {

  return (
      <div className="ttt-board-grid" onClick={() => handleGridClick(rowId, colId)}
        style={{color: (gridData === 'X')? 'red' : 'blue'}} >
        {gridData}
      </div>
  );
};

export default Grid;
