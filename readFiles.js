const fs = require('fs')
var path = '/Users/snail/Desktop/temp/dealFile/src'
var dealFile = require('./dealFile').dealFile;


let files = []
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

ScanDir(path)
console.log("共需要扫描 "+files.length+" 个文件")
files.forEach(function(ele){
  dealFile(ele);
})
