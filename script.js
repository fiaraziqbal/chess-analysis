const chessboard = document.getElementById("chessboard");
const pgnInput = document.getElementById("pgnInput");

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

        // Reset the chessboard
        chessboard.innerHTML = '';

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

        // Move the pieces based on PGN moves
        moves.forEach((move, index) => {
            const moveText = move.trim().split(/\s+/);
            const from = moveText[0];
            const to = moveText[1];
            const fromIndex = squareToIndex(from);
            const toIndex = squareToIndex(to);

            setTimeout(() => {
                const fromCell = chessboard.children[fromIndex];
                const toCell = chessboard.children[toIndex];
                const piece = fromCell.querySelector(".chess-piece");

                if (fromCell && toCell && piece) {
                    toCell.appendChild(piece);
                }
            }, index * 1000); // Delay each move for 1 second (adjust as needed)
        });
    };

    reader.readAsText(file);
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
