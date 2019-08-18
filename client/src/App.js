import React, { Component } from 'react';
import axios from 'axios';

import logo from './logo.svg';
import './App.css';
import { DOMAIN } from './utils/setting'
//Components
import Subject from './pages/subject'
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
      // <Subject/>
      <div className="App">
        <header className="App-header">
          <h1>{this.state.greeting}</h1>
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    );
  }
}

export default App;
