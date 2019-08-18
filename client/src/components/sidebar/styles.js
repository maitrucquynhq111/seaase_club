import {colorPrimary} from '../../utils/setting'
const drawerWidth = 240;

export const styles = theme => ({
    root: {
        flexGrow: 1,
        height: '100%',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    nested: {
      paddingLeft: theme.spacing.unit * 4,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarSpacer: theme.mixins.toolbar,
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginLeft: 12,
        marginRight: 36,
    },
    hide: {
        display: 'none',
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9,
        },
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '0 8px',
        position: 'relative',
        ...theme.mixins.toolbar,
    },
    chevron: {
        position: 'absolute',
        right: 0,
    },
    toolbar: {
      paddingRight: 24, // keep right padding when drawer closed
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
    },
    item: {
        // color: colorPrimary,
        fontWeight: 500,
    },
    icon: {
        color: colorPrimary,
    },
    version: {
        color: '#ff513f',
        justifyContent: 'center',
        fontSize: '1rem',
        bottom: '0',
        display: 'flex',
        height: '2rem',
        width: '100%',
        position: 'absolute',
        fontWeight: 'bold',
        alignItems: 'center',
    }
});