const chessboard = document.getElementById("chessboard");

// Chess piece symbols for the starting position
const pieces = [
    "♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜",
    "♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "",   "",   "",   "",   "",   "",   "",   "",
    "♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙",
    "♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖",
];

// Create the chessboard cells and add pieces
for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
        const cell = document.createElement("div");
        cell.classList.add("cell", (row + col) % 2 === 0 ? "white" : "black");
        
        const piece = document.createElement("div");
        piece.classList.add("chess-piece");
        piece.innerHTML = pieces[row * 8 + col];
        
        cell.appendChild(piece);
        chessboard.appendChild(cell);
    }
}
