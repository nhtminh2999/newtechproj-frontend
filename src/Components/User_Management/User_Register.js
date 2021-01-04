import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { initUserModel } from './Models/User.Model'
import { User_Service } from './Services/User.Service';

class User_Register extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            userModel: { ...initUserModel },
        };
    }

    handleUserNameChange = e => {
        const { userModel } = this.state;
        userModel.User_Name = e.target.value;
        this.setState({ userModel });
    }

    handleFullnameChange = e => {
        const { userModel } = this.state;
        userModel.User_Fullname = e.target.value;
        this.setState({ userModel });
    }

    handlePasswordChange = e => {
        const { userModel } = this.state;
        userModel.User_Password = e.target.value;
        this.setState({ userModel });
    }

    handleSubmitRegisterForm = () => {
        const { userModel } = this.state;
        const isValidatedForm = this.formRef.current.validateFields();
        Promise.all([isValidatedForm]).then(() => {
            Promise.all([User_Service.register(userModel)]).then(result => {
                if (result[0].error) {
                    return message.error('Username has been used !');
                }
                this.props.history.push('/login')
            });
        });
    }
    render() {
        return (
            <div className='container'>
                <Form
                    ref={this.formRef}
                    name='normal_login'
                    onFinish={this.handleSubmitRegisterForm}
                    className='register-form'
                >
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your user name!',
                            },
                        ]}
                    >
                        <Input onChange={this.handleUserNameChange} placeholder='Username' />
                    </Form.Item>
                    <Form.Item
                        name='fullname'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your full name!',
                            },
                        ]}
                    >
                        <Input onChange={this.handleFullnameChange} placeholder='Full name' />
                    </Form.Item>
                    <Form.Item
                        name='password'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input.Password
                            onChange={this.handlePasswordChange}
                            placeholder='Password'
                        />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder='Confirm password' />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='register-form-button'>
                            {'Register'}
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export { User_Register };

