/*
課題1：数値フォーマット
標準入力から与えられた数値データ（10進数表記、-32,767〜32,767）に対し、以下のフォーマットに変換し
16進数・小文字で一行ずつ標準出力へ出力してください。
バイト境界に半角スペースを一文字入れること。

ビッグエンディアン、符号絶対値
リトルエンディアン、符号絶対値
ビッグエンディアン、2の補数表記
リトルエンディアン、2の補数表記

2バイト　-32768から+32767


入力例1
-5000
出力例1
93 88
88 93
ec 78
78 ec
 */

'use strict';
//ファイルモジュール
const Readline   = require('readline')
//ビットコイン関連

// 標準入力を受け取る
let inputData = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

let inputDatas = []

inputData.on('line', function (line) {
  line = line.trim();// 入力文字列から改行を削除
  inputDatas.push(line);
  return inputDatas;
});

inputData.on('close', function() {
  
  let inputNum     = Number(inputDatas[0]); // 標準入力された数値
  let plus  = true;

  if( inputNum < 0 ) {//0より小さい時はマイナスフラグにする
    plus = false;
  }

  inputNum = Math.abs(inputNum);//絶対値に変換（マイナス取る感じ）

  //2進数で16桁に足りない場合は、16桁になるように頭に0を足す
  let splitNumZero = ('0000000000000000' + inputNum.toString(2)).slice(-16).split('');

  let numJ;
  let fz = [];//符号絶対値
  let hs = [];//2の補数

  for(let j = 0; j < splitNumZero.length; j++) {
    numJ = Number(splitNumZero[j]);
    //符号絶対値用
    if(j == 0) {
      if(!plus) {//先頭ビットで、マイナスだったら、1立てる
        fz[j] = 1;
      } else {
        fz[j] = numJ;
      }
    } else {//プラスはそのまま格納
      fz[j] = numJ;
    }

    //2の補数用
    if(!plus) {//マイナスを表現したいとき 全ての0,1ビットを逆に。
      if(numJ == 1) {
        hs[j] = 0;
      } else {
        hs[j] = 1;
      }
    } else {//プラスはそのまま格納
      hs[j]  = numJ;
    }
  }

  //符号絶対値--------------------
  //2進数が１文字ずつ格納された配列 fz を、joinで全て文字列結合して、
  //parseIntで2進数からint型に変換し、toStringで16進数に変換
  let fzHex = parseInt(fz.join(''),2).toString(16);

  let fzHexArr = [];
  for(let m = 0; m < fzHex.length; m+=2) {
    fzHexArr.push(fzHex.substr(m,2));
  }

  //2の補数--------------------
  //2進数が１文字ずつ格納された配列 hs を、joinで全て文字列結合して、
  //parseIntで2進数からint型に変換し、toStringで16進数に変換
  let hsHex = parseInt(hs.join(''),2);
  hsHex = (plus)? hsHex : hsHex+ 1; //補数にしたあとプラス1する。
  hsHex = hsHex.toString(16);

  let hsHexArr = [];
  for(let m = 0; m < hsHex.length; m+=2) {
    hsHexArr.push(hsHex.substr(m,2));
  }

  process.stdout.write(fzHexArr.join(' ')+"\n"); // 符号絶対値 ビッグエンディアン
  process.stdout.write(fzHexArr.reverse().join(' ')+"\n"); // 符号絶対値 リトルエンディアン
  process.stdout.write(hsHexArr.join(' ')+"\n"); // 2の補数 ビッグエンディアン
  process.stdout.write(hsHexArr.reverse().join(' ')); // 2の補数 リトルエンディアン

});

/*
2の補数の出し方
  http://www.it-license.com/cardinal_number/The_complement_of_2.html
2進、8進、10進、16進変換
  http://hogehoge.tk/tool/number.html
  http://www.ajaxtower.jp/js/number_class/index2.html
文字列⇒数値変換 Number() String()
  http://lealog.hateblo.jp/entry/2013/02/28/005010
2,4,16進数をint化 ParseInt()
  https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/parseInt
文字列切り出し substr()
  http://catprogram.hatenablog.com/entry/2013/05/13/231457
配列結合 join()
  http://www.ajaxtower.jp/js/array_class/index3.html
配列の逆順 reverse()
  http://javascriptist.net/ref/Array.reverse.html
*/