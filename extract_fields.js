/**
 *  create by miaoyu  2017/11/3
 * 
 *  提取全部中文 
 */

var scanDir = require('./dealFiles').scanDir;
var readFile = require('./dealFiles').readFile;
var writeFile = require('./dealFiles').writeFile;
var mkdir = require('./dealFiles').mkdir;

// 加载编码转换模块  
var iconv = require('iconv-lite');   

// 需要扫描的路径
var path = '/Users/snail/Desktop/temp/dealFile/src';
// 项目根路径
var rootPath = '/Users/snail/Desktop/temp/dealFile/';
// 新建文件夹路径
var floderPath = rootPath + '/i18n/zh';
// 新建文件路径
var filePath = rootPath + '/i18n/zh/resource.js';

var files = scanDir(path);


// 提取出的中文 对应的key value
var obj = {};



Promise.all(
    files.map(function(file){
        // 只读取后缀为.js .html的文件
        if (is_filetype(file, 'js,html')) {
            return new Promise(function (resolve, reject) {
                readFile(file, function (content) {
                    
                    getChineseToArray(content, file, resolve)
                    resolve()
                });
            })
        }
    })
).then(function () {
    generateFiles( clearRepeat(obj) )
})

// 生成key value对象的js文件
function generateFiles(o) {
    mkdir(floderPath);
    var strHead = 'var resource = {'
        , strEnd = '} \n exports.resource = resource;'
        , all = []

    all.push(strHead)    

    for (let key in o) {
        all.push(key+': '+ '"' + o[key] + '"' + ',')
    }

    all.push(strEnd)

    writeFile(filePath,all.join('\n'))
}

// 将提取到的中文放入数组
function getChineseToArray (content, file, resolve) {

    var str = iconv.decode(content, 'utf-8'); 

    // 把文件中代码按行分割出来
    var arr = str.split('\n'); 

    // 是否存在中文需要替换
    var isChineseInit = false;

    arr.forEach(function(e,i) {
        // 这行如果有中文
        if (checkChinese(e)) {
            isChineseInit = true;
            // 将中文抽成数组
            var a = e.split(/['"]/)
            
            // 抽取中文
            a.forEach(function(m, index){
                if (checkChinese(m) && m.indexOf('//') == -1){
                    var key = file.replace(/\//g,'_');
                    key = key.slice(0,key.indexOf('.'))
                    obj[key + "_" + i +index] = m;
                }
            })
        }
    }, this);
}

// 为提取出的中文去重
function clearRepeat(obj) {
    var temp = {}
    var tempObj = {}
    for (let key in  obj) {
        if (!temp[ obj[key] ]) {
            tempObj[key] = obj[key]
            temp[ obj[key] ] = true;
        }
    }
    return tempObj;
}

// 判断字符串中是否包含汉字
function checkChinese(val){     
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(val)){return true}
    return false
}

// 判断文件后缀
function is_filetype(filename, types) {
    types = types.split(',');
    var pattern = '\.(';
    for(var i=0; i<types.length; i++) {
      if(0 != i) {
        pattern += '|';
      }
        pattern += types[i].trim();
    }
    pattern += ')$';
    return new RegExp(pattern, 'i').test(filename);
  }; 