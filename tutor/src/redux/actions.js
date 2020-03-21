import io from 'socket.io-client';
import { reqRegister, reqLogin, reqUpdateUser, reqUser,reqUserList,reqChatMsgList,reqReadMsg } from "../api/index";
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER,RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ,REGISTER_SUCCESS} from './actionType';

const authSuccess = (user) => ({
    type: AUTH_SUCCESS, data: user
})

const registerSuccess = (msg) => ({
    type: REGISTER_SUCCESS, data: msg
})

const errorMsg = (msg) => ({
    type: ERROR_MSG, data: msg
})

const receiveUser = (user) => ({
    type: RECEIVE_USER, data: user
})

const receiveUserList = (users) => ({
    type: RECEIVE_USER_LIST, data: users
})

const receiveMsgList = ({users,chatMsgs,userid}) => ({
    type: RECEIVE_MSG_LIST, data: {users,chatMsgs,userid}
})

const receiveMsg = ({chatMsg,userid}) => ({
    type: RECEIVE_MSG, data: {chatMsg,userid}
})

const msgRead = ({count,from,to}) => ({
    type: MSG_READ, data: {count,from,to}
})

export const resetUser = (msg='') => ({
    type: RESET_USER, data: msg
})


// 註冊
export const register = (user) => {

    const {username,password,password2} = user

    //驗正註冊數據
    if(!username || !password || !password2){
        return errorMsg("帳號和密碼，不能為空");
    }else if(password !==password2){
        return errorMsg("密碼不一致!")
    }

    return async (dispatch) => {
        const response = await reqRegister(user);
        const result = response.data;
       
        // 成功
        if (result.code === 0) {
            // getMsgList(dispatch,result.data._id)
            // dispatch(authSuccess(result.data))
            dispatch(registerSuccess(result.data.msg))
            
        } else {
            // 失敗
            dispatch(errorMsg(result.msg))
        }
    }
}

// 登入
export const login = (user) => {

    const {username,password} = user;

    if(!username){
        return errorMsg("帳號不能為空");
    }else if(!password){
        return errorMsg("密碼不能為空")
    }

    return async (dispatch) => {
        const response = await reqLogin(user);
        const result = response.data;
        // 成功
        if (result.code === 0) {
            getMsgList(dispatch,result.data._id)
            dispatch(authSuccess(result.data))
        } else {
            // 失敗
            dispatch(errorMsg(result.msg))
        }
    }
}

// 更新用戶
export const updateUser = (user) => {
    console.log('user',user)
    return async dispatch => {
        const response = await reqUpdateUser(user)
        const result = response.data
        if (result.code === 0) { // 更新成功
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}


// 獲取用戶
export const getUser = () => {
    return async dispatch => {
        const response = await reqUser()
        const result = response.data
        if (result.code === 0) { // 更新成功
            getMsgList(dispatch,result.data._id)
            dispatch(receiveUser(result.data))
        } else {
            dispatch(resetUser(result.msg))
        }
    }
}

// 獲取用戶列表
export const getUserList = (type) => {
    return async dispatch => {
        const response = await reqUserList(type)
        const result = response.data
        if (result.code === 0) {
            dispatch(receiveUserList(result.data))
        }
    }
}

// 獲取用戶消息列表
const getMsgList = async(dispatch,userid)=>{
    // 只要登入後就可和IO做連線請求
    initIO(dispatch,userid);
    const response = await reqChatMsgList();
    console.log('------------response------------',response)
    const result = response.data;
    if(result.code===0){
       const {users,chatMsgs} = result.data;
       dispatch(receiveMsgList({users,chatMsgs,userid}))
    }
}


// IO連線請求
const initIO = (dispatch,userid)=>{
    if(!io.socket){
        io.socket = io('ws://localhost:4000');
        io.socket.on('receiveMsg',(chatMsg)=>{
            if(userid===chatMsg.from || userid===chatMsg.to){
                dispatch(receiveMsg({chatMsg,userid}))
            }
        })
    }
}


// 發送消息
export const sendMsg = ({from,to,content}) => {
    return dispatch => {
        io.socket.emit('sendMsg',{from,to,content})
    }
}


// 讀取消息
export const readMsg = (from,to) => {
    return async dispatch => {
        const response = await reqReadMsg(from)
        const result = response.data
        if (result.code === 0) {
            const count = result.data
            dispatch(msgRead({count,from,to}))
        }
    }
}
