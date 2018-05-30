const modelMap = require('./modelMap')
const entityDao = {
  add: function (target, model, callback) {
    let entity = new modelMap[target](modelMap.methods.formatParam(target, model))
    entity.save().then(function (err, res) {
      if (err) {
        callback(err)
        console.log(err)
      } else {
        callback(res)
      }
      console.log(model)
      console.log('存储成功')
    })
  },
  find: function (target, callback) {
    modelMap[target].find(null, function (err, models) {
      if (err) {
        callback(err)
        console.log(err)
      } else {
        console.log(models)
        console.log('查询成功')
        callback(models)
      }
    })
  }
}
module.exports = entityDao
