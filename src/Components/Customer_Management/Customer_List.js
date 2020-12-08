import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { Layout, Breadcrumb, Table, Button, Modal } from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { openNotification } from '../Common/MethodCommon'
import Sidebar from '../Sidebar/Sidebar';
import { Customer_Add } from './Customer_Add';
import { Customer_Update } from './Customer_Update'
import { Customer_Search } from './Customer_Search';
import { initSearchModel, columns } from './Models/Customer.Model'
import { Customer_Service } from './Services/Customer_Service'

const { Content, Footer } = Layout;
const { confirm } = Modal;

class Customer_List extends Component {
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
        this.handleSearch(searchModel);
    }

    handleSearch = (searchModel) => {
        Promise.all([Customer_Service.search(searchModel)]).then(result => {
            const data = jsonQuery('result', { data: result }).value;
            this.setState({ dataSource: [...data], selectedModel: [] });
        })
    }

    handleSelectedRowChange = (selectedRowKey, selectedRows) => {
        this.setState({ selectedModel: selectedRows });
    }

    handleSearchModelChange = value => {
        const searchModel = { ...value };
        this.setState({ searchModel });
    }

    showDeleteItemConfirm = (handleSearch) => {
        const { listDelete, selectedModel } = this.state;
        selectedModel.forEach(s => {
            listDelete.push(s.Customer_Code);
        });
        if (listDelete.length === 0) {
            openNotification('error', 'Please select data !', '');
            return;
        }
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                Promise.all([Customer_Service.deleteModels(listDelete)]).then(result => {
                    const message = jsonQuery('message', { data: result }).value;
                    if (message[0] === 'Success') {
                        openNotification('success', 'Delete customer successfully!', '');
                        handleSearch({});
                    }
                })
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    }

    render() {
        const { dataSource, searchModel, selectedModel, user, token } = this.state;
        const pagination = {
            position: ['bottomLeft'],
            showQuickJumper: true,
            defaultPageSize: 10,
            showSizeChanger: true,
            pageSizeOptions: ['10', '20', '30']
        };
        const rowSelection = {
            onChange: this.handleSelectedRowChange,
            fixed: true,
        };
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <Sidebar defaultSelectedKeys='customer'></Sidebar>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                            <Breadcrumb.Item>Customer</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                            {/* Search field */}
                            <Customer_Search
                                handleSearch={this.handleSearch}
                                searchModel={searchModel}
                                onChange={this.handleSearchModelChange} />
                            <div className='button_field'>

                                {/* Search button */}
                                <Button type='primary' onClick={() => this.handleSearch(searchModel)} >{'Search'}</Button>

                                {/* Add button */}
                                <Customer_Add handleSearch={this.handleSearch}
                                    user={user} token={token} />

                                {/* Update button */}
                                <Customer_Update handleSearch={this.handleSearch}
                                    selectedModel={selectedModel}
                                    user={user} token={token} />

                                {/* Delete button */}
                                <Button type='primary' onClick={() => this.showDeleteItemConfirm(this.handleSearch)}>{'Delete'}</Button>
                            </div>

                            <Table
                                rowSelection={{ ...rowSelection }}
                                rowKey='Customer_Code'
                                style={{ width: '100%', marginTop: '10px' }}
                                scroll={{ x: 'max-content' }}
                                pagination={pagination}
                                bordered={true}
                                dataSource={dataSource}
                                columns={columns} />
                        </div>
                    </Content>
                    <Footer style={{ textAlign: 'center' }}></Footer>
                </Layout>
            </Layout>
        );
    }
}

export { Customer_List };
