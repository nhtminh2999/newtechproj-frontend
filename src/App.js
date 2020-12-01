import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { User_Login } from './Components/User_Management/User_Login';
import Cookies from 'js-cookie';
import 'antd/dist/antd.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      User_Name: Cookies.get('user-name'),
    }
  }

  render() {
    const User_Name = Cookies.get('access_token');
    console.log(User_Name);
    return (
      <>
        <Router>
          <Route path='/login' exact component={User_Login} />
        </Router>
      </>
    );
  }
}

export default App;
