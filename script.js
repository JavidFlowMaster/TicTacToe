const board = document.getElementById('board');
const status = document.getElementById('status');
let currentPlayer = 'X';
let gameActive = true;
let gameState = ['', '', '', '', '', '', '', '', ''];

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const handleCellClick = (e) => {
  const clickedCell = e.target;
  const clickedCellIndex = parseInt(clickedCell.getAttribute('data-cell-index'));

  if (gameState[clickedCellIndex] !== '' || !gameActive) return;

  gameState[clickedCellIndex] = currentPlayer;
  clickedCell.innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameActive = false;
    status.innerText = `${currentPlayer} has won!`;
    return;
  }

  if (!gameState.includes('')) {
    gameActive = false;
    status.innerText = `It's a draw!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.innerText = `${currentPlayer}'s turn`;

  if (currentPlayer === 'O') {
    makeWebMove();
  }
};

const checkWin = (player) => {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return gameState[index] === player;
    });
  });
};

const makeWebMove = () => {
  const bestMove = getBestMove();
  gameState[bestMove.index] = currentPlayer;
  document.querySelector(`[data-cell-index="${bestMove.index}"]`).innerText = currentPlayer;

  if (checkWin(currentPlayer)) {
    gameActive = false;
    status.innerText = `${currentPlayer} has won!`;
    return;
  }

  if (!gameState.includes('')) {
    gameActive = false;
    status.innerText = `It's a draw!`;
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  status.innerText = `${currentPlayer}'s turn`;
};

const getBestMove = () => {
  let bestScore = -Infinity;
  let bestMove;
  for (let i = 0; i < 9; i++) {
    if (gameState[i] === '') {
      gameState[i] = 'O';
      let score = minimax(gameState, 0, false);
      gameState[i] = '';
      if (score > bestScore) {
        bestScore = score;
        bestMove = { index: i, score: score };
      }
    }
  }
  return bestMove;
};

const scores = {
  X: -1,
  O: 1,
  tie: 0,
};

const minimax = (state, depth, isMaximizing) => {
  if (checkWin('X')) {
    return scores.X;
  } else if (checkWin('O')) {
    return scores.O;
  } else if (!state.includes('')) {
    return scores.tie;
  }

  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (state[i] === '') {
        state[i] = 'O';
        let score = minimax(state, depth + 1, false);
        state[i] = '';
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (state[i] === '') {
        state[i] = 'X';
        let score = minimax(state, depth + 1, true);
        state[i] = '';
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
};

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

status.innerText = `${currentPlayer}'s turn`;
