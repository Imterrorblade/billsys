let mongoose = require('mongoose')
const models = [{
  name: 'Bill',
  model: {
    content: String,
    date: Date,
    money: Number
  }
}, {
  name: 'User',
  model: {
    username: String,
    password: String
  }
}]
const modelMap = {}
for (let i = 0; i < models.length; i++) {
  let schema = mongoose.Schema(models[i].model)
  modelMap[models[i].name] = mongoose.Model(models[i].name, schema)
}
module.exports = modelMap
