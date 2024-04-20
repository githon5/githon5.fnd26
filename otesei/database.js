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

const otetudai = {
  otetudai001:["窓ふき（１枚）", 30],
  otetudai002:["トイレ掃除１F", 100],
  otetudai003:["トイレ掃除２F", 100],
  otetudai004:["お風呂掃除", 100],
  otetudai005:["洗濯物干し", 100],
  otetudai006:["床拭き", 100],
  otetudai007:["お使い", 100],
}