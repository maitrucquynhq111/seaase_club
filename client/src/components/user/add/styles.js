export const styles = theme => ({
    root: {
      marginTop: theme.spacing.unit * 2,
      padding : theme.spacing.unit * 3,
      width : '100%',
      boxSizing: 'border-box'
    },
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      marginBottom : '8px',
    },
    title : {
      fontSize : '1.5rem',
    },
    textField: {
      marginRight: theme.spacing.unit,
      width: '100%',
    }, 
    label : {
      fontWeight :410
    },
    button: {
      float: 'right',
    },   
    image : {
      height: '25vw',
      width: '45vw',
      boxShadow :'0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12);',
      backgroundSize : 'cover',
      backgroundPosition : 'center',
      cursor: 'pointer',
      // marginTop: `${theme.spacing.unit*3}px`,
    },
    marginTop: {
      marginTop: theme.spacing.unit*3,
      // width: '100%'
    },
    customFormLabel: {
      display: 'block',
      transformOrigin: 'top left',
      transform: 'translate(0, 1.5px) scale(0.75)',
      color: 'rgba(0, 0, 0, 0.85)',
      fontWeight: '500'
    }, 
    inputType: {
      height: 'unset'
    }
  });