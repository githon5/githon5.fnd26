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
elImgTagUserIcon.innerHTML = `<img src="otesei_img/${username}.png" height="50">`;
// 3. 追記は「 += 」
elImgTagUserIcon.innerHTML += "<br>";


//現在ポイント
function dispNowPoint(nameIn) {
  let userPointNow;
  userPointNow = parseInt(localStorage.getItem(`${nameIn}PointStr`)); //文字列⇒数字変換 parseInt()、localStorageは収納時に文字列に変換されてしまうので
  const elDispPoint =document.getElementById("dispPoint");
  elDispPoint.innerHTML += `<p>${userPointNow}ポイント</p>`;
}

dispNowPoint(username);


//お手伝いリスト
const elOtetuList = document.getElementById("elOtetuList"); //ID名の要素取得
for (const key in otetudai) {                               //お手伝い種類を追加する場合はdatabase.jsのotetudaiオブジェクトをメンテ
  const otetudaimei = otetudai[key][0];
  const otetuPoint = otetudai[key][1];
  //お手伝いリストのDIV枠ボタンをリストでページに表示
  elOtetuList.innerHTML += `<div id=${key} class="otetuList"
   style=" background: #ffe6e8; padding: 15px; border: 4px dashed #ffb6c1; box-shadow: 0 0 0 5px #ffe6e8; -moz-box-shadow: 0 0 0 5px #ffe6e8; -webkit-box-shadow: 0 0 0 3px #ffe6e8; font-size: 100%;">
   ${otetudaimei}：　「${otetuPoint}」ポイント　<img src="otesei_img/done.png" height="30"></div><br>`;
}

//お手伝い実施オブジェクトの初期化
let objDoneOtetudai = otetudai;

//お手伝いリストの一つが押された時
for (const key in otetudai) {
  document.getElementById(key).addEventListener("click", function(event) {
    const doneOtetudai = key;
    localStorage.setItem('username', username);
    localStorage.setItem('doneOtetudai', doneOtetudai);
    const sendDoneOrNot = window.confirm(`『${otetudai[key][0]}』の「やったよ♪」を送りますか？`);
    if (sendDoneOrNot === true) {
      //★メール送信＆おてつだいデータ登録
      //下記はブラウザーのストレージを使ってのデータ保存・取得なので、いずれDB経由に変更したい。
      objDoneOtetudai[doneOtetudai][2]++; //実施回数をインクリメント
      const doneOtetudaiJSON = JSON.stringify(objDoneOtetudai); //数字、文字列、オブジェクト、何もかもUTF-16に変換した上で、Window.localStorageに保管されるので、オブジェクトが[object Object]になってしまわないようJSON使う
      localStorage.setItem(`${username}Done`, doneOtetudaiJSON); //「名前Done」ブラウザストレージに実施お手伝いオブジェクトを保存
      let toSend = localStorage.getItem(`${username}Done`);
      console.log(`${username}Done:` + toSend);
      window.alert(`送りました。`);
    } else {
      console.log("送信をやめました。");
    }
  });
}










