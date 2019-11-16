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

  
}

