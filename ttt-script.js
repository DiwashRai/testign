let boardState;
const crosses = 'X';
const naughts = 'O';
let huPlayer = naughts;
let aiPlayer = crosses;
const winStates = [
    [ 0, 1, 2 ],
    [ 3, 4, 5 ],
    [ 6, 7, 8 ],
    [ 0, 3, 6 ],
    [ 1, 4, 7 ],
    [ 2, 5, 8 ],
    [ 0, 4, 8 ],
    [ 2, 4, 6 ],
]

let cells = document.querySelectorAll('.ttt-board td');
document.getElementById('ai-first').addEventListener('click', aiFirstClick, false);
document.getElementById('player-first').addEventListener('click', playerFirstClick, false);
resetGame();

function aiFirstClick() {
    aiPlayer = crosses;
    huPlayer = naughts;
    resetGame();
}

function playerFirstClick() {
    huPlayer = crosses;
    aiPlayer = naughts;
    resetGame();
}


function playerClick(event) {
    makeMove(event.target.id, huPlayer);
    let gameWon = checkWin(boardState, huPlayer);
    if (gameWon) endGame(gameWon);
    else if (checkTie(boardState)) displayOutcome("It's a tie!");
    else {
        aiTurn(boardState);
        gameWon = checkWin(boardState, aiPlayer);
        if (gameWon) endGame(gameWon);
        else if (checkTie(boardState)) displayOutcome("It's a tie!");
    }
}

function makeMove(id, ch) {
    document.getElementById(id).innerText = ch;
    document.getElementById(id).removeEventListener('click', playerClick);
    document.getElementById(id).style.cursor = 'default';
    boardState[id] = ch;
}

function checkWin(board, player) {
    let moves = board.reduce( (accumulator, element, index) => (element === player) ? accumulator.concat(index) : accumulator, []);
    let gameWon = null;
    for ([index, winState] of winStates.entries()) {
        if (winState.every(element => moves.indexOf(element) > -1)) {
            gameWon = {'index': index, 'player': player};
            break;
        }
    }
    return gameWon;
}

function endGame(gameWon) {
    displayOutcome(gameWon.player + " Wins!");
    for (cell of cells) {
        cell.style.cursor = "default";
        cell.removeEventListener('click', playerClick);
    }
    
    if (gameWon.player === huPlayer) {
        for (let i = 0; i < winStates[gameWon.index]; i++){
            document.getElementById(winStates[gameWon.index][i]).style.backgroundColor = 'green';
        }
    } else if (gameWon.player === aiPlayer) {
        for (let i = 0; i < winStates[gameWon.index].length; i++){
            document.getElementById(winStates[gameWon.index][i]).style.backgroundColor = 'red';
        }
    }
}

function availCells(board) {
    return board.filter(cell => typeof cell == 'number');
}

function checkTie(board) {
    if (availCells(board).length > 0) return false;
    else return true;
}

function displayOutcome(string) {
    element = document.getElementById('outcome');
    element.innerText = string;
    element.style.visibility = 'visible';
}

function resetGame() {
    document.getElementById('ai-role').innerText = "AI: " + aiPlayer;
    document.getElementById('player-role').innerText= "  Player : " + huPlayer; 
    boardState = Array.from(Array(9).keys());
    for (let cell of cells) {
        cell.style.backgroundColor = "";
        cell.innerText = '';
        cell.addEventListener('click', playerClick, false);
        cell.style.cursor = 'pointer';
    }
    document.getElementById('outcome').innerText = '';
    document.getElementById('outcome').style.visibility = 'hidden';
    if (aiPlayer === crosses) {
        switch (Math.floor(Math.random() * 4)) {
            case 0:
                makeMove(0, aiPlayer);
                break;
            case 1:
                makeMove(2, aiPlayer);
                break;
            case 2:
                makeMove(6, aiPlayer);
                break;
            case 3:
                makeMove(8, aiPlayer);
        }
    }
}

function aiTurn(board) {
    let bestMove = minimax(board, aiPlayer);
    console.log(bestMove);
    console.log(board);
    makeMove(bestMove.index, aiPlayer);
}

function minimax(board, player) {
    let possMoves = availCells(board);

    if (checkWin(board, huPlayer)) {
        return {score: -10};
    } else if (checkWin(board, aiPlayer)) {
        return {score: 10};
    } else if (possMoves.length === 0) {
        return {score: 0};
    }

    let moves = [];
    for (let i = 0; i < possMoves.length; i++) {
        let move = {};
        move.index = board[possMoves[i]];

        board[move.index] = player;

        if (player === aiPlayer) {
            let result = minimax(board, huPlayer);
            move.score = result.score;
        } else {
            let result = minimax(board, aiPlayer);
            move.score = result.score;
        }

        board[move.index] = move.index;
  
        moves.push(move);
    }

    let bestMove;
    if (player === aiPlayer) {
        let bestScore = -1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score > bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    } else {
        let bestScore = 1000;
        for (let i = 0; i < moves.length; i++) {
            if (moves[i].score < bestScore) {
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }

    return moves[bestMove];
}