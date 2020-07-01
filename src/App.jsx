import React from 'react'
import {HashRouter,Link,Route} from 'react-router-dom'

import Home from './components/home/Home'
import About from './components/about/About'
import Film from './components/Film/Film'

import styles from './css/global.scss'

import { Layout, Menu } from 'antd';
const { Header, Content, Footer } = Layout;

export default class App extends React.Component{
    constructor(props){
        super(props);
        this.state={
        }
    }

    render() {
        return<HashRouter>
            <Layout className="layout" style={{height: '100%'}}>
                <Header>
                    <div className={styles.logo} />
                    <Menu theme="dark" mode="horizontal" defaultSelectedKeys={[window.location.hash.split('/')[1]]} style={{lineHeight: '64px'}}>
                        <Menu.Item key="home"><Link to="/home">首页</Link></Menu.Item>
                        <Menu.Item key="film"><Link to="/film">电影</Link></Menu.Item>
                        <Menu.Item key="about"><Link to="/about">关于</Link></Menu.Item>
                    </Menu>
                </Header>

                <Content style={{ backgroundColor: '#fff',}}>
                    <Route path="/home" component={Home}></Route>
                    <Route path="/film" component={Film}></Route>
                    <Route path="/about" component={About}></Route>
                </Content>

                <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
            </Layout>
        </HashRouter>
    }
}