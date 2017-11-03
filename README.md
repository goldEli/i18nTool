# NodeJS处理国际化

## start

* 安装依赖：
```
npm install
```

* 在readFiles.js中修改路径：
```
var path = "文件路径"  
```

* 在zh.js修改替换的规则

* 运行
```
// 提取代码中所有的的中文，并生成资源文件
node extract_fields.js

// 新的资源和老的资源对比，提取出新增的中文，并生成资源文件
node dealIncrement.js
```
