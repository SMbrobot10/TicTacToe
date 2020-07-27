

var cells = document.getElementsByClassName('square');
console.log('cells: ', cells)
var count = 0;
var solver = {
  top : 0,
  middle : 0,
  bottom : 0,
  diagOne : 0,
  left : 0,
  right : 0,
  center : 0,
  diagTwo : 0
}

for (let i = 0; i < cells.length; i++) {
  cells[i].style = 'height: 50px; width: 50px; border: solid black 5px; font-size: 40px;';
  cells[i].addEventListener('click', event => {
    var adjust = cells[i].className.split(' ');
    if (cells[i].innerText !== 'X' && cells[i].innerText !== 'O') {
      if (count%2) {
        cells[i].innerText = 'O' ;
        for (let j = 1; j < adjust.length; j++) {
          solver[adjust[j]] --;
          if (solver[adjust[j]] === -3) {
            setTimeout(() => alert('O WINS!'), 100);
          }
        }
      } else {
        cells[i].innerText = 'X' ;
        for (let j = 1; j < adjust.length; j++) {
          solver[adjust[j]] ++;
          if (solver[adjust[j]] === 3) {
            setTimeout(() => alert('X WINS!'), 100);
          }
        }
      }
      count ++;
    }
    if (count >= 9) {
      setTimeout(() => alert('CATS GAME!'), 100);
    }
  })
}



//RESTART THE GAME
document.getElementById('restart').addEventListener('click', event => {

  for (let i = 0; i < cells.length; i++) {
    cells[i].innerText = ' ';
  }
  for (var each in solver) {
    solver[each] = 0;
  }
  count = 0;
})

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