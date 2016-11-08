let Readline  = require('readline')
let Ripemd160 = require('ripemd160')
let Hash      = require('yours-bitcoin/lib/hash')

// 標準入力を受け取る
let rl = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

// 1行ずつ処理
let isFirst = true
rl.on('line', function (line) {
  if( !isFirst ) {
    process.stdout.write('\n');
  } else {
    isFirst = false
  }
  
  // 入力文字列から改行を削除
  let input = line.replace(/\r?\n/g,"")
  
  // 入力文字列のBufferを取得
  let buf = Buffer(input)
  
  // sha1のハッシュを出力
  let sha1 = Hash.sha1(buf);
  process.stdout.write('SHA1:');
  process.stdout.write(sha1.toString('hex'));
  process.stdout.write('\n');
  
  // sha256のハッシュを出力
  let sha256 = Hash.sha256(buf);
  process.stdout.write('SHA256:');
  process.stdout.write(sha256.toString('hex'));
  process.stdout.write('\n');
  
  // sha512のハッシュを出力
  let sha512 = Hash.sha512(buf);
  process.stdout.write('SHA512:');
  process.stdout.write(sha512.toString('hex'));
  process.stdout.write('\n');
  
  // sha256Dのハッシュを出力
  let sha256D = Hash.sha256Sha256(buf);
  process.stdout.write('SHA256D:');
  process.stdout.write(sha256D.toString('hex'));
  process.stdout.write('\n');
  
  // ripemd160のハッシュを出力
  let ripemd160 = new Ripemd160().update(input).digest('hex')
  process.stdout.write('RIPEMD160:');
  process.stdout.write(ripemd160);
  process.stdout.write('\n');
  
  // ripemd160sha256のハッシュを出力
  let ripemd160sha256 = new Ripemd160().update(Hash.sha256(buf)).digest('hex');
  process.stdout.write('RIPEMD160SHA256:');
  process.stdout.write(ripemd160sha256);
});
