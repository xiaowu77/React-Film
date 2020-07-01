import React from 'react'
import {Route, Link, Switch} from 'react-router-dom'
import FilmItem from './FilmItem'
import FilmDetail from './FilmDetail'

import { Layout, Menu } from 'antd';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;

export default class Film extends React.Component{

    render() {
        return <Layout style={{height: '100%'}}>
                <Sider width={200} className="site-layout-background">
                    <Menu
                        mode="inline"
                        defaultSelectedKeys={[window.location.hash.split('/')[2]]}
                        style={{ height: '100%', borderRight: 0 }}
                    >
                        <Menu.Item key="in_theaters"><Link to="/Film/in_theaters/1">正在热映</Link></Menu.Item>
                        <Menu.Item key="coming_soon"><Link to="/Film/coming_soon/1">即将上映</Link></Menu.Item>
                        <Menu.Item key="top250"><Link to="/Film/top250/1">Top250</Link></Menu.Item>
                    </Menu>
                </Sider>
                <Content style={{borderLeft: '1px solid #f0f2f5',background: '#fff', padding: 24, margin: 0, minHeight: 280}}>
                    {/*使用路由中的Switch，能够指定，如果前面路由规则优先匹配，则放弃匹配后续路由*/}
                    <Switch>
                        <Route path="/Film/detail/:id" component={ FilmDetail}/>
                        <Route path="/Film/:type/:page" component={ FilmItem }/>
                    </Switch>

                </Content>
            </Layout>
    }
}