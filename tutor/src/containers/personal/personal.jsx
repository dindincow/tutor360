import React, { Component } from 'react'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { Result, List, WhiteSpace, Button, Modal,WingBlank} from 'antd-mobile'
import { resetUser} from '../../redux/actions'
const Item = List.Item
const Brief = Item.Brief

class Personal extends Component {

    logOut = () => {
        Modal.alert('退出', '確定登出嗎?', [
            {
                text: '取消',
                onPress: () => console.log('cancel')
            },
            {
                onPress: () => console.log('cancel')
            },
            {
                text: '確認',
                onPress: () => {
                    // 清除cookie 中的userid
                    Cookies.remove('userid')
                    // 重置redux 中的user 状态
                    this.props.resetUser()
                }
            }
        ])
    }

    render() {
        const { username, info, salary, header,_id ,age,live} = this.props.user
        console.log("this.props.user",this.props.user)
        return (
            <div>
                <Result
                    style={{marginTop:55}}
                    img={<img src={require(`../../assets/images/${header}.png`)} style={{ width: 60 }}
                        alt="header" />}
                    title={username}
                    message={`id編號 : ${_id}`}
                />
                <List renderHeader={() => '相關訊息'}>
                    <Item multipleLine>
                        <Brief>居住地: {live}</Brief>
                        <Brief>年齡: {age}</Brief>
                        {salary ? <Brief>希望費用: {salary}</Brief> : null}
                        <Brief>個人簡介: {info}</Brief>
                    </Item>
                </List>
                <WhiteSpace />
                
                    <WingBlank> <Button type='warning' onClick={this.logOut}>退出登录</Button></WingBlank>
               
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => ({
    resetUser(){
        dispatch(resetUser())
    }
})

export default connect(mapState, mapDispatch)(Personal)