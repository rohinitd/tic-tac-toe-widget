/*
* build options for react select.
*/
export const initOptions = () => {
  let options = [];
  for(let i = 3; i <= 20; i++) {
    let o = {
      value: i ,
      label: `${i}X${i}`
    };
    options.push(o);
  }

  return options;
};

/*
* initialise board state with localstorage if present or default value.
*/
export const initBoardState = (storeBoardData, size) => {

  let boardState = {
    row: [new Array(size).fill(0), new Array(size).fill(0)],
    col: [new Array(size).fill(0), new Array(size).fill(0)],
    diag1: [0, 0],
    diag2: [0, 0]
  };

  if(!storeBoardData) {
    return boardState;
  }

  for(let i = 0; i < storeBoardData.length; i++) {
    for(let j = 0; j < storeBoardData[0].length; j++) {
      if(! storeBoardData[i][j]) {
        continue;
      }
      let index = (storeBoardData[i][j] === 'X')? 0 : 1;

      boardState.row[index][i] += 1;
      boardState.col[index][j] += 1;

      if ( i === j ){
        boardState.diag1[index] += 1;
      }
      if (i + j === storeBoardData.length - 1 ) {
        boardState.diag2[index] += 1;
      }
    }
  }

  return boardState;
};
