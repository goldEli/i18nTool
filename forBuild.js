var copyDir = require('./dealFiles').copyDir
    , replace_fields = require('./replace_fields')
    // 原始路径
    , originPath = "/Users/snail/Desktop/temp/dealFile/src"
    // 复制后新路径用于翻译
    , newPath = "/Users/snail/Desktop/temp/dealFile/src_tansilate" 
    , resource = require('./i18n/zh/resource');    


copyDir(originPath, newPath, function (err) {  
    if (err) {  
        console.log("error ocur");  
        console.log(err);  
    } else {  

        console.log("copy ok");  
        // console.log("consume time:" + (new Date().getTime() - start))  

        replace_fields(newPath,resource)
    }  
});    