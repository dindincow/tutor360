import React from 'react'
import {withRouter} from 'react-router-dom'
import PropTypes from 'prop-types'
import { Card, WingBlank, WhiteSpace } from 'antd-mobile'
import QueueAnim from 'rc-queue-anim';


const Header = Card.Header
const Body = Card.Body

class UserList extends React.Component {

    static propsTypes = {
        userList: PropTypes.array.isRequired
    }

    render() {

        return (
            <WingBlank style={{marginTop: 55,marginBottom:55}}> 
                <QueueAnim type="scale">
                {
                    this.props.userList.map(user => (
                        <div key={user._id}>
                            <WhiteSpace />
                            <Card onClick={()=>{this.props.history.push(`/chat/${user._id}`)}}>
                                <Header
                                    title={user.username}
                                    thumb={user.header ?
                                        require(`../../assets/images/${user.header}.png`) : null}
                                    extra={user.live}
                                />
                                <Body>
                                    {user.age ? <div>年紀 {user.age}</div> : null}
                                    { user.class ? 
                                        user.type==="teacher"? <div>教學項目 {user.class}</div> : <div>學習項目 {user.class}</div>
                                        :null
                                    }
                                    {user.salary ? <div>期望時薪: {user.salary}</div> : null}
                                    <div>描述: {user.info}</div>
                                </Body>
                            </Card>
                        </div>
                    ))
                } 
                </QueueAnim>

            </WingBlank>
        )
    }
}
export default withRouter(UserList)