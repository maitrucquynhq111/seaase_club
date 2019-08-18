import { lighten } from '@material-ui/core/styles/colorManipulator';
import { emphasize } from '@material-ui/core/styles/colorManipulator';
import { fade } from '@material-ui/core/styles/colorManipulator';

export const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      padding: theme.spacing.unit*2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom : '8px',
  },
  table: {
    minWidth: 1020,
  },
  tableWrapper: {
      overflowX: 'auto',
      position: 'relative'
  },
  editComponent: {
    display: 'none'
  },
  editButton: {
    cursor: 'pointer'
  },
  saveButton: {
    cursor: 'pointer',
    fontSize: '0.8125rem',
    margin: '0pc 6px',
  },
  iconEdit : {
    width: '16px',
    height: '16px',
    cursor: 'pointer',
  },
  imgText:{    
    cursor: 'pointer',
    fontSize: '0.6125rem',
    color: '#3f51b5',
  },
  textField: {
    width: '100%',
  },
  customRoot: {
    width: '100%',
  },
  infoBranch: {
    padding: '10px',
  },
  detailBranch: {
    marginLeft: '8px',
  },
  selectedMenu: {
    '&:focus': {
      backgroundColor: 'transparent',
    }
  },
  // new modify
  tableRowHeight:{
    height:0
  }
});

export const tableHeadStyles = theme => ({
  head : {
    
    fontSize : '14px',
    fontWeight : '450',
    paddingRight : 26,
  },
  headFirst : {
    padding: '0px 12px',
    
    fontSize : '14px',
    fontWeight : '460',
  }
});

export const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.secondary,
  },
  title: {
    flex: '0 0 auto',
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade('#9E9E9E', 0.15),
    '&:hover': {
      backgroundColor: fade('#9E9E9E', 0.25),
    },
    marginRight: theme.spacing.unit * 2,
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing.unit * 3,
      width: 'auto',
    },
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
});
