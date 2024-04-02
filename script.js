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

  if (checkWin()) {
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

const checkWin = () => {
  return winningConditions.some((condition) => {
    return condition.every((index) => {
      return gameState[index] === currentPlayer;
    });
  });
};

document.querySelectorAll('.cell').forEach((cell) => {
  cell.addEventListener('click', handleCellClick);
});

status.innerText = `${currentPlayer}'s turn`;
