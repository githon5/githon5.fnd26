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
  for (let k = 1; k <= harukiSent[key][2]; k++) { //実施回数が1以上の場合のみ、実施回数分keyをリストに追加
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
  for (let k = 1; k <= takatoSent[key][2]; k++) { //実施回数が1以上の場合のみ、実施回数分keyをリストに追加
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
function dispNowPoint() {
  //★最初期　現在ポイント：NaNになってしまう時はブラウザコンソール上でharukiPointNow = 0;で初期化する必要あり。
  //localStorageは収納時に文字列に変換されてしまうので、parseInt()で文字列⇒数字変換
  const elDispPointNowH = document.getElementById("harukiDispPointNow");
  elDispPointNowH.innerText = parseInt(localStorage.getItem("harukiPointStr"));
  const elDispPointNowT = document.getElementById("takatoDispPointNow");
  elDispPointNowT.innerText = parseInt(localStorage.getItem("takatoPointStr"));
}
dispNowPoint();

//「リセット」ボタン押下時
const elButtonHarukiResetPushed = document.getElementById("harukiButtonOfReset");
elButtonHarukiResetPushed.addEventListener("click", () => {
  localStorage.setItem("harukiPointStr", 0);
  dispNowPoint();
});
const elButtonTakatoResetPushed = document.getElementById("takatoButtonOfReset");
elButtonTakatoResetPushed.addEventListener("click", () => {
  localStorage.setItem("takatoPointStr", 0);
  dispNowPoint();
});

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
      userPointNow += userSentObj[keyOfPoint][1]; //実施お手伝いのポイントをプラス
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


//しつけ
//optionは選択肢が選択されたときにサーバーに送信するデータの値を含むvalue属性を持ちます。value属性が含まれない場合、
//既定で要素の中に含まれるテキストの値が使用されます。
const elShitukeDo = document.getElementById("elShituke");
elShitukeDo.innerHTML += `
<select id="selUsername">
  <option value="harukiPointStr">はるき</option>
  <option value="takatoPointStr">たかと</option>
</select>　
<select id="selShituke">
  <option value="shituke000">${shituke["shituke000"][0]}</option>
  <option value="shituke001">${shituke["shituke001"][0]}</option>
  <option value="shituke002">${shituke["shituke002"][0]}</option>
  <option value="shituke003">${shituke["shituke003"][0]}</option>
  <option value="shituke004">${shituke["shituke004"][0]}</option>
  <option value="shituke005">${shituke["shituke005"][0]}</option>
</select>　<input type="button" id="buttonShitukeExe" value="←しつけ実施">`;


//「しつけ実施」ボタン押下時

const elButtonShitukePushed = document.getElementById("buttonShitukeExe");
elButtonShitukePushed.addEventListener("click", () => {
  //しつけ対象ユーザー選択
  const elSelUsername = document.getElementById("selUsername");
  let targetUserPointStr = elSelUsername.value;
  //「しつけ実施」ボタン押下でポイント演算
  let shitukeKey = document.getElementById("selShituke").value;
  let minusPointed = parseInt(localStorage.getItem(targetUserPointStr)) + shituke[shitukeKey][1];
  localStorage.setItem(targetUserPointStr, minusPointed);
  dispNowPoint();
});
