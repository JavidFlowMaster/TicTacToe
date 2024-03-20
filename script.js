document.addEventListener('DOMContentLoaded', function () {
    const board = document.getElementById('board');
    const cells = [];
    let currentPlayer = 'X';
    let winner = null;

    // Create the Tic Tac Toe board
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.addEventListener('click', () => cellClicked(i));
        board.appendChild(cell);
        cells.push(cell);
    }

    // Function to handle cell clicks
    function cellClicked(index) {
        if (cells[index].innerText === '' && !winner) {
            cells[index].innerText = currentPlayer;
            if (checkWinner(currentPlayer)) {
                winner = currentPlayer;
                document.getElementById('message').innerText = `${winner} wins!`;
            } else if (isBoardFull()) {
                document.getElementById('message').innerText = "It's a draw!";
            } else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                if (currentPlayer === 'O') {
                    // Computer makes a move
                    makePerfectMoveExceptSequence();
                }
            }
        }
    }

    // Function to check for a winner
    function checkWinner(player) {
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        return winConditions.some(combination => combination.every(index => cells[index].innerText === player));
    }

    // Function to check if the board is full
    function isBoardFull() {
        return cells.every(cell => cell.innerText !== '');
    }

    // Function to reset the game
    document.getElementById('resetButton').addEventListener('click', resetGame);

    function resetGame() {
        cells.forEach(cell => {
            cell.innerText = '';
        });
        currentPlayer = 'X';
        winner = null;
        document.getElementById('message').innerText = '';
    }

    // Function to make perfect move except a specified sequence
    function makePerfectMoveExceptSequence() {
        // Here you can define your exception sequence logic
        // For example, you can hard-code it or generate it dynamically based on certain conditions
        // For demonstration purposes, let's assume the exception sequence is [0, 1, 2]
        const exceptionSequence = [0, 1, 2];
        
        // Logic to find the best move
        // This logic should be based on the minimax algorithm or any other strategy you prefer
        // For demonstration purposes, let's just make a random valid move
        let randomIndex;
        do {
            randomIndex = Math.floor(Math.random() * 9);
        } while (exceptionSequence.includes(randomIndex) || cells[randomIndex].innerText !== '');
        
        cells[randomIndex].innerText = 'O';
        currentPlayer = 'X';
    }
});
