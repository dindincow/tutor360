import React, { Component } from 'react'
import { connect } from 'react-redux'
import { List, Badge, } from 'antd-mobile'

const Item = List.Item
const Brief = Item.Brief




// 幫訊息分組
function getLastMsgs(chatMsg,meId){

    // 先找出每組聊天最新訊息
    const lastMsgsObj = {}

    chatMsg.forEach(msg => {

        // 如果未讀就=1
        if(msg.to === meId && !msg.read){  
            msg.unReadCount = 1;
        }else{
           
            msg.unReadCount = 0;
        }

        const chatId = msg.chat_id
        const lastMsg = lastMsgsObj[chatId]

        // 判斷這個組的最新聊天訊息是否已存在
        // 不存在加入
        if(!lastMsg){
            lastMsgsObj[chatId] = msg

        }else{
            const unReadCount = lastMsg.unReadCount + msg.unReadCount

            // 存在比較何者最新，來取代
            if (msg.create_time>lastMsg.create_time) {
                lastMsgsObj[chatId] = msg
            }

            lastMsgsObj[chatId].unReadCount = unReadCount;
        }
    });

    // Object.values 會把物件中的值，拿出來，返回陣列。得到所有 lastmsg 的陣列
    const lastMsgs = Object.values(lastMsgsObj)

    // 按照 createtime 排序
    lastMsgs.sort(function (msg1, msg2) {
        return msg2.create_time-msg1.create_time
    })

    return lastMsgs
}


class Message extends Component {
    render() {

        const { user, chat } = this.props
        const meId = user._id
        const { users, chatMsgs } = chat
        const lastMsgs = getLastMsgs(chatMsgs, meId)
        console.log('lastMsgs', lastMsgs)

        return (
            <List className="messageBox">
                {
                    lastMsgs.map(msg => {
                        // 獲取目標用戶ID
                        const targetUserId = msg.to === user._id ? msg.from : msg.to
                        // 獲取目標用戶訊息
                        const targetUser = users[targetUserId]

                        return (
                            <Item
                                key={msg._id}
                                extra={<Badge text={msg.unReadCount} />}
                                thumb={targetUser.header ? require(`../../assets/images/${targetUser.header}.png`) : null}
                                arrow='horizontal'
                                onClick={() => this.props.history.push(`/chat/${targetUserId}`)}
                            >

                                {msg.content}
                                <Brief>{targetUser.username}</Brief>
                            </Item>
                        )
                    })
                }
            </List>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    chat: state.chat
})

const mapDispatch = (dispatch) => ({

})

export default connect(mapState, mapDispatch)(Message)