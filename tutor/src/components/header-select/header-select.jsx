import React, { Component } from 'react'
import { List, Grid } from 'antd-mobile'
import PropTypes from 'prop-types';

export default class HeaderSelect extends Component {

    static propTypes ={
        setHeader : PropTypes.func.isRequired
    }

    constructor(props){
        super(props)
        this.headerList = [];
        for(let i=0;i<20;i++){
            this.headerList.push({
                text:"頭像"+(i+1),
                icon:require(`../../assets/images/頭像${i+1}.png`)
            })
        }
    }

    state={
        icon:null
    }

    selectIcon = ({text,icon})=>{
       this.setState({icon});
       this.props.setHeader(text)
    }

    render() {
        const listHeader = this.state.icon ? 
                           (<div>已經選擇頭像:<img src={this.state.icon} alt=""/></div>): 
                           "請選擇頭像"
        return (
            <List renderHeader={() => listHeader } className="my-list">
                <Grid data={this.headerList} columnNum={5} onClick={this.selectIcon}/>
            </List>
        )
    }
}