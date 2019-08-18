import { Grid, InputBase, Typography } from '@material-ui/core';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import React, { Fragment } from 'react';

import AddSubject from './add';
import { styles } from './styles';

class Subject extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isAdd: true
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
                    <MuiThemeProvider theme={theme}>
                        <Typography variant="h4" className={classes.titleCustomer}>
                            Danh sách
                        </Typography>
                    </MuiThemeProvider>
                )
                :
                <Typography variant="h4" className={classes.titleCustomer}>
                    Thêm mới
                </Typography>}
            <div className={classes.frameTitle}>
                <div>
                    <IconButton className={classes.iconWrap} classes={{root:classes.iconRoot}} onClick={this.addNew} aria-label="Add">
                        {!this.state.isAdd ?
                            <Icon className={classes.icon}  >
                                add_circle
                    </Icon>
                            : <Icon className={classes.icon}  >
                                cancel_circle
                    </Icon>
                        }
                    </IconButton>
                </div>
            </div>
        </div>
        <AddSubject/>
        {/* {!this.state.isAddCustomer ?
            <ListCustomer 
                onRef = {id => this.listCustomer = id}
                listCustomer={this.props.customerState.listCustomer} 
                listBrands={this.props.serviceBranchState.listBrands} 
            />
            : <AddCustomer statusCreate={this.statusCreate} />
        } */}
        </Fragment>
    )
  }
}

export default (withStyles(styles, { withTheme: true })(Subject));