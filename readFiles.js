const fs = require('fs')
var path = '/Users/snail/Desktop/temp/dealFile/src'
var dealFile = require('./dealFile').dealFile;


let files = []

// 读取路径
function ScanDir(path) {
  let that = this
  if (fs.statSync(path).isFile()) {
    return files.push(path)
  }
  try {
    fs.readdirSync(path).forEach(function (file) {
      ScanDir.call(that, path + '/' + file)
    })
  } catch (e) {
  }
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

ScanDir(path)
console.log("共需要扫描 "+files.length+" 个文件")
files.forEach(function(ele){
  // 只读取后缀为.js .html的文件
  if (is_filetype(ele, 'js,html')) {
    dealFile(ele);
  }
})
