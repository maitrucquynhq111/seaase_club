import {
     Grid,
     Paper,
     Button,
     TextField
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import React, { Fragment } from 'react';
import axios from 'axios';
/*----styles----*/
import { styles } from './styles';
import { DOMAIN } from '../../../utils/setting'
class AddSubject extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: {}
        }
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    componentDidMount(){
    } 

    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let data = this.state.data; 
        data[name] = value; 
        this.setState({data})
    }

    handleSubmit(){
        const { data } = this.state;        
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
        
        return (
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>
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
                        <Grid item xs={12} sm={4} >
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
                    </Grid>   
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField
                                label="Facebook"
                                name="fbLink"
                                margin="dense"
                                required
                                value={this.state.data.fbLink}
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
                        <Grid item xs={12} sm={6} >
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
