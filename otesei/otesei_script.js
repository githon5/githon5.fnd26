'use strict'
// 1行目に記載している 'use strict' は削除しないでください

function test(actual, expected) {
  if (JSON.stringify(actual) === JSON.stringify(expected)) {
    console.log("OK! Test PASSED.");
  } else {
    console.error("Test FAILED. Try again!");
    console.log("    actual: ", actual);
    console.log("  expected: ", expected);
    console.trace();
  }
}

//ユーザーボタン押下
//子専用ページへの遷移時はログインパスワードは不要
//harukiログインボタンが押された時
document.getElementById("btnHaruki").addEventListener("click", function(event) {
  const username = "haruki";
  localStorage.setItem('username', username);
  location.href = "otesei_children.html";
});

//Takatoログインボタンが押された時
document.getElementById("btnTakato").addEventListener("click", function(event) {
  const username = "takato";
  localStorage.setItem('username', username);
  location.href = "otesei_children.html";
});


//親専用ページへの遷移時のみログインパスワードを要求
function dispDiag(){
	// 入力ダイアログを表示 ＋ 入力内容をpassInputに代入
	const passInput = window.prompt("パスワードを入力してください", "");

	// 入力内容がパスワードに一致する場合は親専用ページにジャンプ
	if(passInput === parentsPwd.Password) {
		location.href = "otesei_parents.html";
	}
	// 入力内容が一致しない場合は警告ダイアログを表示
	else if(passInput !== "" && passInput !== null){
		window.alert(passInput + 'は登録されたパスワードに一致しません。');
	}
	// 空の場合やキャンセルした場合は警告ダイアログを表示
	else{
		window.alert('キャンセルされました');
	}

}

//mamaログインボタンが押された時
document.getElementById("btnMama").addEventListener("click", function(event) {
  const username = "mama";
  localStorage.setItem('username', username);
  dispDiag();
});

//papaログインボタンが押された時
document.getElementById("btnPapa").addEventListener("click", function(event) {
  const username = "papa";
  localStorage.setItem('username', username);
  dispDiag();
});


