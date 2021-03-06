import {
     Grid,
     Paper,
     TextField,
     Button,
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
        console.log(data);
        
        axios({
            method: 'post',
            url: DOMAIN + '/api/subjects/create',
            data: data
        })
        .then(result => {
        //   console.log(result);
          if(result.status == 200){
            alert("Tạo thành công")
            _this.props.addNew()
          }
          else{
              alert("Xảy ra lỗi")
          }
        //   this.setState({greeting: result.data.sayHi})
        })
        .catch(err => console.log(err))
    }
    render() {
        const { classes } = this.props;
        return (
            <Paper className={classes.root}>
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>                   
                        <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField
                                label="Subject Code"
                                name="code"
                                margin="dense"
                                // required
                                value={this.state.data.code}
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
                        <Grid item xs={12} sm={6}>
                            <TextField 
                                label="Subject Name"
                                name="name"
                                margin="dense"
                                // required
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
