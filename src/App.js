import React from 'react';
import Init from './board/init.js';
import Board from './shared/components/board.js';
import {initBoardState} from './board/util.js';

const App = ({storeBoardData, storeNextPlayer}) => {

  // state variable to track size selected for board.
  const [size, setSize] = React.useState((storeBoardData && storeBoardData.length) || 3);

  // state variable to track next player move.
  const [nextMove, setNextMove] = React.useState(storeNextPlayer);

  // state variable to track who won.
  const [won, setWon] = React.useState('');

  // state variable to track who if game results in tie.
  const [tie, setTie] = React.useState(false);

  // state variable to track data of the board 'X' or 'O' so far in the board matrix.
  const [boardData, setBoardData] = React.useState(storeBoardData);

  // statevariable to track any wins via row, column and diagnols.
  const [boardState, setBoardState] = React.useState(initBoardState(storeBoardData, size));

  /*
  * Method to validate tie in board.
  */
  const validateTie = () => {
    let [xRow, oRow] = boardState.row;
    let [xCol, oCol] = boardState.col;
    let [xDiag1, oDiag1] = boardState.diag1;
    let [xDiag2, oDiag2] = boardState.diag2;
    let rowAndCol = true;
    let diags = false;

    for(let i = 0; i < size; i++) {
      if(xRow[i] !== 0 && oRow[i] !== 0 && xCol[i] !== 0 && oCol[i] !== 0) {
        rowAndCol = rowAndCol && true;
      }
      else {
        rowAndCol = false;
      }
    }

    if((xDiag1 !== 0 && oDiag1 !== 0) && (xDiag2 !== 0 && oDiag2 !== 0)) {
      diags = true;
    }
    setTie(rowAndCol && diags);
  };

  const updateWinner = () => {
    for(let i = 0; i < 2; i++) {
      for ( let j = 0 ; j < size; j++) {
        if(  Math.abs(boardState.row[i][j]) === size ||
              Math.abs(boardState.col[i][j]) === size ||
              Math.abs(boardState.diag1[i]) === size ||
              Math.abs(boardState.diag2[i]) === size ) {
          setWon(i === 0 ? 'X': 'O');
        }
      }
    }
  };

  /*
  * ComponentDidMount useEffect - initialise boardData on load.
  */
  React.useEffect(() => {
    if(!storeBoardData) {
      let data = new Array(size);
      for(let i = 0; i < size; i++) {
        data[i] = new Array(size);
      }
      setBoardData(data);
    }
  }, []);

  /*
  * Simulation of ComponentDidUpdate useEffect for size state - reruns everytime when size is updated.
  */
  React.useEffect(() => {
    if(!boardData) {
      return;
    }
    if(size === boardData.length) {
      return;
    }

  handleReset();
  }, [size]);

  /*
  * Simulation of ComponentDidUpdate useEffect for boardState - reruns everytime when boardState is updated.
  */
  React.useEffect(() => {
    updateWinner();
    validateTie();
  }, [boardState]);

  /*
  * Click handler to set boardData and validate winner for every grid click.
  */
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
    let index = (_boardCopy[rowId][colId] === 'X') ? 0 : 1;
    _boardStateCopy.row[index][rowId]++;
      _boardStateCopy.col[index][colId]++;
      if(rowId === colId) {
        _boardStateCopy.diag1[index]++;
      }
      if((rowId + colId) === size - 1) {
        _boardStateCopy.diag2[index]++;
      }
      if(  Math.abs(_boardStateCopy.row[index][rowId]) === size || Math.abs(_boardStateCopy.col[index][colId]) === size ||
           Math.abs(_boardStateCopy.diag1[index]) === size ||  Math.abs(_boardStateCopy.diag2[index]) === size) {
        setWon(index === 0 ? 'X': 'O');
      }

    setBoardState(_boardStateCopy);
    setBoardData(_boardCopy);
    localStorage.setItem('nextMove', nextMove === 'X' ? 'O' : 'X');
    localStorage.setItem('boardData', JSON.stringify(_boardCopy));
  };

  /*
  * Click handler to reset all states of the board.
  */
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
    localStorage.setItem('nextMove', 'X');
    localStorage.setItem('boardData', JSON.stringify(data));
  };

  return (
    <div>
      <h1>
        Tic Tac Toe
      </h1>
      <Init boardSize={size} setSize={setSize} />
      {<button style={{marginLeft: '30px'}} onClick={handleReset}>Reset Game</button>}
      {boardData && boardData.length === size &&
        <Board boardSize={size} boardData={boardData} handleGridClick={handleGridClick} />}
      {won !== '' && <h4> {won} player won the game </h4>}
      {tie && <h4> Game tie </h4>}
    </div>
  );
};

export default App;
