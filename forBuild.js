/**
 *  create by miaoyu  2017/11/06 
 * 
 *  当变慢完成，需要打包发布的时候，先进行中文替换成变量
 */


var copyDir = require('./dealFiles').copyDir

var replace_fields = require('./replace_fields')

// 原始路径
var originPath = "/Users/snail/Desktop/temp/dealFile/src"
// 复制后新路径用于翻译(避免源码污染)
var newPath = "/Users/snail/Desktop/temp/dealFile/src_translate" 
// 全量中文资源
var resource = require('./i18n/zh/resource');    

// 将源路径复制到一个新的路径，以免污染源码
copyDir(originPath, newPath, function (err) {  
    if (err) {  
        console.log("error ocur");  
        console.log(err);  
    } else {  

        console.log("copy ok");  

        // 根据新生成的路径，将中文替换成变量
        replace_fields(newPath,resource)
    }  
});    