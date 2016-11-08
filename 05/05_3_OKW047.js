/**
 * Created by makinomasashi on 16/11/07.
 */
var Address  = require('yours-bitcoin/lib/address');
var Bip32    = require('yours-bitcoin/lib/bip-32');
//var data = require('fs').readFileSync('/dev/stdin').toString().split('\n');
var dataArray = require('fs').readFileSync(process.stdin.fd).toString().split('\n');
var mPrvKey = dataArray.shift();
var path = dataArray.shift();

// BIP32のオブジェクトを作成
var b32 = Bip32.fromString(mPrvKey);

// 派生パスを指定
path = path.replace(/’/g, "'");
var derive = b32.derive(path);

// 拡張秘密鍵と拡張公開鍵を取得
var xprv = derive.toString();
var xpub = derive.toPublic().toString();

// ビットコインアドレスのオブジェクトを生成
var address = Address.fromPubKey(derive.pubKey);

// 拡張秘密鍵と拡張公開鍵とビットコインアドレスを出力
console.log(xprv);
console.log(xpub);
console.log(address.toString());