import React from 'react';
import Grid from './grid.js';

const Row = ({boardSize, rowData, rowId, handleGridClick}) => {

    return (
      <div>
        {
          (function(){
            let grids = [];
            for(let i = 0; i < Number(boardSize); i++) {
              grids.push(<Grid key={i} gridData={rowData[i]} rowId={rowId} colId={i} handleGridClick={handleGridClick}/>);
            }
            return grids;
          })()
        }
       </div>
    );
};

const Board = ({boardSize, boardData, handleGridClick}) => {
  
  return (
      <div>
        {
          (function(){
            let rows = [];
            for(let i = 0; i < Number(boardSize); i++) {
              rows.push(<Row boardSize={boardSize} key={i} rowData={boardData[i]} rowId={i} handleGridClick={handleGridClick} />);
            }
            return rows;
          })()
        }
      </div>
  )
};

export default Board;
