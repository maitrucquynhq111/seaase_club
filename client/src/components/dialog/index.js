import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';

import { styles } from './styles';

function Transition(props) {
    return <Slide direction="down" {...props} />;
}

class DialogComponent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialogs: this.props.openDialogs || false
        }
    }

    componentWillMount() {
        this.props.onRef(null);
    }

    componentDidMount() {
        this.props.onRef(this)
    }
    handleDialogOpen = () => { 
        this.setState({openDialogs: true});
    }
    handleDialogClose = () => {
        // this.setState({ ...this.state, ...{ openDialogs: false } });
        this.setState({openDialogs: false});
    }

    render() { 
        const { classes, handleActionDialogClose } = this.props; 
        return (
            <div  className = {classes.wrapDialog}>
                <Dialog
                    fullWidth={true}
                    maxWidth = {'xs'}
                    open={this.state.openDialogs}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleDialogClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description">
                   
                    {this.props.title ?
                        <DialogTitle id="alert-dialog-slide-title">
                            {this.props.title}
                        </DialogTitle>
                        : ""}  
                    {this.props.content ?
                        <DialogContent>
                            <DialogContentText id="alert-dialog-slide-description">
                                {this.props.content}
                            </DialogContentText>
                        </DialogContent>
                        : ""}

                    <DialogActions>
                        {this.props.disagree ? <Button onClick={handleActionDialogClose ? handleActionDialogClose: this.handleDialogClose} color="primary">{this.props.disagree}</Button> : "" }
                        {this.props.agree ? <Button onClick={this.props.action} color="primary">{this.props.agree}</Button> : "" }
                    </DialogActions>
                </Dialog>
            </div>
        );
    }
}

export default (withStyles(styles, { withTheme: true })(DialogComponent));