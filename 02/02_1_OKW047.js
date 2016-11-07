/**
 * Created by m_makino on 16/10/14.
 */
const Readline    = require('readline')
const crypto = require('crypto')

function makeHashAndHex(src, hash_type){
  return crypto.createHash(hash_type).update(src).digest('hex');
};

function makeHash(src, hash_type){
  return crypto.createHash(hash_type).update(src,'binary').digest();
};

function output(text, hash_data) {
  process.stdout.write(text +':'+ hash_data+'\n');
}

let input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});

input_data.on('line', function (line) {
  data = line.trim();

  output( 'SHA1',            makeHashAndHex( data, 'sha1'));
  output( 'SHA256',          makeHashAndHex( data, 'sha256' ));
  output( 'SHA512',          makeHashAndHex( data, 'sha512' ));
  output( 'SHA256D',         makeHashAndHex( makeHash(data, 'sha256'), 'sha256' ));
  output( 'RIPEMD160',       makeHashAndHex( data, 'ripemd160' ));
  output( 'RIPEMD160SHA256', makeHashAndHex( makeHash(data, 'sha256'), 'ripemd160' ));

});