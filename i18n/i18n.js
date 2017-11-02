var zh = require('./zh').zh;
var en = require('./en').en;
// 从cookie中确实显示的语言

var lan = document.cookie
    ,$i18n = {}


// 切换中英文显示
if (lan == zh) {
    $i18n = zh
} else if (lan = en) {
    $i18n = en
} else {
    $i18n = en
}

exports.$i18n = $i18n;