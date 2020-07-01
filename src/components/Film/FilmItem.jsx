import React from 'react'
import { Spin, Alert, Pagination } from 'antd';

import fetchJsonp from 'fetch-jsonp'

import MovieItem from './MovieItem'

export default class FilmItem extends React.Component{
    constructor(props){
        super(props);
        this.state={
            movies: [],//电影列表
            nowPage: parseInt(props.match.params.page) || 1,
            pageSize: 12,//每页条数
            total: 0,//当前电影分类下总共有多少条数据
            isloading: true,//数据是否加载，true表示正在加载
            movieType: props.match.params.type,//获取电影的类型
        }
    }
    componentWillMount() {
        /*fetch("")
            .then(response => {
                //fetch 获取API时，第一个then获取到的是Response对象，
                // 可以通过response.json()得到一个新的promise
                return response.json()
            })
            .then(data => {
                console.log(data);
            })*/
        // setTimeout(()=>{
        //     this.setState({
        //         isloading: false
        //     })
        // },1000)
        this.loadMovieListByTypeAndPage()
    }

    componentWillReceiveProps(nextProps){
        this.setState({
            isloading: true,
            nowPage: parseInt(nextProps.match.params.page) || 1,
            movieType: nextProps.match.params.type,
            total: 0,
        },function(){
            this.loadMovieListByTypeAndPage()
        })

}

    render() {
        return <div>
            {this.renderList()}
        </div>
    }
    //根据电影类型和页码，获取电影数据
    loadMovieListByTypeAndPage = () => {
        //默认windows.fetch 受跨域的限制，无法直接使用，使用第三方包fetch-jsonp发送jsonp请求


       /* fetch('./public/' + this.state.movieType + '.json')
            .then(response => response.json())
            .then(data => {
                console.log(data);
                setTimeout(() => {
                    this.setState({
                        isloading: false,
                        movies: data.subjects,
                        total: data.total,
                    })
                }, 500)
            })*/

        const key = '0df993c66c0c636e29ecbb5344252a4a';
        const start = this.state.pageSize * (this.state.nowPage - 1)
        const url = `http://api.douban.com/v2/movie/${this.state.movieType}?apikey=`+key+`&start=${start}&count=${this.state.pageSize}`
        console.log(url);
        //'http://api.douban.com/v2/movie/in_theaters?apikey='+key+'&start=0&count=10'
        fetchJsonp(url)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    isloading: false,
                    movies: data.subjects,
                    total: data.total,
                })

            })

        // const data = require('./public/test.json')
        // console.log(data);
        // module.exports = test

    }
    // 渲染电影列表
    renderList = () => {
        if(this.state.isloading){
            return <Spin tip="Loading...">
                <Alert
                    message="正在加载..."
                    description="精彩内容马上实现"
                    type="info"
                />
            </Spin>
        }else{//加载完成
            return <div>
                <div style={{display: 'flex',flexWrap: 'wrap',heigth: '100%'}}>
                    {this.state.movies.map(item=>{
                        return <MovieItem {...item} key={item.id} history={this.props.history}></MovieItem>
                    })}
                </div>
                {/*分页*/}
                <Pagination defaultCurrent={this.state.nowPage}
                            total={this.state.total}
                            pageSize={this.state.pageSize} onChange={this.pageChanged}/>
            </div>
        }
    }

    //当页码改变是，加载新一页数据
    pageChanged = (page) => {
        // window.location.href = '/#/Film/' + this.state.movieType + '/' + page
        //使用react-router-dom 实现编程式导航
        this.props.history.push('/Film/' + this.state.movieType + '/' + page)
    }

}