let currentPlayer = 'X';
let boardState = ["", "", "", "", "", "", "", "", ""];
let gameActive = false;
let colors = { X: '#000000ff', O: '#ffffffff' };

const statusDisplay = document.getElementById('status');
const cells = document.querySelectorAll('.cell');
const setupModal = new bootstrap.Modal(document.getElementById('setupModal'));
const resultModal = new bootstrap.Modal(document.getElementById('resultModal'));
const resultMessage = document.getElementById('resultMessage');
window.onload = () => setupModal.show();

function startGame() {
    colors.X = document.getElementById('p1Color').value;
    colors.O = document.getElementById('p2Color').value;
    gameActive = true;
    setupModal.hide();
    updateStatus();
}

const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function handleCellClick(e) {
    const clickedCell = e.target;
    const cellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (boardState[cellIndex] !== "" || !gameActive) return;

    boardState[cellIndex] = currentPlayer;
    clickedCell.innerText = currentPlayer;
    clickedCell.style.color = colors[currentPlayer];
    clickedCell.classList.add('taken');

    checkResult();
}

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusDisplay.innerText = `Player ${currentPlayer} Wins!`;
        statusDisplay.style.color = colors[currentPlayer];
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        statusDisplay.innerText = "It's a Draw!";
        statusDisplay.style.color = "#ffc107";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function updateStatus() {
    statusDisplay.innerText = `Player ${currentPlayer}'s Turn`;
    statusDisplay.style.color = colors[currentPlayer];
}

function resetGame() {
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    cells.forEach(cell => {
        cell.innerText = "";
        cell.classList.remove('taken');
    });
    updateStatus();
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));

function checkResult() {
    let roundWon = false;

    for (let i = 0; i < winningConditions.length; i++) {
        const [a, b, c] = winningConditions[i];
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        showGameOver(`Player ${currentPlayer} Wins!`, colors[currentPlayer]);
        gameActive = false;
        return;
    }

    if (!boardState.includes("")) {
        showGameOver("Match Draw!", "#ffc107");
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    updateStatus();
}

function showGameOver(text, color) {
    resultMessage.innerText = text;
    resultMessage.style.color = color;
    resultModal.show();
}

/**
 * Resets the game
 * @param {boolean} changeColors - If true, shows the initial color picker
 */
function resetGame(changeColors) {
    currentPlayer = 'X';
    boardState = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    
    cells.forEach(cell => {
        cell.innerText = "";
        cell.style.color = "";
        cell.classList.remove('taken');
    });

    resultModal.hide(); 
    updateStatus();

    if (changeColors) {
        setupModal.show();
    }
}