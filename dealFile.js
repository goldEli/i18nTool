// 加载File System读写模块  
var fs = require('fs');  
// 加载编码转换模块  
var iconv = require('iconv-lite');   

var zh = require('./zh.js').zh;
    
var file = "./test.js";  
 
readFile(file);   

// 读文件
function readFile(file){  
    fs.readFile(file, function(err, data){  
        if(err)  
            console.log(file+ "读取文件fail " + err);  
        else{  
            // 读取成功时  
            // 输出字节数组  
            console.log(file + "读文件操作成功")

            // 把数组转换为gbk中文  
            var str = iconv.decode(data, 'utf-8'); 

            // 把文件中代码按行分割出来
            var arr = str.split('\n'); 
 
            arr.forEach(function(e,i) {
                // 这行如果有中文
                if (CheckChinese(e)) {
                    // 将中文抽成数组
                    var a = e.split(/['"]/)
                    
                    // 替换中文
                    var temp = e;
                    a.forEach(function(m){
                        if (zh[m]) {
                            e = e.replace(m,zh[m])
                            arr[i] = e
                        }
                    })
                }
            }, this);

            // 把处理好的数组再重新转成字符串，覆盖原文件
            writeFile( file, arr.join('\n') ); 
        }  
    });  
}  

// 写文件
function writeFile(file, data){  
    fs.writeFile(file, data,function(err, data){
        if(err) {
            console.log(file+'写文件操作失败:',err);
        } else {
            console.log(file+'写文件操作成功');
        }    
    });
} 

// 判断字符串中是否包含汉子
function CheckChinese(val){     
    var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
    if(reg.test(val)){return true}
    return false
}

