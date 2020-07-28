

var userInput= {
  namer : function (player) {
    var name = window.prompt('What is the name of ' + player + '?');
    if (!name) {
      name = player;
    }
    return name;
  },
  restart : function() {
    document.getElementById('restart').addEventListener('click', event => {

      for (let i = 0; i < presentation.cells.length; i++) {
        presentation.cells[i].innerText = ' ';
      }
      for (var each in state.solver) {
        state.solver[each] = 0;
      }
      presentation.deg = 0;
      state.count = 0;
      document.getElementById('board').style = ' ';
    })
  },
  extreme: function() {
    var button = document.getElementById('extreme');
    button.addEventListener('click', event => {
      state.extreme = !state.extreme;
      if (state.extreme) {
        button.innerText = 'Extreme: ON';
      } else {
        button.innerText = 'Extreme: OFF';
      }
    })
  }
}



var state = {
  solver : {
    top : 0,
    middle : 0,
    bottom : 0,
    diagOne : 0,
    left : 0,
    right : 0,
    center : 0,
    diagTwo : 0,
  },
  count : 0,
  P1 : 'X',
  P2 : 'O',
  Oscore: 0,
  Xscore: 0,
  extreme: true,
  winCheck: function() {
    var gameOver = false;
    var winner = null;
    var count = 0;
    for (var each in state.solver) {
      if (state.solver[each] > 2 || state.solver[each] < -2) {
        gameOver = true;
        if (state.solver[each] > 0) {
          count ++;
        } else {
          count --;
        }
      }
    }
    if (gameOver) {
      if (count > 0) {
        winner = 'X';
      } else if (count < 0) {
        winner = 'O';
      } else {
        return (() => {
          setTimeout(() => presentation.decWinner('CATS GAME!'), 100);
          document.getElementsById('restart').click();
        })();
      }
      setTimeout(() => presentation.decWinner(winner + ' WINS!'), 100);
      state.P1 = winner;
      winner === 'X' ?  state.Xscore ++ : state.Oscore ++;
      presentation.score.X.innerText = state.Xscore;
      presentation.score.O.innerText = state.Oscore;
      state.P1 === 'X'? state.P2 = 'O' : state.P2 = 'X';
    } else if (state.count >= 9) {
        setTimeout(() => presentation.decWinner('CATS GAME!'), 100);
        document.getElementsById('restart').click();
    }
  },
  check: function (player, positions, callback = () => {}) {
    var add = 0;
    if (player === state.P1) {
      add ++;
    } else {
      add --;
    }
    for (let j = 1; j < positions.length; j++){
      state.solver[positions[j]] += add;
    }
    callback();
  }
}



var presentation = {
  nameOfX : userInput.namer('Player 1'),
  nameOfO : userInput.namer('Player 2'),
  score : {
    X : document.getElementById('Xscore'),
    O : document.getElementById('Oscore')
  },
  cells: document.getElementsByClassName('square'),
  cellStyle: 'height: 50px; width: 50px; border: solid black 5px; font-size: 40px; text-align: center;',
  initialize: () => {
    presentation.updater('Xname', presentation.nameOfX + ':');
    presentation.updater('Oname', presentation.nameOfO + ':');
    presentation.updater('Xscore', state.Xscore);
    presentation.updater('Oscore', state.Oscore);
    presentation.cellSetup();
    userInput.restart();
  },
  cellSetup: function() {
    for (let i = 0; i < presentation.cells.length; i++) {
      presentation.cells[i].style = this.cellStyle;
      presentation.cells[i].addEventListener('click', event => {
        var adjust = presentation.cells[i].className.split(' ');
        if (presentation.cells[i].innerText !== 'X' && presentation.cells[i].innerText !== 'O') {
          state.count ++;
          if (state.count%2) {
            presentation.cells[i].innerText = state.P1 ;
            if (state.extreme) {
              presentation.extreme();
            } else {
              state.check(state.P1, adjust, state.winCheck);
            }
          } else {
            presentation.cells[i].innerText = state.P2 ;
            if (state.extreme) {
              presentation.extreme();
            } else {
              state.check(state.P2, adjust, state.winCheck);
            }
          }
        }
      });
    }
  },
  updater: function(id, change) {
    document.getElementById(id).innerText = change;
  },
  decWinner: function(message) {
    alert(message);
    document.getElementById('restart').click();
  },
  extreme: function() {
    var board = document.getElementById('board');
    var before = presentation.deg;
    if (presentation.deg === 360) {
      presentation.deg = 90;
      before = 0;
    } else {
      presentation.deg += 90;
    }

    var speed = setInterval(rotate, 20);

    function rotate() {
      if (before >= presentation.deg) {
        clearInterval(speed);
        drop();
      } else {
        before ++;
        board.style.transform = 'rotate(' + before + 'deg)';
      }
    }
    function drop() {
      var bottom = ['bottom', 'right', 'top', 'left'];
      var deg = [360, 90, 180, 270];
      var index = deg.indexOf(presentation.deg);
      var currentPos = [];
      var actualPos = [];
      var gravityPos = [];
      var changeBy = {
        bottom : [0, 1, 2, 3, 4, 5, 6, 7, 8],
        right : [6, 3, 0, 7, 4, 1, 8, 5, 2],
        top : [8, 7, 6, 5, 4, 3, 2, 1, 0],
        left : [2, 5, 8, 1, 4, 7, 0, 3, 6]
      }
      var adjusted = changeBy[bottom[index]];
      var backAdj = adjusted;
      if (index % 2) {
        if (index - 2 < 0){
          backAdj = changeBy[bottom[index + 2]];
        } else {
          backAdj = changeBy[bottom[index - 2]];
        }

      }



      for (let i=0; i < presentation.cells.length; i++) {
        if (presentation.cells[i].innerText === 'X') {
          currentPos.push(1);
        } else if (presentation.cells[i].innerText === 'O') {
          currentPos.push(-1);
        } else {
          currentPos.push(0);
        }
      }
      for (let i = 0; i < presentation.cells.length; i++) {
        actualPos[i] = currentPos[adjusted[i]];
      }

      for (let i = actualPos.length - 1; i >= 0; i--) {
        if (actualPos[i+6] === 0) {
          actualPos[i+6] = actualPos[i];
          actualPos[i] = 0;
        } else if (actualPos[i+3] === 0) {
          actualPos[i+3] = actualPos[i];
          actualPos[i] = 0;
        }
      }
      for (let i = 0; i < actualPos.length; i++) {
        currentPos[i] = actualPos[backAdj[i]];
      }

      presentation.clear();

      for (let i = currentPos.length - 1; i >= 0; i--) {
        var adjust = presentation.cells[i].className.split(' ');
        if (currentPos[i] > 0) {
          presentation.cells[i].innerText = 'X';
          state.check(state.P1, adjust);
        } else if (currentPos[i] < 0) {
          presentation.cells[i].innerText = 'O';
          state.check(state.P2, adjust);
        } else {
          presentation.cells[i].innerText = ' ';
        }
      }
      state.winCheck();
    }
  },
  deg: 0,
  clear: function() {
    for (let i = 0; i < presentation.cells.length; i++) {
      presentation.cells[i].innerText = ' ';
    }
    for (var each in state.solver) {
      if (each !== 'count') {
        state.solver[each] = 0;
      }
    }
  }
}


presentation.initialize();










//RESTART THE GAME

// var leftBlocks = document.getElementsByClassName('left');
// var rightBlocks = document.getElementsByClassName('right');
// var topBlocks = document.getElementsByClassName('top');
// var bottomBlocks = document.getElementsByClassName('bottom');

// //Styling the blocks

// for (let i = 0; i < 3; i++) {
//   leftBlocks[i].style = "font-size = 70px;"
//   //border-right: solid black 5px;"
// }

//event.listener