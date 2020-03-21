import ajax from './ajax'

// 註冊
export const reqRegister = (user) => ajax('/register', user, 'POST')
// 登入
export const reqLogin = (user) => ajax('/login', user, 'POST')
// 更新
export const reqUpdateUser = (user) => ajax('/update', user, 'POST')
// 用戶資訊
export const reqUser = () => ajax('/user')
// 用戶列表
export const reqUserList = (type) => ajax('/userlist',{type})
// 獲取用用戶當前聊天列表
export const reqChatMsgList = () => ajax('/msglist')
// 修改指定消息為已讀
export const reqReadMsg = (from) => ajax('/readmsg',{from},'POST')