import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Layout, Menu } from 'antd'
import { UserOutlined, ContactsOutlined, BarcodeOutlined } from '@ant-design/icons';

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
        return (
            <Sider collapsible collapsed={collapsed} onCollapse={this.onCollapse}>
                <Menu theme='dark' defaultSelectedKeys={defaultSelectedKeys} mode='inline'>
                    <SubMenu key='user' icon={<UserOutlined />} title='User'>
                        <Menu.Item key='profile'>
                            <Link to='/:username/profile'>{'Profile'}</Link>
                        </Menu.Item>
                        <Menu.Item key='logout'>
                            <Link to='/logout'>{'Log out'}</Link>
                        </Menu.Item>
                    </SubMenu>
                    <Menu.Item key='customer' icon={<ContactsOutlined />}>
                        <Link to='/customer'>{'Customer'}</Link>
                    </Menu.Item>
                    <Menu.Item key='product' icon={<BarcodeOutlined />}>
                        <Link to='/product'>{'Product'}</Link>
                    </Menu.Item>
                </Menu>
            </Sider>
        );
    }
}

export default Sidebar;
