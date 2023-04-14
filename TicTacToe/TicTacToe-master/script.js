let arr = document.getElementsByClassName("box");
let flag = 1;
//reset board
reset = () => {
  for (let i = 0; i < 9; i++) {
    arr[i].innerHTML = "";
    turn = "X"; //other wise it starts with O
  }
  document.getElementById("won").innerHTML = "";
  flag = 1;
};

//check for win
checkWin = () => {
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
      document.getElementById("won").style.fontSize = "25px";
      document.getElementById("won").style.fontWeight = "400";
      return true;
    }
  }
  return false;
};
//check for draw
checkDraw = () => {
  for (let i = 0; i < 9; i++) {
    if (arr[i].innerHTML === "") return false;
  }
  if (checkWin()) return false;
  document.getElementById("won").innerHTML = "Draw";
  document.getElementById("won").style.fontSize = "25px";
  document.getElementById("won").style.fontWeight = "400";
  return true;
};
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
      if (arr[j].innerHTML === "" && !checkWin() && flag === 1) {
        arr[j].innerHTML = "X";
        flag = 0;
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
    flag = 1;
    hum();
    return;
  }
  //check wether computer can win
  let checkO = check("O");
  if (checkO >= 1 && checkO <= 9) {
    if (arr[msind[checkO]].innerHTML === "") {
      arr[msind[checkO]].innerHTML = "O";
      flag = 1;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  //check human can win
  let checkX = check("X");
  if (checkX >= 1 && checkX <= 9) {
    console.log(checkX);
    if (arr[msind[checkX]].innerHTML === "") {
      arr[msind[checkX]].innerHTML = "O";
      flag = 1;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  //Random move if no logic
  for (let i = 0; i < 9; i += 6) {
    if (arr[i].innerHTML === "") {
      arr[i].innerHTML = "O";
      flag = 1;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  for (let i = 2; i < 9; i += 6) {
    if (arr[i].innerHTML === "") {
      arr[i].innerHTML = "O";
      flag = 1;
      checkWin();
      checkDraw();
      hum();
      return;
    }
  }
  for (let i = 0; i < 9; i++) {
    if (arr[i].innerHTML === "") {
      arr[i].innerHTML = "O";
      flag = 1;
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
