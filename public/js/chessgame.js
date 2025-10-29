
const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let draggedPiece = null;
let sourceSquare = null;
let playerRole= null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";

    board.forEach((row, rowIndex) => {
        row.forEach((square, squareIndex) => {
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",
                (rowIndex + squareIndex) % 2 === 0 ? "light" : "dark"
            );

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareIndex;

            if (square) {
                const pieceElement = document.createElement("div");
                pieceElement.classList.add(
                    "piece",
                    square.color === "w" ? "white" : "black"
                );

                pieceElement.innerText = getPieceUnicode(square); // optional
                pieceElement.draggable = playerRole === square.color;

                pieceElement.addEventListener("dragstart", (e) => {
                    if (pieceElement.draggable) {
                        draggedPiece = pieceElement;
                        sourceSquare = { row: rowIndex, col: squareIndex };
                        e.dataTransfer.setData("text/plain", "");
                    }
                });

                pieceElement.addEventListener("dragend", () => {
                    draggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            }
            squareElement.addEventListener("dragover",function(e){
                e.preventDefault();
            });

            if(draggedPiece){
                const targetSource ={
                    row: parseInt(squareElement.dataset.row),
                    col: parseInt(squareElement.dataset.col),
                };
                handleMove(sourceSquare,targetSource);

            }

            boardElement.appendChild(squareElement);
        });

    });
    
};

const handleMove = () => {};
const getPieceUnicode = (square) => {
  if (!square) return "";

  const unicodePieces = {
    p: "♟", // black pawn
    r: "♜", // black rook
    n: "♞", // black knight
    b: "♝", // black bishop
    q: "♛", // black queen
    k: "♚", // black king
    P: "♙", // white pawn
    R: "♖", // white rook
    N: "♘", // white knight
    B: "♗", // white bishop
    Q: "♕", // white queen
    K: "♔", // white king
  };

  // `square.type` gives you the lowercase letter of the piece (from chess.js)
  // if it's white, convert to uppercase to match keys
  const pieceChar =
    square.color === "w"
      ? square.type.toUpperCase()
      : square.type.toLowerCase();

  return unicodePieces[pieceChar] || "";
};


renderBoard();
