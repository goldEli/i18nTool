/**
 *  create by miaoyu  2017/11/06
 * 
 *  生成资源文件 
 */

var extract_fields = require('./extract_fields');

// 需要扫描的路径
var scanPath = "/Users/snail/Desktop/temp/dealFile/src"
// 生成资源文件后 储存的位置
var sourcePath = "/Users/snail/Desktop/temp/dealFile/i18n";

extract_fields(scanPath, sourcePath);
