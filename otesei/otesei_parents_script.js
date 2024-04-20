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
elImgTagUserIcon.innerHTML = `<img src="otesei_img/` + username + `.png" height="50">`;

// 3. 追記は「 += 」
elImgTagUserIcon.innerHTML += "<br>";
