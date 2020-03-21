import React, { Component } from 'react'
import {Redirect} from 'react-router-dom';
import {
    WingBlank,
    List,
    InputItem,
    WhiteSpace,
    Radio,
    Button,
    Toast
} from 'antd-mobile'
import {connect} from 'react-redux'
import Logo from '../../components/logo/logo'
import {register,resetUser} from '../../redux/actions'

class Register extends Component {

    state = {
        username:'',
        password:'',
        password2:'',
        type:'teacher' /*teacher,student*/ 

    }

    register = ()=>{
        
        this.props.goRegister(this.state);
    }

    handleChange = (name, value) => {
        this.setState({[name]: value})
    }

    toLogin = ()=>{
        this.props.history.replace('/login')
    }

    componentDidMount(){
        this.props.resetMsg();
    }

    render() {
       
        // const {msg,redirectTo} = this.props.state.user;

        // if (redirectTo) {
        //     return <Redirect to={redirectTo}/>
        // }


        const {msg} = this.props.state.user;

        return (
            <div className="registerPage">
                <Logo/>
              
                <WingBlank>
                    {
                       msg ?<div className="error-msg">{msg}</div> : null
                    }
                    <List className="register">
                        <InputItem  placeholder="請輸入用戶名" onChange={val => this.handleChange('username', val)}>用戶名:</InputItem>
                        <InputItem  placeholder="請輸入密碼" type="password" onChange={val => this.handleChange('password', val)}>密碼:</InputItem>
                        <InputItem  placeholder="請再次確認密碼" type="password" onChange={val => this.handleChange('password2', val)}>確認密碼:</InputItem>
                        <List.Item>
                            <span>用户类型:</span>
                            <Radio className="ml-25" 
                                checked={this.state.type==='teacher'}
                                onClick={() => {this.handleChange('type', 'teacher')}}
                            >老師</Radio>
                            <Radio className="ml-25" 
                                checked={this.state.type==='student'}
                                onClick={() => {this.handleChange('type', 'student')}}>
                            學生</Radio>
                        </List.Item>
                    </List>
                    <WhiteSpace/>
                    <Button className="greenBtn" onClick={this.register}>註 冊</Button>
                    <WhiteSpace/>
                    <Button className="whiteBorderBtn" onClick={this.toLogin}>我有帳號</Button>
                </WingBlank>
             
            </div>
        )
    }
}

const mapState = (state)=>({
    state:state
})

const mapDispatch = (dispatch)=>({
    goRegister(user){
        dispatch(register(user))
    },
    resetMsg(){
        dispatch(resetUser())
    }
})


export default connect(mapState,mapDispatch)(Register)