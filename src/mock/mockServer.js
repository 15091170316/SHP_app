// 引入mockjs库
import Mock from 'mockjs'
// 引入JSON数据（JSON数据和图片不需要手动向外暴露，它两是默认暴露的，直接引入就行）
import banner from './banner.json'
import floor from './floor.json'

// mock数据：第一个参数：请求地址；第二个参数：响应数据
Mock.mock('/mock/banner', {code:200, data:banner})
Mock.mock('/mock/floor', {code:200, data:floor})