import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Input, Button } from 'antd';
import { initUserModel } from './Models/User.Model'
import { User_Service } from './Services/User.Service'
import { API_URL } from '../../config'
import './css/Login_Signup.css'

class User_Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isSignUpForm: true,
            userModel: { ...initUserModel },
        };
    }

    componentDidMount() {
        const user_name = Cookies.get('user_name');
        const token = Cookies.get('access_token');
        if (!!user_name && !!token) {
            this.props.history.push('/');
        }
    }

    handleFormTypeChange = () => {
        const isSignUpForm = !this.state.isSignUpForm;
        this.setState({ isSignUpForm });
    };

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

    handleSubmitLoginForm = e => {
        e.preventDefault();
        const { userModel } = this.state;
        if (userModel.User_Name !== '' && userModel.User_Password !== '') {
            Promise.all([User_Service.login(userModel)]).then(result => {
                const userId = jsonQuery('user[0]._id', { data: result }).value;
                const token = `Bearer ${jsonQuery('token', { data: result }).value}`;
                Cookies.set('access_token', token, { expires: new Date(Date.now() + 8 * 3600000) });
                Cookies.set('user_id', userId, { expires: new Date(Date.now() + 8 * 3600000) });
                this.props.history.push('/')
            });
        } else {
            console.log('Vui long nhap day du thong tin')
        }
    }
    render() {
        return (
            <div className='container'>
                <Form
                    name='normal_login'
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
                        <Input prefix={<UserOutlined className='site-form-item-icon' />} placeholder='Username' />
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
                        <a href={`${API_URL}/User/google`}>
                            <Button type='primary' className='login-form-facebook-button'>
                                <span className='social-icon'>
                                    <i className='fab fa-facebook-f' style={{ width: '24px' }}></i>
                                </span>
                                {'Log in with Facebook'}
                            </Button>
                        </a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export { User_Login };
