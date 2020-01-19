export default {
  parkId: [
    { required: true, message: '园区不能为空' }
  ],
  projectName: [
    { required: true, message: '项目名称不能为空' }
  ],
  types: [
    { required: true, message: '项目类别不能为空' }
  ],
  engineeringProcess: [
    { required: true, message: '项目类别不能为空' }
  ]
}

export const node = {
  title: [
    { required: true, message: '节点名称不能为空' }
  ]
}

export const track = {
  tracker: [
    { required: true, message: '记录人不能为空' }
  ],
  trackDate: [
    { required: true, message: '记录时间不能为空' }
  ],
  process: [
    { required: true, message: '项目进展不能为空' }
  ]
}
