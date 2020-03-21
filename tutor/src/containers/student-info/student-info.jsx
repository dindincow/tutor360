import React, { Component } from 'react'
import HeaderSelector from '../../components/header-select/header-select'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'
import {updateUser} from '../../redux/actions'

import {NavBar,InputItem,Button,TextareaItem,WingBlank} from 'antd-mobile'


class DashenInfo extends Component {

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
        this.props.updateUserInfo(this.state);
    }

    setHeader = (header) => {
        this.setState({header})
    }

    render() {

        // 如果訊息完善，則跳轉
        const {header} = this.props.user
        if(header) {
            return <Redirect to='/student'/>
        }

        return (
            <div>
                <NavBar style="background: #2cb9b0">學生訊息完善</NavBar>
                <HeaderSelector setHeader={this.setHeader}/>
                <InputItem  placeholder="學生姓名" onChange={ val => {this.handleChange('name',val)}}>學生姓名:</InputItem>
                <InputItem  placeholder="學生年紀" onChange={ val => {this.handleChange('age',val)}}>學生年紀:</InputItem>
                <InputItem  placeholder="學習科目" onChange={ val => {this.handleChange('class',val)}}>學習科目:</InputItem>
                <InputItem  placeholder="居住城市" onChange={ val => {this.handleChange('live',val)}}>居住城市:</InputItem>
                <InputItem  placeholder="期望時薪" onChange={ val => {this.handleChange('salary',val)}}>期望時薪:</InputItem>
                <TextareaItem title="學生介紹:" rows={3} onChange={ val => {this.handleChange('info',val)}}/>
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
        dispatch(updateUser(user));
    }
})

export default connect(mapState,mapDispatch)(DashenInfo)