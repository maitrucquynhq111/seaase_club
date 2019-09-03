import React, { Component } from 'react';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom';

import logo from './logo.svg';
import './App.css';
import { DOMAIN } from './utils/setting'
//Components
import Subject from './pages/subject'
import Semester from './pages/semester'
import User from './pages/user'
console.log(DOMAIN);

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      greeting: ''
    }
  }

  componentDidMount(){    
    // axios.get(DOMAIN + '/api/helloworld')
    // .then(result => {
    //   console.log(result);
      
    //   this.setState({greeting: result.data.sayHi})
    // })
    // .catch(err => console.log(err))
  }

  render(){
    return (
      <div style={{height: '100%'}}>
      <Switch> 
          <Route path='/semester' exact render={(props) => <Semester {...props}/>} />
          <Route path='/subject' exact render={(props) => <Subject {...props}/>} />
          <Route path='/' exact render={(props) => <User {...props}/>} />
      </Switch>
      </div>
      // <div className="App">
      //   <header className="App-header">
      //     <h1>{this.state.greeting}</h1>
      //     <img src={logo} className="App-logo" alt="logo" />
      //     <p>
      //       Edit <code>src/App.js</code> and save to reload.
      //     </p>
      //     <a
      //       className="App-link"
      //       href="https://reactjs.org"
      //       target="_blank"
      //       rel="noopener noreferrer"
      //     >
      //       Learn React
      //     </a>
      //   </header>
      // </div>
    );
  }
}

export default App;
