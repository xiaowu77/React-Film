import React from 'react'

import { Button, Spin, Alert } from 'antd';

import fetchJsonp from 'fetch-jsonp'

export default class FilmDetail extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            info: {},//电影信息对象
            isloading: true,
        }
    }
    componentWillMount(){
        fetchJsonp('http://api.douban.com/v2/movie/subject/' +
            this.props.match.params.id + '?apikey=0df993c66c0c636e29ecbb5344252a4a')
            .then(response => response.json())
            .then(data => {
                this.setState({
                    isloading: false,
                    info: data
                })
            })
    }

    render(){
        return<div>
            <Button type="primary" onClick={this.goBack}>
                返回
            </Button>
            {this.renderInfo()}
        </div>
    }
    renderInfo =()=>{
        if(this.state.isloading){
            return <Spin tip="Loading...">
                <Alert
                    message="正在加载..."
                    description="精彩内容马上实现"
                    type="info"
                />
            </Spin>
        }else{
            return <div style={{textAlign: 'center'}}>
                <h2>{this.state.info.title}</h2>
                <img src={this.state.info.images.large} alt=""/>
                <p style={{textIndent: '2em', lineHeight: '30px'}}>{this.state.info.summary}</p>
            </div>
        }
    }
    goBack =()=> {
        this.props.history.go(-1);
    }
}