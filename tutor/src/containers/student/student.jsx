import React, { Component } from 'react'
import {connect} from 'react-redux'
import {getUserList} from '../../redux/actions'
import UserList from '../../components/user-list/user-list'

class Dashen extends Component {
    componentDidMount() {
        this.props.getUserList('teacher')
    }

    render() {
        return (
            <UserList userList={this.props.userList}></UserList>
        )
    }
}

const mapState = (state) => ({
    userList:state.userList
})

const mapDispatch = (dispatch) => ({
    getUserList(type){
        dispatch(getUserList(type))
    }
})

export default connect(mapState,mapDispatch)(Dashen)