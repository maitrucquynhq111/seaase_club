import {
    Grid,
    Collapse,
    Button,
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
import axios from 'axios'
import { styles } from './styles';
import { DOMAIN } from '../../../utils/setting';

class ListMemberCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
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
            url: `${DOMAIN}/api/subjects/update/${id}`,
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
        const { classes, subject } = this.props;
        
        return (
            <Paper className={classes.paper}>
                <Grid container spacing={24}>                   
                    <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
                        <TextField
                            label="Subject Code"
                            name="code"
                            margin="dense"
                            // required
                            value={!!this.state.data.code?this.state.data.code:subject.code}
                            onChange={this.handleChange}
                            className={classes.textField}  
                            InputLabelProps={{
                                shrink: true,
                                classes: {
                                root: classes.inputType
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
                            value={!!this.state.data.name? this.state.data.name:subject.name}
                            onChange={this.handleChange}
                            className={classes.textField}
                            InputProps={{
                                shrink: true,
                                classes: { 
                                    inputType: classes.inputType
                                },
                            }}
                        />
                    </Grid>
                </Grid>   
                <Grid container justify='flex-end' className={classes.marginTop}>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => this.handleSubmitEdit(subject._id)} 
                        // onClick={() => console.log('ADD')} 
                        className={classes.button}
                    >
                        Update
                    </Button>
                </Grid>
            </Paper>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(ListMemberCard));