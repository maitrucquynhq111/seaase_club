import { Grid, InputBase, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';
import axios from 'axios';
import {stringify} from 'query-string';
import { DOMAIN, _pick } from '../../utils/setting'

import AddUser from './add';
import ListUser from './list';
import { styles } from './styles';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listUser: [],
        total: 0,
        isAdd: false
    }
    this.addNew = this.addNew.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }
  componentWillMount(){
  }
  addNew() {
      this.setState({ isAdd: !this.state.isAdd})
  }
  async handleSearch(event) {
      const _this = this
      if(event.target.value === ""){
        let data = {
            skip: this.listUser.state.page*this.listUser.state.limit,
            limit: this.listUser.state.limit,
        }
        let url = `${DOMAIN}/api/users/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        axios({
            method: 'get',
            url: url,
        })
        .then(result => {
          if(result.status == 200){
            _this.setState({
                    listUser: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }
    else{
        this.listUser.loading.startLoading()
        let data = {
            skip: this.listUser.state.page*this.listUser.state.limit,
            limit: this.listUser.state.limit,
            search: event.target.value
        }
        let url = `${DOMAIN}/api/users/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        await axios({
            method: 'get',
            url: url,
        })
        .then(result => {
          if(result.status == 200){
            _this.setState({
                    listUser: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
        this.listUser.loading.stopLoading()
    }
  }
  render() { 
    const { classes, t } = this.props;
    const { listUser, total } = this.state;
    
    return (
        <Fragment>
            <div className={classes.frameTitle}>
                {!this.state.isAdd ?
                    (
                        <Typography variant="h4">
                            List
                        </Typography>
                    )
                    :
                    <Typography variant="h4">
                        Add New Student
                    </Typography>}
                <div className={classes.frameTitle}>
                    {!this.state.isAdd &&
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search By Name Or ID"
                                classes={{
                                    root: classes.inputRoot,
                                    input: classes.inputInput,
                                }}
                                onChange={this.handleSearch}
                            />
                        </div>
                    }
                    <div>
                        <IconButton className={classes.iconWrap} onClick={this.addNew} aria-label="Add">
                            {!this.state.isAdd ?
                                <Icon className={classes.icon} color="disabled" >
                                    add_circle
                        </Icon>
                                : <Icon className={classes.icon} color="disabled" >
                                    cancel_circle
                        </Icon>
                            }
                        </IconButton>
                    </div>
                </div>
            </div>
            <Grid container spacing={24}>
                {!this.state.isAdd ?
                    <ListUser
                        listUser={listUser}
                        total={total}
                        onRef = {id => this.listUser = id}
                    />
                    : 
                    <AddUser addNew={this.addNew}/>
                }
            </Grid>
        </Fragment>
    )
  }
}

export default (withStyles(styles, { withTheme: true })(User));