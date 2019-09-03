import { Grid, InputBase, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';
import axios from 'axios';
import {stringify} from 'query-string';
import { DOMAIN, _pick } from '../../utils/setting'
import { styles } from './styles';
import List from './list'

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        listSemesters: [],
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
  handleSearch(event) {
      const _this = this
      if(event.target.value === ""){
        let data = {
            skip: this.listSemester.state.page*this.listSemester.state.limit,
            limit: this.listSemester.state.limit,
        }
        let url = `${DOMAIN}/api/semesters/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        axios({
            method: 'get',
            url: url,
        })
        .then(result => {
            console.log(result);
            
          if(result.status == 200){
            _this.setState({
                    listSemesters: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }
    else{
        let data = {
            skip: this.listSemester.state.page*this.listSemester.state.limit,
            limit: this.listSemester.state.limit,
            search: event.target.value
        }
        let url = `${DOMAIN}/api/semesters/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        axios({
            method: 'get',
            url: url,
        })
        .then(result => {
          if(result.status == 200){
            _this.setState({
                    listSemesters: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }
  }
  render() { 
    const { classes } = this.props;
    const { listSemesters, total } = this.state;
    return (
        <Fragment>
            <div className={classes.frameTitle}>
                <Typography variant="h4">
                    List
                </Typography>
                <div className={classes.frameTitle}>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search By Name Or Code"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            onChange={this.handleSearch}
                        />
                    </div>
                    <div>
                        <IconButton className={classes.iconWrap} onClick={this.addNew} aria-label="Add">
                            <Icon className={classes.icon} color="disabled" >
                                add_circle
                            </Icon>
                        </IconButton>
                    </div>
                </div>
            </div>
            <Grid container spacing={24}>
                <List 
                    listSemesters={listSemesters}
                    total={total}
                    onRef = {id => this.listSemester = id}
                />
            </Grid>
        </Fragment>
    )
  }
}

export default (withStyles(styles, { withTheme: true })(Subject));