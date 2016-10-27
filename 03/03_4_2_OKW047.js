/**
 * Created by m_makino on 16/10/26.
 */
var Readline = require('readline')
var Hash     = require('yours-bitcoin/lib/hash')

// 標準入力を受け取る
var rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ配列に入れて値を取得する
var index = 0
var dataArray = []
rl.on('line', function (line) {
  var input = line

  // 配列に追加
  dataArray.push(input)
});

// すべての行の読み込みが終わった後にメインの処理を実行
rl.on('close', function() {

  return merkle_root(dataArray)
});

function merkle_root(hashes) {
  if (hashes.length == 1) {
    return hashes[0]
  }

  if (hashes.length %2 != 0) {
    hashes.append(hashes.last())
  }

  var next = []
  for (var i = 0;  (hashes.length / 2)) {
    next[i] = Hash.sha256(Hash.sha256(hashes[2*i].concat(hashes[2*i+1]) ))
  }
}