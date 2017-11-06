/**
 *  create by miaoyu  2017/10/3
 * 
 *  处理新增的资源，生成新增的InREsource.js 
 *  
 */
var mkdir = require('./dealFiles').mkdir;
var writeFile = require('./dealFiles').writeFile;


function md(oldRe, newRe, folderPath) {

    var incrementRe = {}

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

    generateFiles(incrementRe, folderPath)
}




// 生成key value对象的js文件
function generateFiles(o,folderPath) {
    mkdir(folderPath, function() {
        var strHead = 'var resource = {'
        , strEnd = '} \n exports.resource = resource;'
        , all = []

        all.push(strHead)    

        for (let key in o) {
            all.push("'" + key + "'" +': '+ '"' + o[key] + '"' + ',')
        }

        all.push(strEnd)

        writeFile(folderPath + '/inResource.js',all.join('\n'))
    });
}

module.exports = md;