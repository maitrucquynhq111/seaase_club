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
import Loading from '../../loading'

class FormEdit extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.user
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

    async handleSubmitEdit(id){
        this.loading.startLoading()
        const { data } = this.state;
        const _this = this;        
        await axios({
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
        this.loading.stopLoading()
    }
    render() { 
        const { classes } = this.props;
        const { data } = this.state
        return (
            <Paper className={classes.paper}>
                <Loading onRef={id => (this.loading = id)}/> 
                <form className={classes.container} noValidate autoComplete="off">    
                    <Grid container spacing={24}>
                        <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                            <TextField 
                                label="Student Code"
                                name="code"
                                margin="dense"
                                required
                                value={data.code}
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
                                value={data.name}
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
                                value={data.class}
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
                                value={data.email}
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
                                value={data.fbLink}
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
                                value={data.birthday}
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
                            onClick={() => this.handleSubmitEdit(data._id)} 
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