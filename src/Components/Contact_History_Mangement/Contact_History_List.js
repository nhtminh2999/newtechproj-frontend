import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { Layout, Breadcrumb, Table, Button, Modal } from 'antd';
import { initSearchModel, columns } from './Models/Contact_History.Model';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { openNotification } from '../Common/MethodCommon'
import Sidebar from '../Sidebar/Sidebar';
import { Contact_History_Service } from './Services/Contact_History.Service'
import { Contact_History_Search } from './Contact_History_Search';
import { Contact_History_Add } from './Contact_History_Add';
import { Contact_History_Update } from './Contact_History_Update.';


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
            userId: '',
            token: '',
        }
    }

    componentDidMount() {
        const { searchModel } = this.state;
        const userId = Cookies.get('user_id');
        const token = Cookies.get('access_token');
        if (!userId && !token) {
            this.props.history.push('/login');
        }
        this.setState({ userId, token });
        this.handleSearch(searchModel);
    }

    handleSearch = (searchModel) => {
        Promise.all([Contact_History_Service.search(searchModel)]).then(result => {
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
        selectedModel.forEach(s => listDelete.push(s.Contact_History_Code));
        if (listDelete.length === 0) {
            openNotification('error', 'Please select data !', '');
            return;
        }
        confirm({
            title: 'Do you Want to delete these items?',
            icon: <ExclamationCircleOutlined />,
            onOk() {
                Promise.all([Contact_History_Service.deleteModels(listDelete)]).then(result => {
                    const message = jsonQuery('message', { data: result }).value;
                    if (message[0] === 'Success') {
                        openNotification('success', 'Delete contact successfully!', '');
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
        const { dataSource, searchModel, selectedModel, userId, token } = this.state;
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
                <Sidebar defaultSelectedKeys='contact'></Sidebar>
                <Layout className="site-layout">
                    <Content style={{ margin: '0 16px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                            <Breadcrumb.Item>App</Breadcrumb.Item>
                            <Breadcrumb.Item>Contact history</Breadcrumb.Item>
                        </Breadcrumb>
                        <div className="site-layout-background" style={{ padding: 24, minHeight: 360, background: '#fff' }}>

                            {/* Search field */}
                            <Contact_History_Search
                                handleSearch={this.handleSearch}
                                searchModel={searchModel}
                                onChange={this.handleSearchModelChange} />

                            <div className='button_field'>
                                {/* Search button */}
                                <Button type='primary' onClick={() => this.handleSearch(searchModel)} >{'Search'}</Button>

                                {/* Add button */}
                                <Contact_History_Add handleSearch={this.handleSearch}
                                    userId={userId} token={token} />

                                {/* Update button */}
                                <Contact_History_Update handleSearch={this.handleSearch} selectedModel={selectedModel}
                                    userId={userId} token={token} />

                                {/* Delete button */}
                                <Button type='primary' onClick={() => this.showDeleteItemConfirm(this.handleSearch)}>{'Delete'}</Button>

                            </div>

                            <Table
                                rowSelection={{ ...rowSelection }}
                                rowKey='Contact_History_Code'
                                style={{ width: '100%', marginTop: '10px' }}
                                scroll={{ x: 'max-content' }}
                                pagination={pagination}
                                bordered={true}
                                dataSource={dataSource}
                                columns={columns} />
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}

export { Contact_History_List };