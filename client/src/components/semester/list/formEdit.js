import {
    Grid,
    Checkbox,
    Button,
    Paper,
    TextField,
    FormControlLabel
} from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios'
import { styles } from './styles';
import { DOMAIN } from '../../../utils/setting';
import Loading from '../../loading'

class ListMemberCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.semester,
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
        if(e.target.type === 'checkbox'){
            // value = (e.target.checked) ? 1:0;
            value = e.target.checked;
        }
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
            url: `${DOMAIN}/api/semesters/${id}`,
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
        const { classes, subject } = this.props;
        const { data } = this.state
        
        return (
            <Paper className={classes.paper}>
                <Loading onRef={id => (this.loading = id)}/> 
                <Grid container spacing={24}>   
                    <Grid item xs={12} sm={6}>
                        <TextField 
                            label="Name"
                            name="name"
                            margin="dense"
                            // required
                            value={data.name}
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
                    <Grid item xs={12} sm={6}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    name = "isCurrent"
                                    checked={data.isCurrent}
                                    value={data.isCurrent}
                                    onChange={this.handleChange}
                                />
                            }
                            className={classes.label}
                            label='Is Current Semester'
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
            </Paper>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(ListMemberCard));