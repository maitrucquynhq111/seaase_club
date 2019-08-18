import { Grid, InputBase, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';
import axios from 'axios';
import {stringify} from 'query-string';
import { DOMAIN } from '../../utils/setting'

import AddSubject from './add';
import ListSubject from './list';
import { styles } from './styles';

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listSubject: [],
        total: 0,
        isAdd: false
    }
    this.addNew = this.addNew.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
  }

  componentWillMount(){
      axios({
          method: 'get',
          url: DOMAIN + '/api/subjects/list',
      })
      .then(result => {
        if(result.status == 200){
            this.setState({
                  listSubject: result.data.data.list,
                  total: result.data.data.sum,
              })
        }
      })
      .catch(err => console.log(err))
  }
  addNew() {
      this.setState({ isAdd: !this.state.isAdd})
  }
  handleSearch(event) {
      const _this = this
      if(event.target.value === ""){
        axios({
            method: 'get',
            url: DOMAIN + '/api/subjects/list',
        })
        .then(result => {
            console.log(result);
            
          if(result.status == 200){
            _this.setState({
                    listSubject: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }
    else{
        axios({
            method: 'get',
            url: `${DOMAIN}/api/subjects/list?${stringify({search: event.target.value})}`,
        })
        .then(result => {
          if(result.status == 200){
            console.log(result);
            _this.setState({
                    listSubject: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }
  }
  render() { 
    const { classes } = this.props;
    const { listSubject, total } = this.state;
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
                        Add New Subject
                    </Typography>}
                <div className={classes.frameTitle}>
                    {!this.state.isAddMemberCard &&
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search By Name"
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
                    <ListSubject
                        listSubject={listSubject}
                        total={total}
                        onRef = {id => this.listCustomer = id}
                    />
                    : 
                    <AddSubject addNew={this.addNew}/>
                }
            </Grid>
        </Fragment>
    )
  }
}

export default (withStyles(styles, { withTheme: true })(Subject));