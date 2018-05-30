const { mongoose } = require('./index')
const models = require('./models')
const modelMap = {
  models: {}
}
for (let i = 0; i < models.length; i++) {
  let schema = new mongoose.Schema(models[i].model)
  modelMap[models[i].name] = mongoose.model(models[i].name, schema)
  modelMap.models[models[i].name] = models[i].model
}
modelMap.methods = {
  formatParam: function (target, param) {
    let model = {}
    for (let i in modelMap.models[target]) {
      model[i] = param[i]
    }
    return model
  }
}
module.exports = modelMap
