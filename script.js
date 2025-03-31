const puzzleContainer = document.getElementById("puzzle-container");
const message = document.getElementById("message");
const shuffleBtn = document.getElementById("shuffle-btn");

let tiles = [1, 2, 3, 4, 5, 6, 7, 8, null]; // null = empty space

function renderPuzzle() {
  puzzleContainer.innerHTML = "";
  tiles.forEach((tile, index) => {
    const tileDiv = document.createElement("div");
    tileDiv.classList.add("tile");
    if (tile === null) {
      tileDiv.classList.add("empty");
    } else {
      tileDiv.textContent = tile;
      tileDiv.addEventListener("click", () => handleTileClick(index));
    }
    puzzleContainer.appendChild(tileDiv);
  });
}

function handleTileClick(index) {
  const emptyIndex = tiles.indexOf(null);
  const validMoves = [index - 1, index + 1, index - 3, index + 3];
  if (validMoves.includes(emptyIndex) &&
    isAdjacent(index, emptyIndex)) {
    [tiles[index], tiles[emptyIndex]] = [tiles[emptyIndex], tiles[index]];
    renderPuzzle();
    checkWin();
  }
}

function isAdjacent(i, j) {
  const rowI = Math.floor(i / 3);
  const rowJ = Math.floor(j / 3);
  const colI = i % 3;
  const colJ = j % 3;
  return (Math.abs(rowI - rowJ) + Math.abs(colI - colJ)) === 1;
}

function checkWin() {
  const winningTiles = [1, 2, 3, 4, 5, 6, 7, 8, null];
  const isWin = tiles.every((val, i) => val === winningTiles[i]);
  if (isWin) {
    message.textContent = "🎉 You win!";
  } else {
    message.textContent = "";
  }
}

function shuffleTiles() {
  do {
    tiles = tiles.sort(() => Math.random() - 0.5);
  } while (!isSolvable(tiles) || tiles.every((val, i) => val === [1,2,3,4,5,6,7,8,null][i]));
  renderPuzzle();
}

function isSolvable(arr) {
  const a = arr.filter(x => x !== null);
  let inversions = 0;
  for (let i = 0; i < a.length - 1; i++) {
    for (let j = i + 1; j < a.length; j++) {
      if (a[i] > a[j]) inversions++;
    }
  }
  return inversions % 2 === 0;
}

shuffleBtn.addEventListener("click", shuffleTiles);

// Start the game
renderPuzzle();
