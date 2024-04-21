'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// ログイン後のページでユーザー名を表示
const username = localStorage.getItem('username');
if (username) {
  document.getElementById('loginUserName').textContent = `ようこそ、${username}！`;
} else {
  window.location.href = 'otesei_index.html';
}

// 1. 追加したい親要素を取得する
const elImgTagUserIcon = document.getElementById("loginUserIcon");
// 2. innerHTMLで要素の生成と追加を同時にする！
elImgTagUserIcon.innerHTML = `<img src="otesei_img/` + username + `.png" height="50">`;
// 3. 追記は「 += 」
elImgTagUserIcon.innerHTML += "<br>";



//受信した実施お手伝いオブジェクトをブラウザストレージから取得
//localStorageは収納時に文字列変換されてしまうので、取得時にJSONでオブジェクトに戻している。
let harukiSent = JSON.parse(localStorage.getItem(`harukiDone`));
console.log("▽はるき実施お手伝い[内容, ﾎﾟｲﾝﾄ単価, 実施回数]▽");
console.log(harukiSent);

let takatoSent = JSON.parse(localStorage.getItem(`takatoDone`));
console.log("▽たかと実施お手伝い[内容, ﾎﾟｲﾝﾄ単価, 実施回数]▽");
console.log(takatoSent);


//お手伝い受信リスト初期化
let numH = 0;
let numT = 0;
let harukiSentKeys = [];
let takatoSentKeys = [];
//はるき受信リスト
const elRecieveListHaruki = document.getElementById("elRecieveListHaruki"); //ID名の要素取得
for (const key in harukiSent) {
  let username = "haruki";
  if (harukiSent[key][2] !== 0) {
    harukiSentKeys.push(key); //受信した実施お手伝いkeyのリスト作成
  }
  let otetudaiName = harukiSent[key][0];
  let otetudaiPoint = harukiSent[key][1];
  for (let i = 1; i <= harukiSent[key][2]; i++) { //実施回数分繰り返し表示
    let buttonIdH = `buttonH${numH}`
    elRecieveListHaruki.innerHTML += `<div style="border: #ffb6c1 solid 1px; border-left: #ffb6c1 solid 10px; padding: 20px; background: #fff; font-size: 100%;">
    　${username}：${otetudaiName}：${otetudaiPoint}ポイント　${i}回目／全${harukiSent[key][2]}回
    　<input type="button" id=${buttonIdH} value="　← 承 認　" /></div><br>`;
    numH++;
  }
}
//たかと受信リスト
const elRecieveListTakato = document.getElementById("elRecieveListTakato"); //ID名の要素取得
for (const key in takatoSent) {
  let username = "takato";
  if (takatoSent[key][2] !== 0) {
    takatoSentKeys.push(key); //受信した実施お手伝いkeyのリスト作成
  }
  let otetudaiName = takatoSent[key][0];
  let otetudaiPoint = takatoSent[key][1];
  for (let i = 1; i <= takatoSent[key][2]; i++) { //実施回数分繰り返し表示
    let buttonIdT = `buttonT${numT}`;
    elRecieveListTakato.innerHTML += `<div style="border: #ffb6c1 solid 1px; border-left: #ffb6c1 solid 10px; padding: 20px; background: #fff; font-size: 100%;">
    　${username}：${otetudaiName}：${otetudaiPoint}ポイント　${i}回目／全${takatoSent[key][2]}回
    　<input type="button" id=${buttonIdT} value=" ←　承 認　" />
    </div><br>`;
    numT++;
  }
}

//現在ポイント
//★最初期　現在ポイント：NaNになってしまう時はブラウザコンソール上でharukiPointNow = 0;で初期化する必要あり。
//localStorageは収納時に文字列に変換されてしまうので、parseInt()で文字列⇒数字変換
const elDispPointNowH = document.getElementById("harukiDispPointNow");
elDispPointNowH.innerText = parseInt(localStorage.getItem("harukiPointStr"));
const elDispPointNowT = document.getElementById("takatoDispPointNow");
elDispPointNowT.innerText = parseInt(localStorage.getItem("takatoPointStr"));


//「←承認」ボタン押下時
let userPointNow;
function syounin(nameIn) {
  let numBotton;
  if (nameIn === "haruki") {
    numBotton = numH
  } else if (nameIn === "takato") {
    numBotton = numT
  }
  for (let i = 0; i < numBotton; i++) {
    let idButton;
    if (nameIn === "haruki") {
      idButton = `buttonH${i}`;
    } else if (nameIn === "takato") {
      idButton = `buttonT${i}`;
    }
    const elButtonPushed = document.getElementById(idButton);
    elButtonPushed.addEventListener("click", () => {
      let arrKeyOfPoint;
      let userPointNow;
      let userSentObj;
      if (nameIn === "haruki") {
        arrKeyOfPoint = harukiSentKeys;
        userPointNow = parseInt(localStorage.getItem("harukiPointStr"));
        userSentObj = harukiSent;
      } else if (nameIn === "takato") {
        arrKeyOfPoint = takatoSentKeys;
        userPointNow = parseInt(localStorage.getItem("takatoPointStr"));
        userSentObj = takatoSent;
      }
      let keyOfPoint = arrKeyOfPoint[i]; //押下した「承認」ボタンのotetudaiオブジェクトのkey
      console.log(userSentObj[keyOfPoint]); //押下した「承認」ボタンの受信リストの中のエレメント[項目,ポイント,回数]
      console.log(userSentObj[keyOfPoint][1]);
      userPointNow += userSentObj[keyOfPoint][1];
      if (nameIn === "haruki") {
        localStorage.setItem("harukiPointStr", userPointNow);
        const elDispPointNowH = document.getElementById("harukiDispPointNow");
        elDispPointNowH.innerText = parseInt(localStorage.getItem("harukiPointStr"));
      } else if (nameIn === "takato") {
        localStorage.setItem("takatoPointStr", userPointNow);
        const elDispPointNowT = document.getElementById("takatoDispPointNow");
        elDispPointNowT.innerText = parseInt(localStorage.getItem("takatoPointStr"));
      }

    })
  }
}

syounin("haruki");
syounin("takato");

// // //はるき分
// for (let j = 0; j < numH; j++) {
//   let buttonIdHj = `buttonH${j}`
//   const elButtonPushed = document.getElementById(buttonIdHj);
//   elButtonPushed.addEventListener("click", () => {
//     let keyOfPoint = `otetudai00${j}`;
//     console.log(harukiSent[keyOfPoint][1]);
//     harukiPointNow += harukiSent[keyOfPoint][1];
//     console.log("はるき現在ポイント：" + harukiPointNow);
//     //localStorageはオブジェクト保存できず[object Object]となってしまうので、文字列に変換して収納
//     const harukiPointNowJSONData = JSON.stringify(harukiPointNow);
//     localStorage.setItem("harukiPointStr", harukiPointNowJSONData);
//   });
// }

// //たかと分
// for (let j = 0; j < numT; j++) {
//   let buttonIdTj = `buttonT${j}`
//   const elButtonPushed = document.getElementById(buttonIdTj);
//   elButtonPushed.addEventListener("click", () => {
//     let keyOfPoint = `otetudai00${j}`;
//     console.log(takatoSent[keyOfPoint][1]);
//     takatoPointNow += takatoSent[keyOfPoint][1];
//     console.log("たかと現在ポイント：" + takatoPointNow);
//     //localStorageはオブジェクト保存できず[object Object]となってしまうので、文字列に変換して収納
//     const takatoPointNowJSONData = JSON.stringify(takatoPointNow);
//     localStorage.setItem("takatoPointStr", takatoPointNowJSONData);
//   });
// }



