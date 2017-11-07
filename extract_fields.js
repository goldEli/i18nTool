/**
 *  create by miaoyu  2017/11/3
 * 
 *  提取全部中文, 生成资源文件
 * 
 *  -zh
 *    -resource.js
 *  -en
 *    -resource.js 
 */

var scanDir = require('./dealFiles').scanDir;
var readFile = require('./dealFiles').readFile;
var writeFile = require('./dealFiles').writeFile;
var mkdir = require('./dealFiles').mkdir;

// 加载编码转换模块  
var iconv = require('iconv-lite');   

function md(path, resourcePath, cb) {
    // 提取出的中文 对应的key value
    var obj = {};

    var files = scanDir(path);
    Promise.all(
        files.map(function(file){
            // 只读取后缀为.js .html的文件
            if (is_filetype(file, 'js,html')) {
                return new Promise(function (resolve, reject) {
                    readFile(file, function (content) {
                        
                        getChineseToArray(content, file, obj)
                        resolve()
                    });
                })
            }
        })
    ).then(function () {
        generateFiles( resourcePath, clearRepeat(obj), cb )
    })
}

// 生成key value对象的js文件
function generateFiles(floderPath, o, cb) {

    Promise.all(
        [
            new Promise(function(resolve, reject){
                    // 生成中文资源
                mkdir(floderPath+'/zh', function() {
                    var strHead = 'var resource = {'
                    , strEnd = '} \n module.exports = resource;'
                    , all = []

                    all.push(strHead)    

                    for (let key in o) {
                        all.push(key +': '+ '"' + o[key] + '"' + ',')
                    }

                    all.push(strEnd)

                    writeFile(floderPath+'/zh/resource.js',all.join('\n'), function(){
                        resolve();
                    })
                });
            }),
            new Promise(function(resolve, reject){
                // 生成英文资源
                mkdir(floderPath+'/en', function() {
                    var strHead = 'var resource = {'
                    , strEnd = '} \n module.exports = resource;'
                    , all = []

                    all.push(strHead)    

                    for (let key in o) {
                        all.push(key +': '+ '"' + '"' + ',')
                    }

                    all.push(strEnd)

                    writeFile(floderPath+'/en/resource.js',all.join('\n'), function () {
                        resolve();
                    })
                });
            })
        ]
    ).then(function() {
        console.log('生成资源文件完成！')
        if (cb) {
            cb()
        }
    })
}

// 将提取到的中文放入数组
function getChineseToArray (content, file, obj) {

    var str = iconv.decode(content, 'utf-8'); 

    // 把文件中代码按行分割出来
    var arr = str.split('\n'); 

    // 是否存在中文需要替换
    var isChineseInit = false;

    arr.forEach(function(e,i) {
        // 这行如果有中文
        if (
            checkChinese(e)
            && e.indexOf('//') == -1 
            && e.indexOf('console.log') == -1
            && e.indexOf('@param') == -1
            && e.indexOf('@brief') == -1
        ) {
            isChineseInit = true;
            // 将中文抽成数组
            var a = e.split(/['"]/)
            
            // 抽取中文
            a.forEach(function(m, index){
                if (
                    checkChinese(m) 
                    && m.indexOf('* ') == -1
                    && m.indexOf(' * ') == -1
                    && m.indexOf('/*') == -1
                    && m.indexOf('<!--') == -1
                ){
                    var key = file.replace(/\//g,'_');
                    key = key.slice(0,key.indexOf('.'))
                    obj['"' + key + "_" + i +index + '"'] = m;
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

module.exports = md;


