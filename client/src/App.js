import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { DOMAIN } from './utils/setting'
console.log(DOMAIN);

class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      greeting: ''
    }
  }

  componentDidMount(){
    console.log('componentDidMount');
    axios.get(DOMAIN + '/api/helloworld')
    .then(result => this.setState({greeting: result.data.sayHi}))
    .catch(err => console.log(err))
  }

  render(){
    return (
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
