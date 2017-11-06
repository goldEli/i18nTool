/**
 *  create by miaoyu  2017/11/06
 * 
 *  开发过程中 处理新增的中文 
 */

var dealIncrement = require('./dealIncrement');

var extract_fields = require('./extract_fields');

// 需要扫描的路径
var scanPath = "/Users/snail/Desktop/temp/dealFile/src"
// 生成资源文件后 储存的位置
var sourcePath = "/Users/snail/Desktop/temp/dealFile/i18n";

// 生成文件的路径
var folderPath = '/Users/snail/Desktop/temp/dealFile/i18n/inResource';

extract_fields(scanPath, sourcePath, function() {
    // 新生成的资源
    var newRe = require('./i18n/zh/resource');
    // 老资源
    var oldRe = require('./i18n/oldResource');
    dealIncrement(oldRe, newRe, folderPath);
});



