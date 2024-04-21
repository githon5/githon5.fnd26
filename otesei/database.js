'use strict'
// 1行目に記載している 'use strict' は削除しないでください

const users = [
  {
    UserID: "01",
    Name: "haruki",
    Fampro: "children",
    Pass: "",
    Database: "harukiDb",

  },
  {
    UserID: "02",
    Name: "takato",
    Fampro: "children",
    Pass: "",
    Database: "takatoDb",

  },
  {
    UserID: "03",
    Name: "mama",
    Fampro: "parents",
    Pass: "pwd123",
    Database: "mamaDb",

  },
  {
    UserID: "04",
    Name: "papa",
    Fampro: "parents",
    Pass: "pwd123",
    Database: "papaDb",

  }
];

let loginInfo = {
  userID: "",
  Name: "",
  Fampr: "",
};

const parentsPwd = {
  Password: "pass123",
};

const otetudai = { //[お手伝い名, ポイント単価, 実施回数]
  otetudai000:["窓ふき（１枚）", 30, 0],
  otetudai001:["トイレ掃除１F", 100, 0],
  otetudai002:["トイレ掃除２F", 100, 0],
  otetudai003:["お風呂掃除",    100, 0],
  otetudai004:["洗濯物干し",    100, 0],
  otetudai005:["床拭き",        100, 0],
  otetudai006:["お使い",        100, 0],
}

//現在ポイント
let harukiPoint = 0;
let takatoPoint = 0;

const shituke = { //[しつけ名, ポイント単価]
  shituke000: ["◆しつけ項目を選択◆",       0],
  shituke001: ["片付けできていない",       -50],
  shituke002: ["時間が守れていない",       -50],
  shituke003: ["交通ルールが守れていない", -50],
  shituke004: ["静かにできない",           -30],
  shituke005: ["他人に優しくできない",    -100],
}