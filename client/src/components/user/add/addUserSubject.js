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
import { styles } from './styles';
import { DOMAIN, _pick } from '../../../utils/setting'

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

    updateSubject(){
        const newSubject = this.state.newSubject;
        this.props.updateSubject(newSubject)
    }

    render(){
        const { classes, listSubject, listSemester } = this.props;
        const { openDialog, newSubject } = this.state
        
        return (
        <Dialog open={openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
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