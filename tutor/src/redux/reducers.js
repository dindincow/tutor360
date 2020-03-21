import { combineReducers } from 'redux';
import { AUTH_SUCCESS, ERROR_MSG, RECEIVE_USER, RESET_USER, RECEIVE_USER_LIST,RECEIVE_MSG_LIST,RECEIVE_MSG,MSG_READ ,REGISTER_SUCCESS} from './actionType';
import { getRedirectTo } from '../utils/index'

const defaultState = {
    username: '',
    type: '',
    msg: '',
    redirectTo: ''
}


const user = (state = defaultState, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            const { type, header } = action.data;
            return { ...state, ...action.data, redirectTo: getRedirectTo(type, header) };

        case REGISTER_SUCCESS:
            return { ...state, msg:action.data};
        
        case ERROR_MSG:
            return { ...state, msg: action.data };

        case RECEIVE_USER:
            return action.data;

        case RESET_USER:
            return { ...defaultState, msg: action.data };

        default:
            return state;
    }

}

const initUserList = []

const userList = (state = initUserList, action)=> {
    switch (action.type) {
        case RECEIVE_USER_LIST:
            return action.data
        default:
            return state
    }
}

const initChat = {
    users:{},
    chatMsgs:[],
    unReadCount:0
}

const chat = (state = initChat, action)=> {
    switch (action.type) {
        case RECEIVE_MSG_LIST:
            const {users,chatMsgs,userid} = action.data
            return {
                users,
                chatMsgs,
                unReadCount:chatMsgs.reduce((preTotal,msg)=>preTotal + (!msg.read && msg.to===userid ? 1: 0),0)
            }
        case RECEIVE_MSG:
            console.log('action.data===>',action.data)
            const {chatMsg} = action.data
            return {
                users:state.users,
                chatMsgs:[...state.chatMsgs,chatMsg],
                unReadCount:state.unReadCount + (!chatMsg.read && chatMsg.to===action.data.userid ? 1: 0)
            }
        case MSG_READ:
            const {count,from,to} = action.data;
            return {
                users:state.users,
                chatMsgs:state.chatMsgs.map(msg=>{
                    // 需要更新
                    if(msg.from === from && msg.to===to && !msg.read){
                        return {...msg,read:true}
                    }else{
                    // 不需要更新
                        return msg
                    }
                }),
                unReadCount:state.unReadCount -count
            }
        default:
            return state
    }
}


const reducer = combineReducers({
    user,
    userList,
    chat
})

export default reducer;
