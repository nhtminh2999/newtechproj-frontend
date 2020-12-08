import React, { Component } from 'react';
import Cookies from 'js-cookie';
import jsonQuery from 'json-query';
import { initUserModel } from './Models/User.Model'
import { User_Service } from './Services/User.Service'
import './css/Login_Signup.css'
import { API_URL } from '../../config'

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
                const user_name = jsonQuery('user[0].User_Name', { data: result }).value;
                const token = `Bearer ${jsonQuery('token', { data: result }).value}`;
                Cookies.set('access_token', token, { expires: new Date(Date.now() + 8 * 3600000) });
                Cookies.set('user_name', user_name, { expires: new Date(Date.now() + 8 * 3600000) });
                this.props.history.push('/')
            });
        } else {
            console.log('Vui long nhap day du thong tin')
        }
    }
    render() {
        return (
            <div className={`${(this.state.isSignUpForm === true ? 'container' : 'container sign-up-mode')}`}>
                <div className="form-container">
                    <div className="signin-signup">
                        <form className='sign-in-form'>
                            <h2 className="title">Sign in</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input onChange={this.handleUserNameChange} type='text' placeholder="Username" />

                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input onChange={this.handlePasswordChange} type='password' placeholder="Password" />
                            </div>
                            <input onClick={this.handleSubmitLoginForm} type="submit" value="Login" className='btn solid' />

                            <p className="social-text">Or Sign in with social platforms</p>
                            <div className="social-media">
                                <a href="#" className='social-icon'>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href={`${API_URL}/User/google`} className='social-icon'>
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>

                        <form className='sign-up-form'>
                            <h2 className="title">Sign up</h2>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type='text' placeholder="Fullname" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-user"></i>
                                <input type='text' placeholder="Username" />
                            </div>
                            <div className="input-field">
                                <i className="fas fa-lock"></i>
                                <input type='password' placeholder="Password" />
                            </div>
                            <input onClick={this.handleSubmitLoginForm} type="submit" value="Sign up" className='btn solid' />

                            <p className="social-text">Or Sign up with social platforms</p>
                            <div className="social-media">
                                <a href="#" className='social-icon'>
                                    <i className="fab fa-facebook-f"></i>
                                </a>
                                <a href="#" className='social-icon'>
                                    <i className="fab fa-google"></i>
                                </a>
                            </div>
                        </form>
                    </div>
                </div>

                <div className="panels-container">
                    <div className="panel left-panel">
                        <div className="content">
                            <h3>New here ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Natus temporibus autem, neque at quidem aperiam sint suscipit libero, minus repellendus,
                                fuga laboriosam facilis omnis provident adipisci! Assumenda labore enim atque.
                                 </p>
                            <button className="btn transparent" onClick={this.handleFormTypeChange} id='sign-up-btn'>Sign up</button>
                        </div>
                        <img src="" className='image' alt="" />
                    </div>
                    <div className="panel right-panel">
                        <div className="content">
                            <h3>One of us ?</h3>
                            <p>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                                Natus temporibus autem, neque at quidem aperiam sint suscipit libero, minus repellendus,
                                fuga laboriosam facilis omnis provident adipisci! Assumenda labore enim atque.
                                 </p>
                            <button className="btn transparent" onClick={this.handleFormTypeChange} id='sign-in-btn'>Sign in</button>
                        </div>
                        <img src="" className='image' alt="" />
                    </div>
                </div>
            </div>
        );
    }
}

export { User_Login };
