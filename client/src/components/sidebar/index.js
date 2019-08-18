import '../../css/sidebar.css';
import { 
    Divider, 
    Drawer, 
    List, 
    ListItem, 
    ListItemIcon, 
    ListItemText 
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import React from 'react';
import Typography from '@material-ui/core/Typography';
import DashboardIcon from '@material-ui/icons/Dashboard';
import { styles } from './styles'; 

class Sidebar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected : '',    
        }
    }
    componentDidMount() {
        this.props.onRef(this);
    }
    handleSelected = (selected) => {     
        this.Admin.handleSelect(selected)
    }
    render() { 
        const { classes, open, ...props} = this.props;
        const {selected} = this.state; 
        return (
            <Drawer
                variant="permanent"
                classes={{
                    paper: classNames(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                className={'sidebar'}
                open={open}>
                <div className={classes.toolbarIcon}></div>
                <Divider />
                <List disablePadding>
                    <Link to='/'>
                        <ListItem button>
                            <ListItemIcon className={classes.icon}>
                                <DashboardIcon />
                            </ListItemIcon>
                            <ListItemText>
                                <Typography variant="body1" className={classes.item}>
                                    Môn Học
                                </Typography>
                            </ListItemText>
                        </ListItem>
                    </Link>
                </List>
            </Drawer>
        );
    }
}

export default withStyles(styles, { withTheme: true })(Sidebar);