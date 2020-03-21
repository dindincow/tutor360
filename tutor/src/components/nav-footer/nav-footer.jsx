import React from 'react'
import PropTypes from 'prop-types'
import {TabBar} from 'antd-mobile'
import {withRouter} from 'react-router-dom'
const Item = TabBar.Item

class NavFooter extends React.Component {
    static propTypes = {
        navList: PropTypes.array.isRequired,
        unReadCount:PropTypes.number.isRequired
    }
    render() {
        
        let navList = this.props.navList.filter(nav => !nav.hide)
        // 找出 navList 屬性 hide 不為 true的
        navList = navList.filter(nav => !nav.hide)


        const { pathname } = this.props.location
        console.log('pathname',pathname)
        
        return (
            <TabBar>
                {
                    navList.map((nav, index) => (
                        <Item key={nav.path}
                            badge={nav.path==='/message'?this.props.unReadCount:0}
                            title={nav.text}
                            icon={{ uri: require(`./images/${nav.icon}.png`) }}
                            selectedIcon={{ uri: require(`./images/${nav.icon}-selected.png`) }}
                            selected={pathname === nav.path}
                            onPress={() => {
                                this.props.history.replace(nav.path)
                            }}
                        />
                    ))
                }
            </TabBar>
        )
    }
}
export default withRouter(NavFooter) 