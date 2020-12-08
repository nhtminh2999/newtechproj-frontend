import React, { Component } from 'react';
import { Router, Route } from 'react-router-dom'
import Sidebar from './Components/Sidebar/Sidebar'
import { User_Login } from './Components/User_Management/User_Login';
import { Customer_List } from './Components/Customer_Management/Customer_List';
import history from './Components/Common/history';
import './App.css'
import 'antd/dist/antd.css'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <>
        <Router history={history}>
          <Route path='/login' exact component={User_Login} />
          <Route path='/' exact component={Sidebar} />
          <Route path='/customer' exact component={Customer_List} />
        </Router>
      </>
    );
  }
}

export default App;
