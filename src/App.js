import React from 'react';
import './App.css';
import Init from './board/init.js';
import Board from './shared/components/board.js';
import {initBoardState} from './board/util.js';
import BoardManager from './board/boardManager.js';

const App = () => {

  let storeBoardData = JSON.parse(sessionStorage.getItem('boardData')) || null ;
  let storeNextPlayer = sessionStorage.getItem('nextMove') || 'X';

  return (
      <BoardManager storeBoardData={storeBoardData} storeNextPlayer={storeNextPlayer} />
  );
};

export default App;
