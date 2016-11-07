let Readline = require('readline')
let Address  = require('yours-bitcoin/lib/address')
let Bip32    = require('yours-bitcoin/lib/bip-32')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ処理
let isFirst = true
rl.on('line', function (line) {
  if( !isFirst ) {
    process.stdout.write('\n')
  } else {
    isFirst = false
  }
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
  // BIP32のオブジェクトを作成
  let bip32 = Bip32.fromString(input)
  
  // 0～4番目の受け取り用アドレスを取得
  let receive = bip32.deriveChild(0)
  let rAddress0 = Address.fromPubKey(receive.deriveChild(0).pubKey)
  let rAddress1 = Address.fromPubKey(receive.deriveChild(1).pubKey)
  let rAddress2 = Address.fromPubKey(receive.deriveChild(2).pubKey)
  let rAddress3 = Address.fromPubKey(receive.deriveChild(3).pubKey)
  let rAddress4 = Address.fromPubKey(receive.deriveChild(4).pubKey)
  
  // 0～4番目の受け取り用アドレスを表示
  process.stdout.write(rAddress0.toString());
  process.stdout.write("\n");
  process.stdout.write(rAddress1.toString());
  process.stdout.write("\n");
  process.stdout.write(rAddress2.toString());
  process.stdout.write("\n");
  process.stdout.write(rAddress3.toString());
  process.stdout.write("\n");
  process.stdout.write(rAddress4.toString());
  process.stdout.write("\n");
  
  // 0～4番目のおつりアドレスを取得
  let change = bip32.deriveChild(1)
  let cAddress0 = Address.fromPubKey(change.deriveChild(0).pubKey)
  let cAddress1 = Address.fromPubKey(change.deriveChild(1).pubKey)
  let cAddress2 = Address.fromPubKey(change.deriveChild(2).pubKey)
  let cAddress3 = Address.fromPubKey(change.deriveChild(3).pubKey)
  let cAddress4 = Address.fromPubKey(change.deriveChild(4).pubKey)
  
  // 0～4番目のおつりアドレスを表示
  process.stdout.write(cAddress0.toString());
  process.stdout.write("\n");
  process.stdout.write(cAddress1.toString());
  process.stdout.write("\n");
  process.stdout.write(cAddress2.toString());
  process.stdout.write("\n");
  process.stdout.write(cAddress3.toString());
  process.stdout.write("\n");
  process.stdout.write(cAddress4.toString());
});