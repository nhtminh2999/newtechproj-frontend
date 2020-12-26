import React, { Component } from 'react';
import jsonQuery from 'json-query';
import { Modal, Button, Form, Input, Card, DatePicker, message, Select } from 'antd';
import { openNotification } from '../Common/MethodCommon'
import { initContactHistoryModel } from './Models/Contact_History.Model'
import { Contact_History_Service } from './Services/Contact_History.Service'
import { Customer_Code_Select } from '../Customer_Management/Control/Customer_Code_Select';
import { User_Select } from '../User_Management/Control/User_Select';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;

class Contact_History_Add extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            contactHistoryModel: { ...initContactHistoryModel },
            visible: false,
        }
    }

    handleShowModal = () => {
        const { contactHistoryModel } = this.state;
        contactHistoryModel.CreatedBy = this.props.userId;
        contactHistoryModel.UpdatedBy = this.props.userId;
        this.setState({ visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleContactHistoryCustomerChange = value => {
        const { contactHistoryModel } = this.state;
        contactHistoryModel.Contact_History_Customer = value;
        this.setState({ contactHistoryModel });
    };


    handleSubmitForm = () => {
        const isValidatedForm = this.formRef.current.validateFields();
        Promise.all([isValidatedForm])
            .then(values => {
                const { contactHistoryModel } = this.state;
                contactHistoryModel.Contact_History_Customer = values[0].Contact_History_Customer;
                contactHistoryModel.Contact_History_MettingDate = values[0].Contact_History_MettingDate;
                contactHistoryModel.Contact_History_Content = values[0].Contact_History_Content;
                contactHistoryModel.CreatedBy = values[0].CreatedBy;
                contactHistoryModel.CreatedDate = values[0].CreatedDate;
                contactHistoryModel.UpdatedBy = values[0].UpdatedBy;
                contactHistoryModel.UpdatedDate = values[0].UpdatedDate;
                contactHistoryModel.Status = values[0].Status;
                Promise.all([Contact_History_Service.create(contactHistoryModel)]).then(result => {
                    const data = jsonQuery('message[0]', { data: result }).value;
                    if (data === 'Success') {
                        this.formRef.current.resetFields();
                        this.props.handleSearch({});
                        this.setState({
                            contactHistoryModel: { ...initContactHistoryModel },
                            visible: false,
                        });
                        openNotification('success', 'Add contact history successfully!', '');
                    }
                })
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    render() {
        const { visible, contactHistoryModel } = this.state;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24, },
                sm: { span: 8, },
            },
            wrapperCol: {
                xs: { span: 24, },
                sm: { span: 16, },
            },
        };
        const gridStyle = {
            width: '50%',
            padding: '5px 15px',
            border: 'none',
            boxShadow: 'none'
        };
        return (
            <>
                <Button type='primary' onClick={this.handleShowModal}>
                    {'Add'}
                </Button>
                <Modal
                    visible={visible}
                    width='800px'
                    title={'Add contact history'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key='back' onClick={this.handleCancel}>
                            {'Return'}
                        </Button>,
                        <Button key='ok' type='primary' onClick={this.handleSubmitForm}>
                            {'OK'}
                        </Button>,
                    ]}
                >
                    <Form ref={this.formRef} {...formItemLayout} labelAlign='left' style={{ display: 'block' }}>
                        <Card bordered={false}>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Contact_History_Customer' hasFeedback={true}
                                    label='Customer' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select customer!' }]}
                                >
                                    <Customer_Code_Select onChange={this.handleContactHistoryCustomerChange} p />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Contact_History_MettingDate' hasFeedback={true}
                                    label='Meeting date' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select!' }]}
                                    initialValue={moment(new Date())}
                                >
                                    <DatePicker style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Contact_History_Content' hasFeedback={true}
                                    label='Content' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please enter content!' }]}
                                >
                                    <Input.TextArea autoSize={{ minRows: 1, maxRows: 10 }} placeholder='Content' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='CreatedBy' hasFeedback={true}
                                    label='Created by' colon={false} initialValue={contactHistoryModel.CreatedBy}
                                >
                                    <User_Select disabled={true} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='CreatedDate' hasFeedback={true}
                                    label='Created day' colon={false}
                                    initialValue={moment(new Date())}
                                >
                                    <DatePicker disabled={true} style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='UpdatedBy' hasFeedback={true}
                                    label='Updated by' colon={false} initialValue={contactHistoryModel.UpdatedBy}
                                >
                                    <User_Select disabled={true} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='UpdatedDate' hasFeedback={true}
                                    label='Updated day' colon={false}
                                    initialValue={moment(new Date())}
                                >
                                    <DatePicker disabled={true} style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Status' hasFeedback={true}
                                    label='Status' colon={false}
                                    initialValue='Activate'
                                >
                                    <Select style={{ width: '100%' }}
                                        disabled={true}
                                    >
                                        <Option key={'1'} value={'Activate'}>{'Activate'}</Option>
                                        <Option key={'2'} value={'Deactivate'}>{'Deactivate'}</Option>
                                    </Select>
                                </Form.Item>
                            </Card.Grid>
                        </Card>
                    </Form>
                </Modal>
            </>
        );
    }
}

export { Contact_History_Add };
