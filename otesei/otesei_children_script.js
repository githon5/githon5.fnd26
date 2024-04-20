'use strict'
// 1行目に記載している 'use strict' は削除しないでください

// ログイン後のページでユーザー名を表示
const username = sessionStorage.getItem('username');
if (username) {
  document.getElementById('loginUserName').textContent = `ようこそ、${username}！`;
} else {
  window.location.href = 'otesei_index.html';
}

// 1. 追加したい親要素を取得する
const elImgTagUserIcon = document.getElementById("loginUserIcon");

// 2. innerHTMLで要素の生成と追加を同時にする！
elImgTagUserIcon.innerHTML = `<img src="otesei_img/${username}.png" height="50">`;

// 3. 追記は「 += 」
elImgTagUserIcon.innerHTML += "<br>";


//お手伝いリスト
const elOtetuList = document.getElementById("elOtetuList");
for (const key in otetudai) {
  const otetudaimei = otetudai[key][0];
  const otetuPoint = otetudai[key][1];
  elOtetuList.innerHTML += `<div id=${key} class="otetuList"
   style=" background: #ffe6e8; padding: 15px; border: 4px dashed #ffb6c1; box-shadow: 0 0 0 5px #ffe6e8; -moz-box-shadow: 0 0 0 5px #ffe6e8; -webkit-box-shadow: 0 0 0 3px #ffe6e8; font-size: 100%;">
   ${otetudaimei}：　「${otetuPoint}」ポイント　<img src="otesei_img/done.png" height="30"></div><br>`;
}


//お手伝いリストの一つが押された時
for (const key in otetudai) {
  document.getElementById(key).addEventListener("click", function(event) {
    const username = "takato";
    const doneOtetudai = key;
    sessionStorage.setItem('username', username);
    sessionStorage.setItem('doneOtetudai', doneOtetudai);
    const sendDoneOrNot = window.confirm(`『${otetudai[key][0]}』の「やったよ♪」を送りますか？`);
    if (sendDoneOrNot === true) {
      //★メール送信＆DB登録
      window.alert(`送りました。`);
    } else {
      console.log("送信をやめました。");
    }
  });
}


export const loginInfo = {
  userID: "101",
  Name: "Honda",
  Fampr: "parents",
};







