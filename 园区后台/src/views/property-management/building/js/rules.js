import { phone } from '@/config/regex'

export const block = {
  projectName: [
    {required: true, message: '园区名称不能为空'}
  ],
  projectAbbr: [
    {required: true, message: '园区简称不能为空'}
  ]
}

export const tower = {
  buildingProjectId: [
    {required: true, message: '所在厂房不能为空'}
  ],
  contactTel: [
    {pattern: phone, message: '手机号不正确'}
  ]
}

export const floor = {
  buildingProjectId: [
    {required: true, message: '所在厂房不能为空'}
  ],
  buildingId: [
    {required: true, message: '所在楼宇不能为空'}
  ],
  contactTel: [
    {pattern: phone, message: '手机号不正确'}
  ]
}

export const room = {
  buildingProjectId: [
    {required: true, message: '所在厂房不能为空'}
  ],
  buildingId: [
    {required: true, message: '所在楼宇不能为空'}
  ],
  floorId: [
    {required: true, message: '所在楼层不能为空'}
  ],
  contactTel: [
    {pattern: phone, message: '手机号不正确'}
  ]
}
