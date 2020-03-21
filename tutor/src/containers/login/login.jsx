import React, { Component } from 'react'
import {connect} from 'react-redux'
import {Redirect} from 'react-router-dom';
import {login} from '../../redux/actions'
import {
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Button
} from 'antd-mobile'

import Logo from '../../components/logo/logo'

class Login extends Component {

    state = {
        username:'',
        password:'',
    }

    login = ()=>{
      
        this.props.gologin(this.state);
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    toRegister = ()=>{
        this.props.history.replace('/register')
    }

    render() {
        const {msg,redirectTo} = this.props.state.user;

        console.log('this.props.state==>',this.props.state)
        if (redirectTo) {
         
            return <Redirect to="/"/>
        }
       
        return (
            <div className="loginPage">
                <Logo/>
                <WingBlank>
                    {
                       msg ?<div className="error-msg">{msg}</div> : null
                    }
                    <List>
                        <InputItem  placeholder="請輸入用戶名" onChange={val => this.handleChange('username', val)}>用戶名:</InputItem>
                        <InputItem  placeholder="請輸入密碼" type="password" onChange={val => this.handleChange('password', val)}>密碼:</InputItem>
                    </List>
                    <WhiteSpace/>
                    <Button className="greenBtn" onClick={this.login}>登入</Button>
                    <WhiteSpace/> 
                    <Button className="whiteBorderBtn" onClick={this.toRegister}>去註冊</Button>
                </WingBlank>
             
            </div>
        )
    }
}

const mapState = (state)=>({
    state:state
})

const mapDispatch = (dispatch)=>({
    gologin(user){
        dispatch(login(user))
    }
})


export default connect(mapState,mapDispatch)(Login)