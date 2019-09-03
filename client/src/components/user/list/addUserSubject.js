import React from 'react';
import {
    Grid,
    Paper,
    Button,
    TextField,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    FormControl,
    Select,
    MenuItem,
    InputLabel,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Autosuggest from 'react-autosuggest';
import $ from 'jquery';
import axios from 'axios';
import {stringify} from 'query-string';
/*----styles----*/
// import { styles } from './styles';
import { DOMAIN, _pick } from '../../../utils/setting'
import Loading from '../../loading'
const styles = theme => ({
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
    labelSubject: {
      fontSize: '1rem',
      fontWeight :'bold',
      marginTop: '16px',
      marginBottom: '16px'
    },
    textAddSubject: {
      fontSize: '1rem',
      color: '#1976d2',
      marginTop: '16px',
      marginBottom: '16px',
      cursor: 'pointer',
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
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
class AddUserSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            listTeachers: [],
            openDialog: false,
            newSubject: {},
            value: ''
        }
        this.updateSubject = this.updateSubject.bind(this)
    }

    componentWillMount(){
        this.props.onRef(null)
    }

    componentDidMount(){
        this.props.onRef(this)
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    handleClickOpen = () => {
        this.setState({openDialog:true, newSubject: {}})
    }

    handleChangeAddSubject = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let newSubject = this.state.newSubject; 
        newSubject[name] = value; 
        this.setState({newSubject})
    }

    async updateSubject(){
        const newSubject = Object.assign(this.state.newSubject, {userId: this.props.idUser});
        console.log(newSubject);
        
        this.loading.startLoading()
        const _this = this;
        await axios({
            method: 'post',
            url: DOMAIN + '/api/userSubjects/create',
            data: newSubject
        })
        .then(result => {
          if(result.status == 200){
            alert("Success")
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
        this.loading.stopLoading()
        this.props.updateSubject(newSubject)
    }

    render(){
        const { classes, listSubject, listSemester } = this.props;
        const { openDialog, newSubject } = this.state
        
        return (
        <Dialog open={openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
            <Loading onRef={id => (this.loading = id)}/> 
            <DialogTitle id="form-dialog-title">Add New Subject</DialogTitle>
            <DialogContent>
                <Grid container spacing={24}>
                    <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Subject</InputLabel>
                            <Select
                                value={newSubject.subjectId}
                                onChange={this.handleChangeAddSubject}
                                inputProps={{
                                    name: 'subjectId',
                                    id: 'age-simple',
                                }}
                            >
                            {listSubject.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="age-simple">Semester</InputLabel>
                            <Select
                                value={newSubject.semester}
                                onChange={this.handleChangeAddSubject}
                                inputProps={{
                                    name: 'semester',
                                    id: 'age-simple',
                                }}
                            >
                            {listSemester.map((item, index) =>
                                <MenuItem key={index} value={item._id}>{item.name}</MenuItem>
                            )}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                        <TextField 
                            label="Professor"
                            name="professor"
                            margin="dense"
                            required
                            value={newSubject.professor}
                            ref={input=> this.textInput=input}
                            onChange={this.handleChangeAddSubject}
                            className={classes.textField}
                            InputProps={{
                                shrink: true,
                                classes: {
                                    inputType: classes.inputType
                                },
                            }}
                            InputLabelProps={{
                                className:classes.label
                            }}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={this.updateSubject} color="primary">
                    Add
                </Button>
            </DialogActions>
        </Dialog>
        );
    }
}
export default (withStyles(styles,{withTheme: true})(AddUserSubject));