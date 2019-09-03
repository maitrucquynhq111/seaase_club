import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    Divider,
    ListItemText,
    Grid,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios'
import {stringify} from 'query-string';

// Component
import { styles } from './styles';
import ListHead from './tableHead';
import ListToolbar from './tableToolbar';
import FormEdit from './formEdit';
import DialogForm from '../../dialog';
import { DOMAIN, _pick } from '../../../utils/setting'
import Loading from '../../loading'

 
function desc(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getSorting(order, orderBy) {
  return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
} 
const types = [
    {
      value: 'percent',
      label: 'Percent',
    },
    {
      value: 'value',
      label: 'Value',
    },
];
class ListMemberCard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            openDialog: false
        };
    }

    componentWillMount(){
        this.props.onRef(null)
    }

    componentDidMount() {
        this.props.onRef(this)
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    handleOpen = () => {
        this.setState({openDialog:true})
    }

    groupBySemester = (semester) => {
        const { listUserSubject } = this.props;        
        return listUserSubject.filter(item => item.semester == semester)
    }

    renderUserSubject = (list) => {
        const { listUser} = this.props;
        return list.map((item, index) => {
            let user = listUser.find(subject => subject._id = item.subjectId)
            console.log(item);
            console.log(user);
            
            return(
                <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            secondary={[
                                <React.Fragment>
                                    <b style={{color: '#000'}}>{user.name} </b>
                                    <p><b>Major: </b>{user.class}</p>
                                    <p><b>Professor: </b>{item.professor}</p>
                                    {/* <IconButton onClick={() => this.handleOpenDialog(item._id)} > 
                                        <DeleteIcon/>
                                    </IconButton> */}
                                </React.Fragment>
                        ]}
                        />
                    </ListItem>
                </Grid>
            )
        })
    }

    render() { 
        const { classes, listSemester } = this.props;   
        const { openDialog } = this.state;
        
        return (
            <Dialog 
                open={openDialog} 
                onClose={this.handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{
                    paperWidthSm: classes.paperWidthSm,
                }}
            >
                <DialogTitle id="form-dialog-title">List Student</DialogTitle>
                <DialogContent>
                    <List className={classes.rootList}>
                        {listSemester.map((item, index) => {
                            let listUser = this.groupBySemester(item.name)
                            if(listUser.length > 0){
                                return(
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={item.isCurrent?<b>{item.name} - <span className={classes.textCurrentSemester}>Current Semester</span></b>:<b>{item.name}</b>}
                                            />
                                        </ListItem>
                                        <Grid container spacing={24}>
                                            {this.renderUserSubject(listUser)}
                                        </Grid>
                                        <Divider component="li" />
                                    </React.Fragment>
                                )
                            }
                        })}

                        {/* {listUserSubject.map((item, index) => {
                            let user = listUser.find(element => element._id == item.userId)
                            return(
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                        primary={user.name}
                                        secondary={[
                                            <React.Fragment>
                                                <p><b>Major: </b>{user.class}</p>
                                                <p><b>Email: </b>{user.email}</p>
                                                <p><b>Semester: </b>{item.semester}</p>
                                            </React.Fragment>
                                        ]}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>

                            )
                        })} */}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(ListMemberCard));