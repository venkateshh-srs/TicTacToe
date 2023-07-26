let move = 0;
let arr = document.getElementsByClassName("box");
let container = document.querySelector(".container");
//reset board
function reset() {
  for (let i = 0; i < 9; i++) {
    arr[i].innerHTML = "";
    arr[i].style.color = "#1e2b30";
    turn = "X"; //other wise it starts with "O"
  }
  move = 0;
  document.getElementById("won").innerHTML = "";
  container.style.opacity = "1";
}

//check for win
function checkWin() {
  let pos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    let a = arr[pos[i][0]].innerHTML;
    let b = arr[pos[i][1]].innerHTML;
    let c = arr[pos[i][2]].innerHTML;
    if (a === "O" && b === "O" && c === "O") {
      document.getElementById("won").innerHTML = "You lost";
      document.getElementById("won").style.fontSize = "35px";
      container.style.opacity = "0.6";
      arr[pos[i][0]].style.color = "red";
      arr[pos[i][1]].style.color = "red";
      arr[pos[i][2]].style.color = "red";
      // container.style.cursor = "auto";

      return true;
    }
  }
  return false;
}
//check for draw
function checkDraw() {
  for (let i = 0; i < 9; i++) {
    if (arr[i].innerHTML === "") return false;
  }
  if (checkWin()) return false;
  document.getElementById("won").innerHTML = "Draw";
  document.getElementById("won").style.fontSize = "35px";
  container.style.opacity = "0.6";
  // container.style.cursor = "auto";
  return true;
}
//check wether human or computer can win in next move
let check = (cha) => {
  let pos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < 8; i++) {
    let a = arr[pos[i][0]].innerHTML;
    let b = arr[pos[i][1]].innerHTML;
    let c = arr[pos[i][2]].innerHTML;
    let sum = 0;
    if (
      (a === cha && b === cha && c === "") ||
      (a === cha && c === cha && b === "") ||
      (b === cha && c === cha && a === "")
    ) {
      if (a === cha) sum += ms[pos[i][0]];
      if (b === cha) sum += ms[pos[i][1]];
      if (c === cha) sum += ms[pos[i][2]];
      if (15 - sum >= 1 && 15 - sum <= 9) return 15 - sum;
    }
  }
  return -1;
};
//human plays
let hum = () => {
  for (let j = 0; j < 9; j++) {
    arr[j].addEventListener("click", () => {
      if (arr[j].innerHTML === "" && !checkWin()) {
        arr[j].innerHTML = "X";
        checkDraw();
        setTimeout(com, 400);
      }
    });
  }
};
//computer plays
let com = () => {
  if (arr[4].innerHTML === "") {
    arr[4].innerHTML = "O";
    move++;
    checkWin();
    checkDraw();
    hum();
    return;
  }
  //If  comp is making  first or second step at "1 st block",  these are possibilities for human to win so it is better to hard code them
  if (
    arr[5].innerHTML === "X" &&
    arr[7].innerHTML === "X" &&
    arr[8].innerHTML === "" &&
    move <= 1
  ) {
    arr[8].innerHTML = "O";
    move++;
    checkWin();
    checkDraw();
    hum();
    return;
  }
  //if computer made one move and it is second move for computer and the bord is in below format
  if (move === 1) {
    if (
      (arr[0].innerHTML === "X" && arr[8].innerHTML === "X") ||
      (arr[2].innerHTML === "X" && arr[6].innerHTML === "X")
    ) {
      let availableBlocks = [1, 3, 5, 7]; //0 indexed
      let randInd = Math.floor(Math.random() * 4); //generate index [0,3]
      move++;
      arr[availableBlocks[randInd]].innerHTML = "O";
      checkWin();
      checkDraw();
      hum();
      return;
    }
    if (arr[4].innerHTML === "X" && arr[8].innerHTML === "X") {
      arr[6].innerHTML = "O";
      move++;
      hum();
      checkDraw();
      checkWin();
      return;
    }
  }
  //check wether computer can win
  let checkO = check("O");
  if (checkO >= 1 && checkO <= 9) {
    if (arr[msind[checkO]].innerHTML === "") {
      arr[msind[checkO]].innerHTML = "O";
      move++;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  //check human can win
  let checkX = check("X");
  if (checkX >= 1 && checkX <= 9) {
    if (arr[msind[checkX]].innerHTML === "") {
      arr[msind[checkX]].innerHTML = "O";
      move++;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  //Random move if no logic

  for (let i = 0; i < 9; i++) {
    if (arr[i].innerHTML === "") {
      arr[i].innerHTML = "O";
      move++;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
};
//Initilly human starts the game
hum();
//magic square
let ms = [2, 7, 6, 9, 5, 1, 4, 3, 8];
//magic square indices
let msind = [-1, 5, 0, 7, 6, 4, 2, 1, 8, 3];
