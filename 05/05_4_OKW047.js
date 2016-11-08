/**
 * Created by makinomasashi on 16/11/07.
 */
var Address  = require('yours-bitcoin/lib/address');
var Bip32    = require('yours-bitcoin/lib/bip-32');
//var data = require('fs').readFileSync('/dev/stdin').toString().trim();
var data = require('fs').readFileSync(process.stdin.fd).toString().trim();

// BIP32のオブジェクトを作成
var b32 = Bip32.fromString(data);

// 0～4番目の受け取り用アドレスを取得
var receive = b32.deriveChild(0);
var rAddress0 = Address.fromPubKey(receive.deriveChild(0).pubKey);
var rAddress1 = Address.fromPubKey(receive.deriveChild(1).pubKey);
var rAddress2 = Address.fromPubKey(receive.deriveChild(2).pubKey);
var rAddress3 = Address.fromPubKey(receive.deriveChild(3).pubKey);
var rAddress4 = Address.fromPubKey(receive.deriveChild(4).pubKey);

// 0～4番目の受け取り用アドレスを表示
console.log(rAddress0.toString());
console.log(rAddress1.toString());
console.log(rAddress2.toString());
console.log(rAddress3.toString());
console.log(rAddress4.toString());

// 0～4番目のおつりアドレスを取得
var change = b32.deriveChild(1);
var cAddress0 = Address.fromPubKey(change.deriveChild(0).pubKey);
var cAddress1 = Address.fromPubKey(change.deriveChild(1).pubKey);
var cAddress2 = Address.fromPubKey(change.deriveChild(2).pubKey);
var cAddress3 = Address.fromPubKey(change.deriveChild(3).pubKey);
var cAddress4 = Address.fromPubKey(change.deriveChild(4).pubKey);

// 0～4番目のおつりアドレスを表示
console.log(cAddress0.toString());
console.log(cAddress1.toString());
console.log(cAddress2.toString());
console.log(cAddress3.toString());
console.log(cAddress4.toString());