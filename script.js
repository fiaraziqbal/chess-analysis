const chessboard = document.getElementById("chessboard");
const pgnInput = document.getElementById("pgnInput");
const moveList = []; // Array to store PGN moves
let currentMoveIndex = 0; // Index of the current move

// Chess piece symbols for the starting position
const startingPosition = [
    "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
    "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
    "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
];

function loadPGN(file) {
    const reader = new FileReader();

    reader.onload = function (e) {
        const pgnText = e.target.result;
        const moves = pgnText.split(/\d+\./).filter(move => move.trim() !== '');

        // Reset the chessboard and move list
        chessboard.innerHTML = '';
        moveList.length = 0;
        currentMoveIndex = 0;

        // Create the chessboard cells and add pieces
        for (let row = 0; row < 8; row++) {
            for (let col = 0; col < 8; col++) {
                const cell = document.createElement("div");
                cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");

                const piece = document.createElement("div");
                piece.classList.add("chess-piece");
                piece.innerHTML = startingPosition[row * 8 + col];

                cell.appendChild(piece);
                chessboard.appendChild(cell);
            }
        }

        // Parse and store PGN moves
        moves.forEach(move => {
            const moveText = move.trim().split(/\s+/);
            moveList.push(moveText);
        });

        // Initial display of the starting position
        displayMove(currentMoveIndex);
    };

    reader.readAsText(file);
}

function displayMove(index) {
    if (index < 0 || index >= moveList.length) {
        return;
    }

    const moveText = moveList[index];
    const from = moveText[0];
    const to = moveText[1];
    const fromIndex = squareToIndex(from);
    const toIndex = squareToIndex(to);

    const fromCell = chessboard.children[fromIndex];
    const toCell = chessboard.children[toIndex];

    // Check if there is a piece in the 'fromCell'
    const piece = fromCell.querySelector(".chess-piece");
    
    if (fromCell && toCell && piece) {
        toCell.appendChild(piece);
        console.log(`Move ${index + 1}: ${from} to ${to}`);
    }
}

function squareToIndex(square) {
    const file = square.charCodeAt(0) - 'a'.charCodeAt(0);
    const rank = 8 - parseInt(square[1]);
    return rank * 8 + file;
}

// Event listener for PGN file upload
pgnInput.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
        loadPGN(file);
    }
});

// Event listener for left arrow key (forward move)
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
        currentMoveIndex++;
        displayMove(currentMoveIndex);
    }
});

// Event listener for right arrow key (backward move)
document.addEventListener("keydown", function (e) {
    if (e.key === "ArrowRight") {
        currentMoveIndex--;
        displayMove(currentMoveIndex);
    }
});
