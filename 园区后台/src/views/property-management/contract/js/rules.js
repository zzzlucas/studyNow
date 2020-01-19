export const newForm = {
  custId: [
    { required: true, message: '客户名称不能为空' }
  ],
  firstParty: [
    { required: true, message: '甲方不能为空' }
  ],
  contractNo: [
    { required: true, message: '合同编号不能为空' }
  ],
  startDate: [
    { required: true, message: '开始日期不能为空' }
  ],
  endDate: [
    { required: true, message: '结束日期不能为空' }
  ]
}

export const surrenderForm = function() {
  return {
    returnType: [
      { required: true, message: '退租类型不能为空' }
    ],
    contractNo: [
      { required: true, message: '退租日期不能为空' }
    ],
    resourceGroupId: [
      {
        validator: (r, value, callback) => {
          let returnType = this.form.getFieldValue('returnType')
          if (returnType === 2) {
            return callback()
          }
          if (value.length > 0) {
            callback()
          } else {
            callback('退租位置不能为空')
          }
        }
      }
    ]
  }
}
