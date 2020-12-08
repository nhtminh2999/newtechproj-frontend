import React, { Component } from 'react';
import { Modal, Button, Form, Input, Card, Radio, DatePicker, Select } from 'antd';
import { initCustomerModel } from './Models/Customer.Model'
import { User_Select } from '../User_Management/Control/User_Select';
import moment from 'moment';

const dateFormat = 'DD-MM-YYYY';
const { Option } = Select;

class Customer_View extends Component {
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
        const customerModel = selectedModel;
        this.setState({ customerModel, visible: true });
    };

    handleCancel = () => {
        this.setState({ visible: false });
    };

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
                <a onClick={this.handleShowModal} >{this.props.username}</a>
                <Modal
                    visible={visible}
                    width='800px'
                    title={'View customer information'}
                    onCancel={this.handleCancel}
                    footer={[
                        <Button key='back' onClick={this.handleCancel}>
                            {'Return'}
                        </Button>,
                    ]}
                >
                    <Form ref={this.formRef} {...formItemLayout} labelAlign='left' style={{ display: 'block' }}>
                        <Card bordered={false}>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    label='Customer type' colon={false}
                                >
                                    <Radio.Group value={customerModel.Customer_Type}
                                        disabled={true}
                                        onChange={this.handleCustomerTypeChange}>
                                        <Radio value='Individual'>{'Individual'}</Radio>
                                        <Radio value='Enterprise'>{'Enterprise'}</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    name="Customer_Fullname"
                                    valuePropName="daf"
                                    hasFeedback={true}
                                    label='Fullname' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please enter fullname!' }]}
                                >
                                    <Input value={customerModel.Customer_Fullname} disabled={true} placeholder='Fullname' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Day of birth' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please select!' }]}
                                >
                                    <DatePicker value={moment(new Date(customerModel.Customer_Birthday))} disabled={true} style={{ width: '100%' }} format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Phone number' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please input phone number!' }]}
                                >
                                    <Input value={customerModel.Customer_Phonenumber} disabled={true} placeholder='Phone number' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
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
                                    <Input value={customerModel.Customer_Email} disabled={true} placeholder='Email' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Address' colon={false}
                                    required={false}
                                    rules={[{ required: true, message: 'Please enter customer address!' }]}
                                >
                                    <Input value={customerModel.Customer_Address} disabled={true} placeholder='Address' />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Created by' colon={false}
                                >
                                    <User_Select disabled={true} value={customerModel.CreatedBy} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Created day' colon={false}
                                >
                                    <DatePicker value={moment(new Date(customerModel.CreatedDate))}
                                        disabled={true} style={{ width: '100%' }}
                                        format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Updated by' colon={false}
                                >
                                    <User_Select disabled={true} value={customerModel.UpdatedBy} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Updated day' colon={false}
                                >
                                    <DatePicker value={moment(new Date(customerModel.UpdatedDate))}
                                        disabled={true}
                                        style={{ width: '100%' }}
                                        format={dateFormat} />
                                </Form.Item>
                            </Card.Grid>
                            <Card.Grid style={gridStyle} hoverable={false}>
                                <Form.Item
                                    hasFeedback={true}
                                    label='Status' colon={false}
                                >
                                    <Select style={{ width: '100%' }} value={customerModel.Status} disabled={true} >
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

export { Customer_View };

