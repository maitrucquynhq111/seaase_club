export const styles = theme => ({
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        // backgroundColor: fade('#9E9E9E', 0.15),
        '&:hover': {
            backgroundColor: 'rgba(255, 255, 255, 0.8)',
        },
        marginRight: theme.spacing.unit * 2,
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit * 3,
            width: 'auto',
        },
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        display: 'flex',
        // backgroundColor: '#eaeaea'
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    },
    frameTitle: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center'
    },
    iconWrap: {
        fontSize: 40,
        float : 'right',
        cursor : 'pointer',
        padding: '4px'
    },
    icon: {
        fontSize: 40,
        float : 'right',
        cursor : 'pointer'
      },
    //   modify
    iconRoot:{
        color:'#292f48'
    },
    titleCustomer:{
        fontSize:34,
        color: '#292f48',
        fontWeight: 'bold'
    },
    titleChart:{
         marginTop: '2.5rem',
         marginBottom: '1.5rem',
         fontWeight: 'bold',
         color: '#292f48',
         textAlign: 'center'
    }
})