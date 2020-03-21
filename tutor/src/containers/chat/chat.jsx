import React, { Component } from 'react'
import { connect } from 'react-redux'
import {NavBar, List, InputItem,Icon} from 'antd-mobile'
import {sendMsg,readMsg} from '../../redux/actions'
import Emojify, {emojify}from 'react-emojione';


const Item = List.Item;

class Chat extends Component {

    state = {
        content: '',
        isShow:false
    }

    handleSend = ()=>{
        const from = this.props.user._id;
        const to = this.props.match.params.userid;
        const content = this.state.content.trim();

        if(content){
            this.props.sendMsg({from,to,content})
        }

        this.setState({content:'', isShow:false})
    }

    toggleShow = ()=>{
        const isShow = !this.state.isShow
        this.setState({isShow})
        if(isShow) {
            setTimeout(() => {
                    window.dispatchEvent(new Event('resize'))
            }, 0)
        }  
    } 

    handleContent = (iconTitle) =>{
        console.log('iconTitle',iconTitle)

        // const pic = emojify(iconTitle,{output: 'unicode'})

        const pic = emojify(iconTitle,{output: 'unicode'})
        
        console.log("pic",pic)
        this.setState({
            content: this.state.content + pic
        })
        
    }

    componentWillMount () {
        this.emojis = [':sweat:',':wink:','😸',':D',':smirk:',':laughing:',':blush:',':cold_sweat:',
                       ':heart:',':scream:',':star2:',':broken_heart:',':poop:',':clap:',':sparkles:',':thumbsdown:',
                       ':boom:',':kissing_heart:',':heart_eyes:',':musical_note:',':eyes:',':zzz:',':innocent:',':yum:',
                       ':stuck_out_tongue:',':speech_balloon:',':droplet:',':love_letter:',':sunny:',':horse:',':cloud:',':cat:']

        // this.emojis =['😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁','😁']
        // this.emojis = this.emojis.map(value => ({text: value}))
    }

    componentDidMount() {
        // 一進消息列表先滑到底部
        window.scrollTo(0, document.body.scrollHeight)

        // 發請求更新未讀狀態
        // const from = this.props.match.params.userid;
        // const to = this.props.user._id;
        // this.props.readMsg(from,to)
      
    }
    componentDidUpdate () {
        // 發送消息後滑到底部
        window.scrollTo(0, document.body.scrollHeight)
    }

    componentWillUnmount () {
        
        // 退出和它人對話前，先調用
        // 發請求更新未讀狀態
        const form = this.props.match.params.userid;
        const to = this.props.user._id;
        this.props.readMsg(form,to)
    }


    render() {

        const {user} = this.props;
        const {users,chatMsgs} = this.props.chat;
       
        // 計算當前聊天 chatID
        const meId = user._id;

        if(!users[meId]){
            return null;
        }

        const targetId = this.props.match.params.userid;
        const chatId = [meId,targetId].sort().join("_");
      

        // 篩選出我和目標聊天的 msg 資料
        const msgs = chatMsgs.filter(msg=>msg.chat_id === chatId)

        // 獲取目標用戶的頭像
        const targatHeader = users[targetId].header;
        const targatIcon = targatHeader ? require(`../../assets/images/${targatHeader}.png`) : null;

        const options = {
            convertShortnames: true,
            convertUnicode: true,
            convertAscii: true,
            style: {
                height: 32,
                margin: 4,
                textIndent: 9999
            },
        };

        return (
            <div id='chat-page'>
                <NavBar icon={<Icon type="left"/>} 
                        className='stick-top'
                        onLeftClick={() => this.props.history.goBack()}>
                    {users[targetId].username}
                </NavBar>  
             
                <List className='chatlist'>
                    {
                        msgs.map( msg =>{
                            //別人發給我的訊息
                            if(msg.from ===targetId){
                                return  (<Item key={msg._id} thumb={targatIcon}>
                                        <span className="otherChat">{emojify(msg.content)}</span>
                                </Item>)
                            }else{
                            //我發給別人的訊息  
                                return  (<Item key={msg._id} className='chat-me' extra='我'> 
                                            <span className="meChat"> {emojify(msg.content,options)}</span> 
                                        </Item>)
                            }
                        })
                    }
                </List>

                <div className='am-tab-bar'>
                    <InputItem
                        placeholder="请输入"
                        value =  {this.state.content}
                        onFocus = {()=>{this.setState({isShow:false})}}
                        onChange={val=>{this.setState({content:val})}}
                        extra={
                            <span>
                                <span onClick={this.toggleShow} style={{marginRight: 5}}> 
                                    <Emojify style={{height: 25, width: 25}}>:smiley:</Emojify>
                                </span>
                                <span onClick={this.handleSend}>发送</span>
                            </span>
                           
                        }
                    />

                    {
                        this.state.isShow ? (
                                
                            <div className="emogisIconWraper">
                                {
                                    this.emojis.map((icon,index)=>{
                                        return(
                                            <Emojify 
                                                style={{height: 25, width: 25}} 
                                                key={index}
                                                onClick={e => this.handleContent(e.target.title)}>
                                                {icon}
                                            </Emojify>
                                        )
                                    })
                                }
                            
                            </div>   
                        ):null

                    }
 
                </div>
            </div>
        )
    }
}

const mapState = (state) => ({
    user:state.user,
    chat:state.chat
})

const mapDispatch = (dispatch) => ({
    sendMsg(data){
        dispatch(sendMsg(data))
    },
    readMsg(form,to){
        dispatch(readMsg(form,to))
    }
})

export default connect(mapState, mapDispatch)(Chat)