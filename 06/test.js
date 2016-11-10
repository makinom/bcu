/**
 * Created by m_makino on 16/11/10.
 */
function debug(type) {
  var tag = '';
  if (type == 1) {
    tag = '<img src="https://s1.2mdn.net/5492810/AMEX_RTP_Pizza320x50.png" alt="Advertisement" border="0" width="320" height="50">';
  } else {
    tag = '<dl style="width:auto;height:auto;margin:0;padding:0;font-size:inherit;line-height: inherit;text-decoration:none;word-break:break-all;background:none;float:none;"><dt data-ydntxt-title="1" style="width:auto;height:auto;margin:3px 0px 0px 6px ;padding:0;font-size:16px;line-height:inherit;background:none;float:none;text-decoration:none;color:#FFFFFF;font-weight:bold;">厚木の賃貸情報なら</dt><dd data-ydntxt-host="1" style="width:auto;height:auto;margin:1px 0px 0px 6px ;padding:0;font-size:11px;color:#6E6E6E;line-height:inherit;background:none;float:none;font-weight:normal;;text-decoration:none;">www.nlo.co.jp</dd><dd data-ydntxt-desc="1" style="width:auto;height:auto;margin:1px 0px 0px 6px ;padding:0;font-size:11px;color:#6E6E6E;line-height:inherit;background:none;float:none;text-decoration:none;font-weight:normal;">シングル・ファミリー物件多数掲載。MASTニューライフオリジナル</dd></dl>';
  }
  return tag;
}

document.writeln(debug(1));
alert($('ad1').children('img').height())