
export const styles = theme => ({
    title: {
        // color: #000000;
        padding: 0,
        fontSize: '1.5rem',
        textAlign: 'center',
        marginTop: '1.5rem',
        fontWeight: '500',
        lineHeight: 'normal',
    },
    content: {
        fontSize: '1rem',
        fontWeight: '500', 
    }, 
    contentExpire: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#909090'
    }, 
    numberExpire: {
        fontSize: '1rem',
        fontWeight: '500',
        color: '#292f48'
    }, 
    footerActiveCode: {
        justifyContent: 'space-between',
        display: 'flex',
    },
    footerEnterPhone: {
        justifyContent: 'flex-end', 
        display: 'flex',
    },
    // footerActiveCode: {
    //     justifyContent: 'space-between',
    //     display: 'flex',
    // },
    DialogContent: {
        padding: '2.2rem 2.6rem 1.5rem',

    },
    // root: {
    //     marginTop: theme.spacing.unit * 2,
    //     padding : theme.spacing.unit * 3,
    //     width : '100%',
    //   },
    // wrapGrid: {
    //     width: '100%',
    //     margin: '0px',
    // },
    SelectInput : {
        width: '100%'
    },
    boxCountryCode: {
        // padding: '12px 12px 0px 12px !important',
        display: 'flex',
        alignItems: 'flex-end',
        whiteSpace: 'nowrap'
    },
    inputPhoneNumber:{
        border: '1px solid #d2d2d2',
        width: '98%',
        padding: '10px',
        '&:after': {
            borderBottomColor: '#fff',
          },
        '&:hover&:after ': {
            borderBottomColor: '#fff',
            },
    },
    // btnSent:{
    //     justifyContent: 'flex-end',
    //     display: 'flex',
    // }
    message: {
        overflowWrap: 'break-word'
    },
    boxMess: {
        color: 'black',
    },
    titleMess: {
        marginBottom: 16
    }
})