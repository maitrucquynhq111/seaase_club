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
import AddUserSubject from './addUserSubject'
/*----styles----*/
import { styles } from './styles';
import { DOMAIN } from '../../../utils/setting'
import Loading from '../../loading'
class AddSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {},
            listSubject: [],
            listUserSubject: [],
            listSemester: [],
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
            url: DOMAIN + '/api/subjects/list/all',
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
        axios({
            method: 'get',
            url: DOMAIN + '/api/semesters/list/all',
        })
        .then(result => {
          if(result.status == 200){
              _this.setState({
                    listSemester: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    } 

    handleClickOpen = () => {
        // this.setState({openDialog:true, newSubject: {}})
        this.addSubject.handleClickOpen()
    }

    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let data = this.state.data; 
        data[name] = value; 
        this.setState({data})
    }

    updateSubject(newSubject){
        let listUserSubject = this.state.listUserSubject;
        listUserSubject.push(newSubject)
        this.setState({listUserSubject}, function(){
            this.addSubject.handleClose()
        })
    }
    async handleSubmit(){
        let { data, listUserSubject } = this.state;
        this.loading.startLoading()
        data.listUserSubject = listUserSubject;
        const _this = this;
        await axios({
            method: 'post',
            url: DOMAIN + '/api/users/create',
            data: data
        })
        .then(result => {
          if(result.status == 200){
            alert("Success")
            _this.props.addNew()
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
        this.loading.stopLoading()
    }
    render() {
        const { classes } = this.props;
        const { listSubject, listUserSubject, listSemester } = this.state
        
        return (
            <Paper className={classes.root}>
                <Loading onRef={id => (this.loading = id)}/> 
                <AddUserSubject 
                    onRef = {id => this.addSubject = id}
                    updateSubject={this.updateSubject}
                    listSubject={listSubject}
                    listSemester={listSemester}
                />
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Student ID"
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
                                label="Major"
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
                                listSemester={listSemester}
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
