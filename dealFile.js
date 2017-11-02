// 加载File System读写模块  
var fs = require('fs');  
// 加载编码转换模块  
var iconv = require('iconv-lite');   

var zh = require('./i18n/zh').zh;

var index = 0;


// readFile(files);   

// 读文件
function readFile(file){  
    fs.readFile(file, function(err, data){  
        if(err)  
            console.log("读取文件fail " + err + file);  
        else{  
            // 读取成功时  
            // 输出字节数组  
            console.log("读文件操作成功" + file)

            // 切换为utf-8
            var str = iconv.decode(data, 'utf-8'); 

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
                    
                    // 替换中文

                    a.forEach(function(m){
                        if (checkChinese(m)){
                            e = e.replace('"' + m + '"', '$i18n["'+getKeybyValue(zh, m)+'"]');
                            arr[i] = e;
                        }
                        // if (zh[m]) {
                        //     e = e.replace(m,zh[m])
                        //     arr[i] = e
                        // }
                    })
                }
            }, this);

            // 把处理好的数组再重新转成字符串，覆盖原文件
            if (isChineseInit) {
                writeFile( file, arr.join('\n') ); 
            }    
        }  
    });  
}  

// 写文件
function writeFile(file, data){  
    fs.writeFile(file, data,function(err, data){
        if(err) {
            console.log(file+'写文件操作失败:',err);
        } else {
            ++index;
            console.log("第"+index+'个文件写入成功'+file);
        }    
    });
} 

// 根据value, 得到key
function getKeybyValue(obj,val){
    for (var key in obj) {
        if (obj[key] == val) {
            return key
        }
    }
    return false
}

// 判断字符串中是否包含汉子
function checkChinese(val){     
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(val)){return true}
    return false
}

exports.dealFile = readFile;
