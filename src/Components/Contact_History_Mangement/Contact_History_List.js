import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { Layout, Breadcrumb, Table, Button, Modal } from 'antd';
import { initSearchModel } from './Models/Contact_History.Model';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { openNotification } from '../Common/MethodCommon'
import Sidebar from '../Sidebar/Sidebar';
import { Contact_History_Service } from './Services/Contact_History.Service'
import { Contact_History_Add } from './Contact_History_Add';

const { Content, Footer } = Layout;
const { confirm } = Modal;

class Contact_History_List extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchModel: { ...initSearchModel },
            dataSource: [],
            selectedModel: [],
            listDelete: [],
            user: '',
            token: '',
        }
    }

    componentDidMount() {
        const { searchModel } = this.state;
        const user = Cookies.get('user_name');
        const token = Cookies.get('access_token');
        if (!user && !token) {
            this.props.history.push('/login');
        }
        this.setState({ user, token });
    }

    handleSearch = (searchModel) => {
        Promise.all([Contact_History_Service.search(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: [...data], selectedModel: [] });
        })
    }

    handleSearchModelChange = value => {
        const searchModel = { ...value };
        this.setState({ searchModel });
    }

    render() {
        const { dataSource, searchModel, selectedModel, user, token } = this.state;
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar defaultSelectedKeys='contact'></Sidebar>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                            <Breadcrumb.Item>Customer</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}></div>

                        <div className='button_field'>
                            {/* Add button */}
                            <Contact_History_Add handleSearch={this.handleSearch}
                                user={user} token={token} />

                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export { Contact_History_List };