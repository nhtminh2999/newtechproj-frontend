import React, { Component } from 'react';
import jsonQuery from 'json-query';
import { Modal, Button, Form, Input, Card, Radio, DatePicker, message, Select } from 'antd';
import { openNotification } from '../Common/MethodCommon'
import { initCustomerModel } from './Models/Customer.Model'
import { Customer_Service } from './Services/Customer_Service'
import { User_Select } from '../User_Management/Control/User_Select';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;

class Customer_Update extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            customerModel: { ...initCustomerModel },
            visible: false,
        }
    }

    handleShowModal = () => {
        const { selectedModel } = this.props;
        if (selectedModel.length === 0) {
            openNotification('error', 'Please select data !', '');
            return;
        }
        if (selectedModel.length > 1) {
            openNotification('error', 'Please select one data only !', '');
            return;
        } else {
            const customerModel = selectedModel[0];
            customerModel.UpdatedBy = this.props.user;
            this.setState({ customerModel, visible: true });
            this.formRef.current.setFieldsValue({
                Customer_FullName: customerModel.Customer_Fullname,
                Customer_Birthday: moment(new Date(customerModel.Customer_Birthday)),
                Customer_Phonenumber: customerModel.Customer_Phonenumber,
                Customer_Email: customerModel.Customer_Email,
                Customer_Address: customerModel.Customer_Address,
                CreatedBy: customerModel.CreatedBy,
                CreatedDate: moment(new Date(customerModel.CreatedDate)),
                UpdatedBy: customerModel.UpdatedBy,
                UpdatedDate: moment(new Date()),
                Status: customerModel.Status
            });
        }
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

    handleSubmitForm = () => {
        const isValidatedForm = this.formRef.current.validateFields();
        Promise.all([isValidatedForm])
            .then(values => {
                const { customerModel } = this.state;
                customerModel.Customer_Fullname = values[0].Customer_FullName;
                customerModel.Customer_Phonenumber = values[0].Customer_Phonenumber;
                customerModel.Customer_Birthday = values[0].Customer_Birthday;
                customerModel.Customer_Email = values[0].Customer_Email;
                customerModel.Customer_Address = values[0].Customer_Address;
                customerModel.CreatedBy = values[0].CreatedBy;
                customerModel.CreatedDate = values[0].CreatedDate;
                customerModel.UpdatedBy = values[0].UpdatedBy;
                customerModel.UpdatedDate = values[0].UpdatedDate;
                customerModel.Status = values[0].Status;
                Promise.all([Customer_Service.update(customerModel)]).then(result => {
                    const data = jsonQuery('message[0]', { data: result }).value;
                    if (data === 'Email existed') {
                        message.error('Email existed!');
                    } else if (data === 'Phone existed') {
                        message.error('Phone existed!');
                    } else {
                        this.formRef.current.resetFields();
                        this.props.handleSearch({});
                        this.setState({
                            customerModel: { ...initCustomerModel },
                            visible: false,
                        });
                        openNotification('success', 'Add customer successfully!', '');
                    }
                })
            })
            .catch((info) => {
                console.log('Validate Failed:', info);
            });
    }

    handleCustomerTypeChange = e => {
        const { value } = e.target;
        const { customerModel } = this.state;
        customerModel.Customer_Type = value;
        this.setState({ customerModel });
    };

    render() {
        const { visible, customerModel } = this.state;
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
                    {'Update'}
                </Button>
                <Modal
                    forceRender
                    visible={visible}
                    width='800px'
                    title={'Update customer information'}
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
                                    label='Customer type' colon={false}
                                >
                                    <Radio.Group value={customerModel.Customer_Type} name='Customer_Type' onChange={this.handleCustomerTypeChange}>
                                        <Radio value='Individual'>{'Individual'}</Radio>
                                        <Radio value='Enterprise'>{'Enterprise'}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Customer_FullName' hasFeedback={true}
                                    label='Fullname' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please enter fullname!' }]}
                                >
                                    <Input placeholder='Fullname' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Customer_Birthday' hasFeedback={true}
                                    label='Day of birth' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select!' }]}
                                >
                                    <DatePicker style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Customer_Phonenumber' hasFeedback={true}
                                    label='Phone number' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please input phone number!' }]}
                                >
                                    <Input placeholder='Phone number' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Customer_Email' hasFeedback={true}
                                    label='Email' colon={false}
                                    required={false}
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'The input is not valid E-mail!',
                                        },
                                        {
                                            required: true,
                                            message: 'Please enter  E-mail!',
                                        },
                                    ]}
                                >
                                    <Input placeholder='Email' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Customer_Address' hasFeedback={true}
                                    label='Address' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please enter customer address!' }]}
                                >
                                    <Input placeholder='Address' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='CreatedBy' hasFeedback={true}
                                    label='Created by' colon={false}
                                >
                                    <User_Select disabled={true} value={customerModel.CreatedBy} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='CreatedDate' hasFeedback={true}
                                    label='Created day' colon={false}
                                >
                                    <DatePicker value={customerModel.CreatedDate}
                                        disabled={true} style={{ width: '100%' }}
                                        format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='UpdatedBy' hasFeedback={true}
                                    label='Updated by' colon={false}
                                >
                                    <User_Select disabled={true} value={customerModel.UpdatedBy} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='UpdatedDate' hasFeedback={true}
                                    label='Updated day' colon={false}
                                >
                                    <DatePicker value={customerModel.UpdatedDate} disabled={true} style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name='Status' hasFeedback={true}
                                    label='Status' colon={false}
                                >
                                    <Select style={{ width: '100%' }} >
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

export { Customer_Update };

