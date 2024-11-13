const cells = document.querySelectorAll(".square");
const statusText = document.createElement("h3");
document.body.insertBefore(statusText, document.querySelector(".container"));
const restartBtn = document.querySelector("#restartBtn");

const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]             
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame() {
    cells.forEach((cell, index) => {
        cell.setAttribute("cellIndex", index);
        cell.addEventListener("click", cellClicked);
    });

    restartBtn.addEventListener("click", restartGame);

    
    document.querySelector("#x").addEventListener("click", () => selectPlayer("X"));
    document.querySelector("#o").addEventListener("click", () => selectPlayer("O"));

    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    updateLabelHighlight();
}

function selectPlayer(player) {
    if (running) return; 
    currentPlayer = player;
    statusText.textContent = `${currentPlayer}'s turn`;
    running = true;
    updateLabelHighlight();
}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] !== "" || !running) return;

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer() {
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn`;
    
    document.querySelector(`#${currentPlayer.toLowerCase()}`).checked = true;
    updateLabelHighlight();
}

function updateLabelHighlight() {
    document.querySelectorAll(".radio-toolbar label").forEach(label => {
        label.style.backgroundColor = label.htmlFor === currentPlayer.toLowerCase() ? "rgb(39, 119, 39)" : "black";
    });
}

function checkWinner() {
    let roundWon = false;

    for (let i = 0; i < winConditions.length; i++) {
        const [a, b, c] = winConditions[i];
        const cellA = options[a];
        const cellB = options[b];
        const cellC = options[c];

        if (cellA === "" || cellB === "" || cellC === "") continue;

        if (cellA === cellB && cellB === cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `Congratulations, ${currentPlayer} wins!`;
        running = false;
        updateLabelHighlight();
    } else if (!options.includes("")) {
        statusText.textContent = `Oh no, It's a draw!`;
        running = false;
    } else {
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn`;
    cells.forEach(cell => (cell.textContent = ""));
    running = true;
    updateLabelHighlight();
}
