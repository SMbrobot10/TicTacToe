

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
    count : 0,
  },
  P1 : 'X',
  P2 : 'O',
  Oscore: 0,
  Xscore: 0,
  extreme: true,
  winCheck: function(winner, num) {
    if (num > 2 || num < -2) {
      setTimeout(() => presentation.decWinner(winner + ' WINS!'), 100);
      state.P1 = winner;
      console.log('Player One is now: ', state.P1);
      winner === 'X' ? presentation.score.X.innerText = state.Xscore ++ : presentation.score.O.innerText = state.Xscore ++;
      state.P1 === 'X'? state.P2 = 'O' : state.P2 = 'X';
      console.log('Player Two is now: ', state.P2);
    } else {
    }
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
          state.solver.count ++;
          if (state.solver.count%2) {
            presentation.cells[i].innerText = state.P1 ;
            if (state.extreme) {
              presentation.extreme();
            }
            for (let j = 1; j < adjust.length; j++) {
              state.solver[adjust[j]] ++;
              state.winCheck(state.P1, state.solver[adjust[j]]);
            }
          } else {
            presentation.cells[i].innerText = state.P2 ;
            if (state.extreme) {
              presentation.extreme();
            }
            for (let j = 1; j < adjust.length; j++) {
              state.solver[adjust[j]] --;
              state.winCheck(state.P2, state.solver[adjust[j]]);
            }
          }
          if (state.solver.count >= 9) {
            setTimeout(() => presentation.decWinner('CATS GAME!'), 100);
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
  },
  extreme: function() {
    presentation.deg === 270 ? presentation.deg = 0 : presentation.deg += 90;
    var board = document.getElementById('board');
    board.style.transform = 'rotate(' + presentation.deg + 'deg)';
  },
  deg: 0
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