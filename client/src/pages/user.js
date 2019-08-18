import { withStyles } from '@material-ui/core/styles';
import React, { Component } from 'react';
import { Route, Switch, BrowserRouter,Link } from 'react-router-dom';

import Header from '../components/header';
import AddSubject from '../components/subject/add';
import ListSubject from '../components/subject/list';
import User from '../components/user';
import Sidebar from '../components/sidebar';
import { styles } from './styles';
import { Cookies } from 'react-cookie';
const cookie = new Cookies();
//Component Child
class SubjectPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: true
    };
  }

  handleDrawer = () => {
    this.setState({ ...this.state, ...{ open: !this.state.open } }, function () {
    });
  };
  componentDidMount() {
  }
  handleSelected = (selected) => {
    this.sidebar.handleSelected(selected)
  }
  render() {
    const { classes, t, ...props } = this.props;
    const { open } = this.state;
    return (
      <div className={classes.root}>
        <Header open={open} handleDrawer={this.handleDrawer} {...props} />
        <Sidebar open={open} handleDrawer={this.handleDrawer} {...props} onRef={id => this.sidebar = id} />
        <main className={classes.content}>
          <div className={classes.appBarSpacer} />
          <User {...props} />
          {/* <Switch>
            <Route path="/" exact render={props => <Subject {...props} />} />
          </Switch> */}
        </main>
      </div>
    );

  }
}
export default withStyles(styles, { withTheme: true })(SubjectPage);
