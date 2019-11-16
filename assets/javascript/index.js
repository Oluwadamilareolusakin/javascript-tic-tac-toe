let game;

class Board{
  constructor(){
    this.currentBoard = ['-','-','-','-','-','-','-','-','-'];
  }
}

const player = (name) => {
  const getName = () => name;
  this.symbol = null;
  return {getName, symbol};
}

class Game{
  constructor(name1, name2){
    this.player1 = player(name1);
    this.player2 = player(name2);
    this.player1.marker = 'X';
    this.player2.marker = 'O';
    this.currentPlayer = this.player1;
    this.board = new Board();
    this.moveCount = 0;
    this.renderBoard(this.currentPlayer);
  }

  gameOver = () => {
    if (this.isWinningMove() || this.isDraw()) return true;
  }

  isDraw = () => {
    if (this.moveCount == 9 && !this.isWinningMove()){
      return true;
    }
    return false;
  }

  move = (square) => {
    if (this.gameOver()) return;
    let currentPlayer = this.currentPlayer;
    this.board.currentBoard[square] = currentPlayer.marker;
    if (this.isWinningMove()){
      this.renderBoard(currentPlayer);
      return;
    }
    if (currentPlayer == this.player1) this.currentPlayer = this.player2;
    if (currentPlayer == this.player2) this.currentPlayer = this.player1;
    this.moveCount++
    this.renderBoard(this.currentPlayer);
  }

  renderBoard = (currentPlayer) => {
    let count = 0;
    const display = document.querySelector('#display');
    const gameBoard = document.querySelector('.board')
    if (this.isWinningMove()){
      display.innerHTML = `<p>${currentPlayer.getName()} won! Play again?</p>`;   
      
    } else if (this.isDraw()) {
      display.innerHTML = `<p>It's a draw! No winners here, only those who lost at winning</p>`;
    } else {
      display.innerHTML = `<p>${currentPlayer.getName()}'s turn to play</p>`;
    }
  
    const squares = this.board.currentBoard.map((square) => 
      `<div class = 'square row' onclick = 'requestMove(${count++})'>
          ${square}
        </div>`
        ).join('')
        
    gameBoard.innerHTML = squares;
    
  }

  diagonalWin = () => {
    if (this.board.currentBoard[0] == this.board.currentBoard[4] && this.board.currentBoard[4] == this.board.currentBoard[8] && this.board.currentBoard[0] != '-') return true;
    if (this.board.currentBoard[2] == this.board.currentBoard[4] && this.board.currentBoard[4] == this.board.currentBoard[6] && this.board.currentBoard[2] != '-') return true;
    return false;  
  }

  verticalWin = () => {
    if (this.board.currentBoard[0] == this.board.currentBoard[3] && this.board.currentBoard[3] == this.board.currentBoard[6] && this.board.currentBoard[0] != '-') return true;
    if (this.board.currentBoard[1] == this.board.currentBoard[4] && this.board.currentBoard[4] == this.board.currentBoard[7] && this.board.currentBoard[1] != '-') return true;
    if (this.board.currentBoard[2] == this.board.currentBoard[5] && this.board.currentBoard[5] == this.board.currentBoard[8] && this.board.currentBoard[2] != '-') return true;
    return false;  
  }

  horizontalWin = () => {
    if (this.board.currentBoard[0] == this.board.currentBoard[1] && this.board.currentBoard[1] == this.board.currentBoard[2] && this.board.currentBoard[0] != '-') return true;
    if (this.board.currentBoard[3] == this.board.currentBoard[4] && this.board.currentBoard[4] == this.board.currentBoard[5] && this.board.currentBoard[3] != '-') return true;
    if (this.board.currentBoard[6] == this.board.currentBoard[7] && this.board.currentBoard[7] == this.board.currentBoard[8] && this.board.currentBoard[6] != '-') return true;
    return false;  
  }

  isWinningMove = () => {
    if(this.horizontalWin() || this.verticalWin() || this.diagonalWin()) return true;
    return false;
  }

  isValidMove = (square) => {
    if (this.board.currentBoard[square] === '-') return true;  
    return false;
  }
}

const startGame = (e) => {
  e.preventDefault();
  const players = document.querySelector('.player-details-form');
  name1 = players[0].value;
  name2 = players[1].value;
  if (name2 === '' || name1 === ''){
    alert('Enter valid player names');
    return;
  }
  game = new Game(name1, name2);
  toggleModal();
}

const newGame = () => {
  const modal = document.querySelector('.form-holder');
  modal.classList.toggle('closed');
}

const toggleModal = () => {
  const modal = document.querySelector('.form-holder');
  modal.classList.toggle('closed');
}

const requestMove = (square) => {
  if (game.isValidMove(square)){
   game.move(square);
  }
}

const reset = () => {
  game = new Game();
  game.renderBoard(game.currentPlayer);
} 