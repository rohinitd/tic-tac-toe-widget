import React from 'react';
import Init from './game/init.js';
import Board from './game/board.js';

const App = () => {
  const [size, setSize] = React.useState(3);
  const [nextMove, setNextMove] = React.useState('X');
  const [won, setWon] = React.useState('');
  const [tie, setTie] = React.useState(false);
  const [boardData, setBoardData] = React.useState(null);
  const [boardState, setBoardState] = React.useState({
    row: [new Array(size).fill(0), new Array(size).fill(0)],
    col: [new Array(size).fill(0), new Array(size).fill(0)],
    diag1: [0, 0],
    diag2: [0, 0]
  });

  const validateTie = () => {
    let [xRow, oRow] = boardState.row;
    let [xCol, oCol] = boardState.col;
    let [xDiag1, oDiag1] = boardState.diag1;
    let [xDiag2, oDiag2] = boardState.diag2;
    let rowAndCol = false;
    let diags = false;

    for(let i = 0; i < size; i++) {
      if(xRow[i] !== 0 && oRow[i] !== 0 && xCol[i] !== 0 && oCol[i] !== 0) {
        rowAndCol = true;
      }
    }

    if((xDiag1 !== 0 && oDiag1 !== 0) && (xDiag2 !== 0 && oDiag2 !== 0)) {
      diags = true;
    }
    setTie(rowAndCol && diags);
  };

  React.useEffect(() => {
    let data = new Array(size);
    for(let i = 0; i < size; i++) {
      data[i] = new Array(size);
    }
    setBoardData(data);
  }, []);

  React.useEffect(() => {
    let data = new Array(size);
    for(let i = 0; i < size; i++) {
      data[i] = new Array(size);
    }
    setBoardData(data);
  }, [size]);

  React.useEffect(() => {
    validateTie();
  }, [boardState]);

  const handleGridClick = (rowId, colId) => {
    if(won !== '') {
      return;
    }

    if(boardData[rowId][colId]) {
      return;
    }

    let _boardCopy = [...boardData];
    _boardCopy[rowId][colId] = nextMove;
    setNextMove(nextMove === 'X' ? 'O' : 'X');

    let _boardStateCopy = {...boardState};
    if(nextMove === 'X') {
      _boardStateCopy.row[0][rowId]++;
      _boardStateCopy.col[0][colId]++;
      if(rowId === colId) {
        _boardStateCopy.diag1[0]++;
      }
      if((rowId + colId) === size - 1) {
        _boardStateCopy.diag2[0]++;
      }
      if(  Math.abs(_boardStateCopy.row[0][rowId]) === size || Math.abs(_boardStateCopy.col[0][colId]) === size ||
           Math.abs(_boardStateCopy.diag1[0]) === size ||  Math.abs(_boardStateCopy.diag2[0]) === size) {
        setWon('X');
      }
    }
    else {
      _boardStateCopy.row[1][rowId]++;
      _boardStateCopy.col[1][colId]++;
      if(rowId === colId) {
        _boardStateCopy.diag1[1]++;
      }
      if((rowId + colId) === size - 1) {
        _boardStateCopy.diag2[1]++;
      }
      if(  Math.abs(_boardStateCopy.row[1][rowId]) === size || Math.abs(_boardStateCopy.col[1][colId]) === size ||
           Math.abs(_boardStateCopy.diag1[1]) === size ||  Math.abs(_boardStateCopy.diag2[1]) === size) {
        setWon('O');
      }
    }
    setBoardState(_boardStateCopy);
    setBoardData(_boardCopy);
  };

  const handleReset = () => {
    let data = new Array(size);
    for(let i = 0; i < size; i++) {
      data[i] = new Array(size);
    }
    setBoardData(data);
    setBoardState({
      row: [new Array(size).fill(0), new Array(size).fill(0)],
      col: [new Array(size).fill(0), new Array(size).fill(0)],
      diag1: [0, 0],
      diag2: [0, 0]
    });
    setWon('');
    setNextMove('X');
    setTie(false);
  };

  return (
    <div>
      <h1>
        Tic Tac toe
      </h1>
      <Init boardSize={size} setSize={setSize} />
      {<button onClick={handleReset}>Reset Game</button>}
      {boardData && boardData.length === size &&
        <Board boardSize={size} boardData={boardData} handleGridClick={handleGridClick} />}
      {won !== '' && <h4> {won} player won the game </h4>}
      {tie && <h4> Game tie </h4>}
    </div>
  );
};

export default App;
