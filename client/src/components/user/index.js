import { Grid, InputBase, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';

import AddUser from './add';
import ListUser from './list';
import { styles } from './styles';

class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAdd: false
    }
    this.addNew = this.addNew.bind(this)
  }
  addNew() {
      this.setState({ isAdd: !this.state.isAdd})
  }
  render() { 
    const { classes, t } = this.props;
    return (
        <Fragment>
            <div className={classes.frameTitle}>
                {!this.state.isAdd ?
                    (
                        <Typography variant="h4">
                            Danh Sách Sinh Viên
                        </Typography>
                    )
                    :
                    <Typography variant="h4">
                        Thêm Sinh Viên
                    </Typography>}
                <div className={classes.frameTitle}>
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
                        onRef = {id => this.listCustomer = id}
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