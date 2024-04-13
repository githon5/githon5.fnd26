const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;
const EMPTY = '#f0f0f0';
const COLORS = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF', '#FFA500'];

let board = [];
for (let r = 0; r < ROWS; r++) {
    board[r] = [];
    for (let c = 0; c < COLS; c++) {
        board[r][c] = EMPTY;
    }
}

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
    ctx.strokeRect(x * BLOCK_SIZE, y * BLOCK_SIZE, BLOCK_SIZE, BLOCK_SIZE);
}

function drawBoard() {
    for (let r = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++) {
            drawBlock(c, r, board[r][c]);
        }
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBoard();
    requestAnimationFrame(draw);
}

draw();

const TETROMINOS = [
    [[1, 1, 1, 1]], // I
    [[1, 1, 1], [0, 1, 0]], // T
    [[1, 1, 1], [1, 0, 0]], // L
    [[1, 1, 1], [0, 0, 1]], // J
    [[1, 1], [1, 1]], // O
    [[1, 1, 0], [0, 1, 1]], // Z
    [[0, 1, 1], [1, 1, 0]]  // S
];

let currentTetromino;
let currentColor;
let currentRow = 0;
let currentCol = 0;

function randomTetromino() {
    const randomIndex = Math.floor(Math.random() * TETROMINOS.length);
    currentTetromino = TETROMINOS[randomIndex];
    currentColor = COLORS[randomIndex];
    currentRow = 0;
    currentCol = Math.floor(COLS / 2) - Math.floor(currentTetromino[0].length / 2);
}

function drawTetromino() {
    for (let r = 0; r < currentTetromino.length; r++) {
        for (let c = 0; c < currentTetromino[r].length; c++) {
            if (currentTetromino[r][c]) {
                drawBlock(currentCol + c, currentRow + r, currentColor);
            }
        }
    }
}

function moveDown() {
    currentRow++;
    if (!validMove()) {
        currentRow--;
        placeTetromino();
        randomTetromino();
        if (!validMove()) {
            // Game over logic
            alert('Game Over');
            location.reload(); // Reload the page to start over
        }
    }
}

function placeTetromino() {
    for (let r = 0; r < currentTetromino.length; r++) {
        for (let c = 0; c < currentTetromino[r].length; c++) {
            if (currentTetromino[r][c]) {
                board[currentRow + r][currentCol + c] = currentColor;
            }
        }
    }
    checkLines();
}

function validMove() {
    for (let r = 0; r < currentTetromino.length; r++) {
        for (let c = 0; c < currentTetromino[r].length; c++) {
            if (currentTetromino[r][c]) {
                const nextRow = currentRow + r;
                const nextCol = currentCol + c;
                if (nextRow >= ROWS || nextCol < 0 || nextCol >= COLS || board[nextRow][nextCol] !== EMPTY) {
                    return false;
                }
            }
        }
    }
    return true;
}

function checkLines() {
    for (let r = ROWS - 1; r >= 0; r--) {
        if (board[r].every(cell => cell !== EMPTY)) {
            board.splice(r, 1);
            board.unshift(Array(COLS).fill(EMPTY));
        }
    }
}

document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft') {
        currentCol--;
        if (!validMove()) {
            currentCol++;
        }
    } else if (event.key === 'ArrowRight') {
        currentCol++;
        if (!validMove()) {
            currentCol--;
        }
    } else if (event.key === 'ArrowDown') {
        moveDown();
    }
});

randomTetromino();