const mongoose = require('mongoose')
const nodeCmd = require('node-cmd')
// nodeCmd.run('./mongodb/bin/mongod --path ../../mongodbdata')
nodeCmd.get('mongodb\\bin\\mongod.exe --path ../../mongodbdata', function (err, data, stderr) {
  if (err) {
    console.log(err)
  } else {
    console.log('进入bin目录')
    nodeCmd.get('mongod.exe --path ../../mongodbdata', function (err, data, stderr) {
      if (err) {
        console.log(err)
      } else {
        console.log(data, '数据库启动成功')
      }
    })
  }
})
const dataBase = {
  mongoose: mongoose,
  start: function () {
    mongoose.connect('mongodb://localhost/admin', {
      bufferCommands: false
    })
    let db = mongoose.connection
    db.on('error', function () {
      console.log('connect error')
    })
    db.on('disconnected', function () {
      console.log('mongodb 断开连接')
    })
    db.on('connected', function (message) {
      console.log(message)
      console.log('mongodb 已连接')
    })
    db.once('open', function () {
      console.log('mongodb连接成功')
    })
  }
}
module.exports = dataBase
