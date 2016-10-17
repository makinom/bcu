/**
 * Created by m_makino on 16/10/14.
 */
//�ե�����⥸�塼��
const Readline    = require('readline')
//�ϥå���⥸�塼��
const crypto = require('crypto')

// word
//let data = "example data to be hashed"


// ����Υϥå����16�ʿ����֤�
function makeHashAndHex(src, hash_type){
  return crypto.createHash(hash_type).update(src).digest('hex');
};
// ����Υϥå����Х��ʥ���֤�
function makeHash(src, hash_type){
  return crypto.createHash(hash_type).update(src,'binary').digest();
};

function consoleOutput(text, hash_data) {
  process.stdout.write(text +':'+ hash_data+'\n');
}

// ɸ�����Ϥ�������
let input_data = Readline.createInterface({
  'input': process.stdin,
  'output': {}
});
//aa = crypto.createHash('sha256').update(src,'binary').digest();
//kansei = crypto.createHash('sha256').update(aa).digest('hex');

input_data.on('line', function (line) { // 1�Ԥ��ļ���
  data = line.trim();

  consoleOutput( 'SHA1',            makeHashAndHex( data, 'sha1'));
  consoleOutput( 'SHA256',          makeHashAndHex( data, 'sha256' ));
  consoleOutput( 'SHA512',          makeHashAndHex( data, 'sha512' ));
  consoleOutput( 'SHA256D',         makeHashAndHex( makeHash(data, 'sha256'), 'sha256' ));
  consoleOutput( 'RIPEMD160',       makeHashAndHex( data, 'ripemd160' ));
  consoleOutput( 'RIPEMD160SHA256', makeHashAndHex( makeHash(data, 'sha256'), 'ripemd160' ));

});