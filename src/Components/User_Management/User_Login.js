import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button, message } from 'antd';
import { initUserModel } from './Models/User.Model'
import { User_Service } from './Services/User.Service'
import { API_URL } from '../../config'
import './css/Login_Signup.css'

class User_Login extends Component {
    formRef = React.createRef();
    constructor(props) {
        super(props);
        this.state = {
            userModel: { ...initUserModel },
        };
    }

    componentDidMount() {
        const userId = Cookies.get('user_id');
        const token = Cookies.get('access_token');
        if (userId && token) {
            this.props.history.push('/');
        }
    }

    handleUserNameChange = e => {
        const { userModel } = this.state;
        userModel.User_Name = e.target.value;
        this.setState({ userModel });
    }

    handlePasswordChange = e => {
        const { userModel } = this.state;
        userModel.User_Password = e.target.value;
        this.setState({ userModel });
    }

    handleSubmitLoginForm = () => {
        const { userModel } = this.state;
        const isValidatedForm = this.formRef.current.validateFields();
        Promise.all([isValidatedForm]).then(() => {
            Promise.all([User_Service.login(userModel)]).then(result => {
                if (!!result[0].error) {
                    return message.error('Wrong Username or Password!');
                }
                const userId = jsonQuery('user[0]._id', { data: result }).value;
                const userFullName = jsonQuery('user[0].User_Fullname', { data: result }).value;
                const token = `Bearer ${jsonQuery('token', { data: result }).value}`;
                Cookies.set('access_token', token, { expires: new Date(Date.now() + 8 * 3600000) });
                Cookies.set('user_fullname', userFullName, { expires: new Date(Date.now() + 8 * 3600000) });
                Cookies.set('user_id', userId, { expires: new Date(Date.now() + 8 * 3600000) });
                this.props.history.push('/')

            });
        });
    }
    render() {
        return (
            <div className='container'>
                <Form
                    ref={this.formRef}
                    name='normal_login'
                    onFinish={this.handleSubmitLoginForm}
                    className='login-form'
                >
                    <Form.Item
                        name='username'
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input onChange={this.handleUserNameChange} prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
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
                        <Input
                            onChange={this.handlePasswordChange}
                            prefix={<LockOutlined className='site-form-item-icon' />}
                            type='password'
                            placeholder='Password'
                        />
                    </Form.Item>
                    <Form.Item>
                        <Button type='primary' htmlType='submit' className='login-form-button'>
                            {'Log In'}
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <a href={`${API_URL}/User/google`}>
                            <Button type='primary' className='login-form-google-button'>
                                <span className='social-icon'>
                                    <i className='fab fa-google' style={{ width: '24px' }}></i>
                                </span>
                                {'Log in with Google'}
                            </Button>
                        </a>
                    </Form.Item>
                    <Form.Item>
                        <a href={`${API_URL}/User/facebook`}>
                            <Button type='primary' className='login-form-facebook-button'>
                                <span className='social-icon'>
                                    <i className='fab fa-facebook-f' style={{ width: '24px' }}></i>
                                </span>
                                {'Log in with Facebook'}
                            </Button>
                        </a>
                        Or <a href='/register'>register now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export { User_Login };
