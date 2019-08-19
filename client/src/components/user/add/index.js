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
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import axios from 'axios';
import UserSubject from './userSubject';
/*----styles----*/
import { styles } from './styles';
import { DOMAIN } from '../../../utils/setting'
import { func } from 'prop-types';
class AddSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            listSubject: [],
            listUserSubject: [],
            openDialog: false,
            newSubject: {},
        }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.updateSubject = this.updateSubject.bind(this)
    }

    componentWillMount(){
        const _this = this;        
        axios({
            method: 'get',
            url: DOMAIN + '/api/subjects/list',
        })
        .then(result => {
          if(result.status == 200){
              _this.setState({
                    listSubject: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    } 

    handleClickOpen = () => {
        this.setState({openDialog:true, newSubject: {}})
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let data = this.state.data; 
        data[name] = value; 
        this.setState({data})
    } 

    handleChangeAddSubject = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let newSubject = this.state.newSubject; 
        newSubject[name] = value; 
        this.setState({newSubject})
    }

    updateSubject(){
        console.log(this.state.newSubject);
        let listUserSubject = this.state.listUserSubject;
        const newSubject = this.state.newSubject
        listUserSubject.push(newSubject)
        this.setState({listUserSubject}, function(){
            this.handleClose()
        })
    }
    handleSubmit(){
        let { data, listUserSubject } = this.state;
        data.listUserSubject = listUserSubject;
        const _this = this;
        axios({
            method: 'post',
            url: DOMAIN + '/api/users/create',
            data: data
        })
        .then(result => {
        //   console.log(result);
          if(result.status == 200){
            alert("Success")
            _this.props.addNew()
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
    }
    render() {
        const { classes } = this.props;
        const { openDialog, listSubject, newSubject, listUserSubject } = this.state
        console.log(listUserSubject);
        
        return (
            <Paper className={classes.root}>
                <Dialog open={openDialog} onClose={this.handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Add New Subject</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={24}>
                            <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
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
                            <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
                                <TextField 
                                    label="Semester"
                                    name="semester"
                                    margin="dense"
                                    required
                                    value={newSubject.semester}
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
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Student Code"
                                name="code"
                                margin="dense"
                                required
                                value={this.state.data.code}
                                onChange={this.handleChange}
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
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Name"
                                name="name"
                                margin="dense"
                                required
                                value={this.state.data.name}
                                onChange={this.handleChange}
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
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Class"
                                name="class"
                                margin="dense"
                                required
                                value={this.state.data.class}
                                onChange={this.handleChange}
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
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Email"
                                name="email"
                                margin="dense"
                                required
                                value={this.state.data.email}
                                onChange={this.handleChange}
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
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Facebook"
                                name="fbLink"
                                margin="dense"
                                required
                                value={this.state.data.fbLink}
                                onChange={this.handleChange}
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
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Birthday"
                                name="birthday"
                                margin="dense"
                                required
                                value={this.state.data.birthday}
                                onChange={this.handleChange}
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
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={12} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <b className={classes.labelSubject}>Subject</b>
                        </Grid>
                        <Grid item xs={12} sm={12} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <UserSubject
                                listUserSubject={listUserSubject}
                                listSubject={listSubject}
                            />
                        </Grid>
                        <Grid item xs={12} sm={12} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <p className={classes.textAddSubject} onClick={this.handleClickOpen}>Add new subject</p>
                        </Grid>
                    </Grid>
                    <Grid container justify='flex-end' className={classes.marginTop}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={this.handleSubmit} 
                            // onClick={() => console.log('ADD')} 
                            className={classes.button}
                        >
                            Save
                        </Button>
                    </Grid>
                </form>           
            </Paper>
        )
    };
}

export default (withStyles(styles, { withTheme: true })(AddSubject));
