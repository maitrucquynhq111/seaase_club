import {
     Grid, 
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
/*----styles----*/
import { styles } from './styles';
class AddSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }
    componentDidMount(){
    } 
    render() {
        const { classes,t } = this.props;
        return (
            <Fragment> 
            <Grid container spacing={24} className={classes.wrapGrid}>
            </Grid>
        </Fragment >
        )
    };
}

export default (withStyles(styles, { withTheme: true })(AddSubject));
