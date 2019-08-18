import React, { Component } from 'react';
import axios from 'axios';
import { DOMAIN } from '../utils/setting'

class Subject extends Component{
  constructor(props){
    super(props);
    this.state = {
      greeting: ''
    }
  }

  componentDidMount(){
  }

  render(){
    return (
        <div class="wrapper">
            <header class="main-header">
                {/* <!-- Logo --> */}
                <a href="#" class="logo">
                    {/* <!-- mini logo for sidebar mini 50x50 pixels --> */}
                    <span class="logo-mini"><b>S</b>C</span>
                    {/* <!-- logo for regular state and mobile devices --> */}
                    <span class="logo-lg"><b>SEAASE</b> Club</span>
                </a>
                {/* <!-- Sidebar toggle button--> */}
                <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
                </a>
                <div class="navbar-custom-menu">
                    <ul class="nav navbar-nav">
                        {/* <!-- Messages: style can be found in dropdown.less--> */}
                        <li class="dropdown messages-menu">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
                            <i class="fa fa-envelope-o"></i>
                            <span class="label label-success">4</span>
                        </a>
                        </li>
                    </ul>
                </div>
            </header>
        </div>
    );
  }
}

export default Subject;
