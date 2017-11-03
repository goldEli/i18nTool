/**
 *  create by miaoyu  2017/10/3
 * 
 *  处理新增的资源，生成新增的InREsource.js 
 *  
 */
var mkdir = require('./dealFiles').mkdir;
var writeFile = require('./dealFiles').writeFile;

var newRe = require('./i18n/zh/resource');
var oldRe = require('./i18n/oldResource');

var incrementRe = {}

var rootPath = '/Users/snail/Desktop/temp/dealFile/';
var folderPath = rootPath + '/i18n/inResource';
var filePath = rootPath + '/i18n/inResource/inResource.js';

for (let i in newRe) {
    let flag = false;
    for (let j in oldRe) {
        if (newRe[i] == oldRe[j]) {
            flag = true;
            break
        }
    }
    if (!flag) {
        incrementRe[i] = newRe[i]
    }
}

generateFiles(incrementRe)

// 生成key value对象的js文件
function generateFiles(o) {
    mkdir(folderPath);
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

