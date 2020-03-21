import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import HeaderSelector from '../../components/header-select/header-select'
import { NavBar, InputItem, TextareaItem, Button , WingBlank} from 'antd-mobile'
import {updateUser} from '../../redux/actions'

class BossInfo extends Component {
    state = {
        header: '',
        info: '',
        age: '',
        live: '',
        salary: '',
        class:''
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    } 

    save = ()=>{
        if(this.state.header===""){
            return alert("頭像不能為空")
        }
        this.props.updateUserInfo(this.state);
    }

    setHeader = (header) => {
        this.setState({header})
    }

    render() {

        const {header} = this.props.user
       
        if(header) {
            return <Redirect to='/teacher'/>
        }

        return (
            <div>
                <NavBar className="primary-color">老師訊息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem  placeholder="姓名" onChange={ val => {this.handleChange('name',val)}}>姓名</InputItem>
                <InputItem  placeholder="老師年齡" onChange={ val => {this.handleChange('age',val)}}>老師年齡:</InputItem>
                <InputItem  placeholder="期望時薪" onChange={ val => {this.handleChange('salary',val)}}>期望時薪:</InputItem>
                <InputItem  placeholder="居住城市" onChange={ val => {this.handleChange('live',val)}}>居住城市:</InputItem>
                <InputItem  placeholder="教學科目" onChange={ val => {this.handleChange('class',val)}}>教學科目:</InputItem>
                <TextareaItem title="經驗描述:" rows={3} onChange={ val => {this.handleChange('info',val)}}/>
                <WingBlank>
                    <Button onClick={this.save} className="primary-color">保存</Button>
                </WingBlank>
                   
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user
})

const mapDispatch = (dispatch) => ({
    updateUserInfo(user){
        console.log('111111user1111111',user)
        dispatch(updateUser(user));
    }
})

export default connect(mapState, mapDispatch)(BossInfo)