import dataApi from '../../../mongodb/dataApi'

const service = {
  addBill: function (para) {
    return new Promise(function (resolve, reject) {
      dataApi.add('Bill', para, function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  },
  getBillList: function () {
    return new Promise(function (resolve, reject) {
      dataApi.find('Bill', function (response) {
        if (response instanceof Error) {
          reject(response)
        } else {
          resolve(response)
        }
      })
    })
  }
}
export default service
