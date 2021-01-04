import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import Cookies from 'js-cookie';
import { Layout, Menu } from 'antd'
import { UserOutlined, ContactsOutlined } from '@ant-design/icons';
import { API_URL } from '../../config'

const { Sider } = Layout;
const { SubMenu } = Menu;

class Sidebar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
    }

    onCollapse = collapsed => {
        this.setState({ collapsed });
    };

    render() {
        const { collapsed } = this.state;
        const { defaultSelectedKeys } = this.props;
        const userFullName = Cookies.get('user_fullname');
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu theme='dark' defaultSelectedKeys={defaultSelectedKeys} mode='inline'>
                    <SubMenu key='user' icon={<UserOutlined />} title='User'>
                        <Menu.Item key='profile'>
                            <p>{userFullName}</p>
                        </Menu.Item>
                        <Menu.Item key='logout'>
                            <a href={`${API_URL}/User/logout`} >{'Log out'}</a>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='customer' icon={<ContactsOutlined />}>
                        <Link to='/'>{'Customer'}</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Sidebar;
