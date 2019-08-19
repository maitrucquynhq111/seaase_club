import {
    AppBar,
    IconButton,
    Toolbar,
    Typography,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import classNames from 'classnames';
import React from 'react';
import { Link } from 'react-router-dom';
import { styles } from './styles';
import logo from '../../logo.png'
class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openMenu: false,
        }
    }

    handleToggle = event => {
        event.preventDefault();
        this.setState({ openMenu: !this.state.openMenu });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
        this.setState({ openMenu: false });
    };

    render() { 
        const { openMenu } = this.state;
        const { classes, t } = this.props;
        return (
            <AppBar
                color="secondary"
                position="absolute"
                className={classNames(classes.appBar)}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="inherit"
                        aria-label="Open drawer"
                        onClick={() => {
                            this.props.handleDrawer();
                        }}
                        className={classNames(classes.menuButton)}>
                        <MenuIcon />
                    </IconButton>
                    <Link to='/'>
                        <div className={classes.spaName}>
                            {/* <div className={classes.logo}>
                                <img src={logo}/>
                            </div> */}
                            <div className={classes.clubName}>
                                <Typography className={classes.clubName} variant="body1" color="inherit" noWrap>
                                    SEAASE 
                                </Typography>
                            </div>
                        </div>
                    </Link>
                    <div className={classes.right}>
                        <div className={classes.fullName}>
                            <Typography variant="body1" color="inherit" noWrap >
                                {/* {fullName} */}
                            </Typography>
                        </div>
                        <IconButton
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}
                            aria-owns={openMenu ? 'menu-appbar' : null}
                            aria-haspopup="true"
                            onClick={this.handleToggle}
                            color="inherit">
                        </IconButton>
                    </div>
                </Toolbar>
            </AppBar>
        );
    }
}
export default withStyles(styles, { withTheme: true })(Header);