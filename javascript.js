const boardSize = 4;
let board = [];
let score = 0;
let bestScore = 0;

const boardElement = document.getElementById('board');
const scoreElement = document.getElementById('score');
const bestElement = document.getElementById('best');
const restartButton = document.getElementById('restart');

// Initialize board with option for custom state
function initBoard(customState = null) {
    board = Array.from({ length: boardSize }, () => Array(boardSize).fill(0));
    if (customState) {
        for (let r = 0; r < boardSize; r++) {
            for (let c = 0; c < boardSize; c++) {
                board[r][c] = customState[r][c] || 0;
            }
        }
    } else {
        addRandomTile();
        addRandomTile();
    }
    score = 0;
    updateBestScore();
    updateBoard();
}

// Add random tile (2 or 4) with animation
function addRandomTile() {
    const emptyCells = [];
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) emptyCells.push([r, c]);
        }
    }
    if (emptyCells.length === 0) return;
    const [r, c] = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    board[r][c] = { value: Math.random() < 0.9 ? 2 : 4, isNew: true };
}

// Update GUI
function updateBoard() {
    boardElement.innerHTML = '';
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            const tileDiv = document.createElement('div');
            tileDiv.className = 'tile';

            let tileValue = 0;
            let isNew = false;

            if (typeof board[r][c] === 'object') {
                tileValue = board[r][c].value;
                isNew = board[r][c].isNew;
                board[r][c] = tileValue; // Convert back to number after animation
            } else {
                tileValue = board[r][c];
            }

            if (tileValue !== 0) {
                tileDiv.textContent = tileValue;
                tileDiv.setAttribute('value', tileValue);
            }

            if (isNew) {
                tileDiv.classList.add('new');
                tileDiv.addEventListener('animationend', () => {
                    tileDiv.classList.remove('new');
                }, { once: true });
            }

            boardElement.appendChild(tileDiv);
        }
    }
    scoreElement.textContent = 'Score: ' + score;
    bestElement.textContent = 'Best: ' + bestScore;
    checkGameOver();
}

// Merge helper
function slide(row) {
    let arr = row.filter(val => val !== 0);
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === arr[i + 1] && arr[i] !== 0) {
            arr[i] *= 2;
            score += arr[i];
            arr[i + 1] = 0;
        }
    }
    arr = arr.filter(val => val !== 0);
    while (arr.length < boardSize) arr.push(0);
    return arr;
}

// Moves
function moveLeft() {
    let moved = false;
    for (let r = 0; r < boardSize; r++) {
        const newRow = slide(board[r]);
        if (newRow.join(',') !== board[r].join(',')) moved = true;
        board[r] = newRow;
    }
    if (moved) afterMove();
}

function moveRight() {
    let moved = false;
    for (let r = 0; r < boardSize; r++) {
        let reversed = [...board[r]].reverse();
        reversed = slide(reversed);
        reversed.reverse();
        if (reversed.join(',') !== board[r].join(',')) moved = true;
        board[r] = reversed;
    }
    if (moved) afterMove();
}

function moveUp() {
    let moved = false;
    for (let c = 0; c < boardSize; c++) {
        let col = [];
        for (let r = 0; r < boardSize; r++) col.push(board[r][c]);
        col = slide(col);
        for (let r = 0; r < boardSize; r++) {
            if (board[r][c] !== col[r]) moved = true;
            board[r][c] = col[r];
        }
    }
    if (moved) afterMove();
}

function moveDown() {
    let moved = false;
    for (let c = 0; c < boardSize; c++) {
        let col = [];
        for (let r = 0; r < boardSize; r++) col.push(board[r][c]);
        col.reverse();
        col = slide(col);
        col.reverse();
        for (let r = 0; r < boardSize; r++) {
            if (board[r][c] !== col[r]) moved = true;
            board[r][c] = col[r];
        }
    }
    if (moved) afterMove();
}

// After successful move
function afterMove() {
    addRandomTile();
    updateBoard();
    updateBestScore();
    checkWin();
}

// Update best score
function updateBestScore() {
    bestScore = Math.max(bestScore, score);
}

// Win detection
function checkWin() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 2048) {
                setTimeout(() => alert('You Win! 🎉'), 100);
                return;
            }
        }
    }
}

// Game over detection
function checkGameOver() {
    for (let r = 0; r < boardSize; r++) {
        for (let c = 0; c < boardSize; c++) {
            if (board[r][c] === 0) return;
            if (c < boardSize - 1 && board[r][c] === board[r][c + 1]) return;
            if (r < boardSize - 1 && board[r][c] === board[r + 1][c]) return;
        }
    }
    setTimeout(() => alert('Game Over 😢'), 100);
}

// Keyboard controls
document.addEventListener('keydown', (e) => {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.key)) {
        e.preventDefault(); // Prevent scrolling
        switch (e.key) {
            case 'ArrowLeft': moveLeft(); break;
            case 'ArrowRight': moveRight(); break;
            case 'ArrowUp': moveUp(); break;
            case 'ArrowDown': moveDown(); break;
        }
    }
});

// Restart game
restartButton.addEventListener('click', () => initBoard());

// Start game with first image state as an option
const firstImageState = [
    [2, 2, 16, 8],
    ['', 64, '', ''],
    ['', '', 4, 2],
    ['', '', '', '']
];
initBoard(firstImageState); // Use this to match the first image