import Mock from 'mockjs'
// 引入接口模板
import {login} from './mock'

Mock.setup({
    timeout: '200 - 400', // 设置延迟响应，模拟向后端请求数据
})

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock(/\/api\/healthPlat\/getRecipe\/\w*\/\w*/, 'post', )
Mock.mock('/dev-api/login', 'post', login)

export default Mock;
