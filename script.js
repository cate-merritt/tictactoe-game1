// Initial setup
let currentPlayer = 'X'; // Current player's turn ('X' or 'O')
let board = ['', '', '', '', '', '', '', '', '']; // Represents the Tic-Tac-Toe board
let gameActive = true; // Indicates whether the game is still active

// DOM elements
const playerTurn = document.getElementById('player-turn'); // Display whose turn it is
const resultMessage = document.getElementById('result'); // Display game result
const cells = document.querySelectorAll('.cell'); // All individual cells in the Tic-Tac-Toe board

// Function to handle a player's move
function makeMove(index) {
  // Check if the game is active and the selected cell is empty
  if (gameActive && board[index] === '') {
    // Update the board and display the move
    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    // Check for a win or draw
    checkWin();
    checkDraw();

    // Switch to the other player's turn
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    playerTurn.innerText = `${currentPlayer}'s Turn`;
  }
}

// Function to check for a win
function checkWin() {
  const winPatterns = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  // Check each winning pattern
  for (const pattern of winPatterns) {
    const [a, b, c] = pattern;
    // If the cells match and are not empty, declare a winner
    if (board[a] !== '' && board[a] === board[b] && board[b] === board[c]) {
      gameActive = false;
      resultMessage.innerText = `${currentPlayer} Wins!`;
      resultMessage.classList.remove('alert-success');
      resultMessage.classList.add('alert-warning');
      resultMessage.style.display = 'block';
      return;
    }
  }
}

// Function to check for a draw
function checkDraw() {
  // If there are no empty cells left and the game is still active, it's a draw
  if (!board.includes('') && gameActive) {
    gameActive = false;
    resultMessage.innerText = 'It\'s a Draw!';
    resultMessage.classList.remove('alert-success');
    resultMessage.classList.add('alert-warning');
    resultMessage.style.display = 'block';
  }
}

// Function to restart the game
function restartGame() {
  // Reset game variables
  currentPlayer = 'X';
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;

  // Update UI elements
  playerTurn.innerText = `${currentPlayer}'s Turn`;
  resultMessage.style.display = 'none';

  // Clear cell contents
  cells.forEach((cell) => {
    cell.innerText = '';
  });
}
