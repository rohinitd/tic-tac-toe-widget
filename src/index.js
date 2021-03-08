import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';

let storeBoardData = JSON.parse(localStorage.getItem('boardData')) || null ;
let storeNextPlayer = localStorage.getItem('nextMove') || 'X';

ReactDOM.render(<App storeBoardData={storeBoardData} storeNextPlayer={storeNextPlayer} />, document.getElementById('root'));
