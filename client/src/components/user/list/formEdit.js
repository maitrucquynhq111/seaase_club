import {
    Grid,
    Button,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TextField,
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import { styles } from './styles';
import axios from 'axios';
import { DOMAIN } from '../../../utils/setting'

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
    }

    componentWillMount(){
    }

    componentDidMount() {
    }

    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let data = this.state.data; 
        data[name] = value; 
        this.setState({data})
    }

    handleSubmitEdit(id){
        const { data } = this.state;
        const _this = this;        
        axios({
            method: 'put',
            url: `${DOMAIN}/api/users/${id}`,
            data: data
        })
        .then(result => {
          if(result.status == 200){
              _this.props.getList()
            alert("Success")
            _this.props.handleEditComponent(-1)
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
    }
    render() { 
        const { classes, user } = this.props;
        
        return (
            <Paper className={classes.paper}>
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Student Code"
                                name="code"
                                margin="dense"
                                required
                                value={!!this.state.data.code?this.state.data.code:user.code}
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
                                value={!!this.state.data.name?this.state.data.name:user.name}
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
                                value={!!this.state.data.class?this.state.data.class:user.class}
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
                                value={!!this.state.data.email?this.state.data.email:user.email}
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
                                value={!!this.state.data.fbLink?this.state.data.fbLink:user.fbLink}
                                onChange={this.handleChange}
                                className={classes.textField}  
                                InputLabelProps={{
                                    shrink: true,
                                    classes: {
                                    root: classes.rootInputLabel
                                    }
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Birthday"
                                name="birthday"
                                margin="dense"
                                required
                                value={!!this.state.data.birthday?this.state.data.birthday:user.birthday}
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
                    <Grid container justify='flex-end' className={classes.marginTop}>
                        <Button 
                            variant="contained" 
                            color="primary"
                            onClick={() => this.handleSubmitEdit(user._id)} 
                            className={classes.button}
                        >
                            Update
                        </Button>
                    </Grid>
                </form>
            </Paper>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(FormEdit));