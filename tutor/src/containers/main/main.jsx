import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { NavBar } from 'antd-mobile'
import { connect } from 'react-redux'
import Cookies from 'js-cookie'
import { getRedirectTo } from '../../utils/index'
import { getUser } from '../../redux/actions'
import TeacherInfo from '../teacher-info/teacher-info'
import StudentInfo from '../student-info/student-info'
import Student from '../student/student'
import Teacher from '../teacher/teacher'
import Message from '../message/message'
import Personal from '../personal/personal'
import NotFound from '../../components/not-found/not-found'
import NavFooter from '../../components/nav-footer/nav-footer'
import Chat from '../../containers/chat/chat'


class Main extends Component {

    navList = [
        {
            path: '/teacher', // 路由路径
            component: Teacher,
            title: '學生列表',
            icon: 'student',
            text: '學生',
        },
        {
            path: '/student', // 路由路径
            component: Student,
            title: '老師列表',
            icon: 'teacher',
            text: '老師',
        },
        {
            path: '/message', // 路由路径
            component: Message,
            title: '消息列表',
            icon: 'message',
            text: '消息',
        },
        {
            path: '/personal', // 路由路径
            component: Personal,
            title: '用户中心',
            icon: 'personal',
            text: '個人',
        }
    ]

    componentDidMount() {
        const userId = Cookies.get('userid');
        const { _id } = this.props.user;

        // 如果COOKIE 有 USERID 但 REDUX 沒有_ID 則要發請求獲取 USER 資料
        if (userId && !_id) {
            this.props.getUser()
        }

    }

    render() {

        // 判斷Cookies中是否有 userid
        const userId = Cookies.get('userid');
        if (!userId) {
            return <Redirect to="/login" />
        }
        const { user,unReadCount } = this.props;
        if (!user._id) {
            return null;
        } else {
            let path = this.props.location.pathname;
            if (path === "/") {
                path = getRedirectTo(user.type, user.header);
                return <Redirect to={path} />
            }
        }

        // 得到當前的nav
        const pathname = this.props.location.pathname
        const currentNav = this.navList.find(nav => nav.path === pathname)

        if(currentNav){
            if(user.type==="teacher"){
                this.navList[1].hide=true;
            }else{
                this.navList[0].hide=true;
            }
        }

        return (
            <div>
                {currentNav ? <NavBar className='stick-top'>{currentNav.title}</NavBar> : null}
                <Switch>
                    {
                        this.navList.map((nav,index) => <Route key={index} path={nav.path} component={nav.component}></Route>)
                    }
                    <Route path="/studentinfo" component={StudentInfo}></Route>
                    <Route path="/teacherinfo" component={TeacherInfo}></Route>
                    <Route path="/chat/:userid" component={Chat}></Route>
                    <Route component={NotFound}></Route>
                </Switch>
                {currentNav ? <NavFooter navList={this.navList} unReadCount={unReadCount}/> : null}
            </div>
        )
    }
}

const mapState = (state) => ({
    user: state.user,
    unReadCount:state.chat.unReadCount
})

const mapDispatch = (dispatch) => ({
    getUser() {
        dispatch(getUser());
    }
})


export default connect(mapState, mapDispatch)(Main)