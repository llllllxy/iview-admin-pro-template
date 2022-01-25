import Mock from 'mockjs'
// 引入接口模板
import {login} from './mock'

Mock.setup({
    // 设置延迟响应，模拟向后端请求数据
    timeout: '200-400', // 表示响应时间介于 200 和 400 毫秒之间，默认值是'10-100'。
})

// Mock.mock( url, post/get , 返回的数据)；
// Mock.mock(/\/api\/healthPlat\/getRecipe\/\w*\/\w*/, 'post', )
Mock.mock('/dev-api/login', 'post', login)

export default Mock;
