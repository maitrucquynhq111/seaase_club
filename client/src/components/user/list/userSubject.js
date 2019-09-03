import {
    IconButton,
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
    ListItemAvatar,
} from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import React from 'react';
import {stringify} from 'query-string';

// Component
import { styles } from './styles';
import { DOMAIN, _pick } from '../../../utils/setting'
import AddUserSubject from './addUserSubject'
import ListNewSubject from './listNewSubject';
import DialogForm from '../../dialog';
import Loading from '../../loading'

class UserSubject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listNewSubject: [],
            listSubject: [],
            listUserSubject: this.props.listUserSubject,
            openDialog: false
        };
        this.updateSubject = this.updateSubject.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.getList = this.getList.bind(this)
    }

    componentWillMount(){
        this.props.onRef(null)
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.listUserSubject != this.props.listUserSubject){
            this.setState({listUserSubject: nextProps.listUserSubject})
        }
    }

    async componentDidMount() {
        this.props.onRef(this)
    }
    
    handleOpenDialog = (id) => {      
        this.setState({idUserDelete: id}, function(){
        this.mDialog.handleDialogOpen()
      })
    }

    handleClickOpen = () => {
        this.addSubject.handleClickOpen()
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    handleOpen = () => {
        this.setState({openDialog:true, listNewSubject: []})
    }

    updateSubject(newSubject){
        let listNewSubject = this.state.listNewSubject;
        listNewSubject.push(newSubject)
        this.setState({listNewSubject}, function(){
            this.addSubject.handleClose()
        })
    }

    handleDelete(){
        const { data, idUserDelete } = this.state;
        const _this = this;
             
        axios({
            method: 'delete',
            url: `${DOMAIN}/api/userSubjects/${idUserDelete}`,
            data: data
        })
        .then(result => {
          if(result.status == 200){
              _this.getList()
              _this.mDialog.handleDialogClose()
            alert("Success")
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
    }

    getList(){
        const { idUser } = this.props;   
        const _this = this;
        axios({
            method: 'get',
            url: `${DOMAIN}/api/userSubjects/getByUser/${idUser}`,
        })
        .then(result => {
          if(result.status == 200){              
              _this.setState({ listUserSubject: result.data.data})
          }
        })
        .catch(err => console.log(err))
    }

    groupBySemester = (semester) => {
        const { listUserSubject } = this.state;        
        return listUserSubject.filter(item => item.semester == semester)
    }

    renderUserSubject = (list) => {
        const { listSubject} = this.props;
        return list.map((item, index) => {
            let subject = listSubject.find(subject => subject._id = item.subjectId)
            return(
                <Grid item xs={12} sm={4} style={{alignItems: 'flex-end',display: 'flex'}}>
                    <ListItem alignItems="flex-start">
                        <ListItemText
                            // primary={subject.name}
                            secondary={[
                                <React.Fragment>
                                    <p><b>{subject.name} </b> - {subject.code}</p>
                                    <IconButton onClick={() => this.handleOpenDialog(item._id)} > 
                                        <DeleteIcon/>
                                    </IconButton>
                                </React.Fragment>
                        ]}
                        />
                    </ListItem>
                </Grid>
            )
        })
    }

    render() { 
        const { classes, listSubject, listSemester, idUser } = this.props;   
        const { listNewSubject, openDialog } = this.state;
        
        return (
            <Dialog 
                open={openDialog} 
                onClose={this.handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{
                    paperWidthSm: classes.paperWidthSm,
                }}
            >
                <DialogForm
                    onRef={dialog => (this.mDialog = dialog)} 
                    disagree="Cancel"
                    agree="Delete"
                    title ="Notice"
                    content="Do you want to delete this user from list?"
                    action={this.handleDelete} 
                />
                <AddUserSubject 
                    onRef = {id => this.addSubject = id}
                    updateSubject={this.updateSubject}
                    listSubject={listSubject}
                    listSemester={listSemester}
                    idUser={idUser}
                />
                <DialogTitle id="form-dialog-title">List Subject</DialogTitle>
                <DialogContent>
                    <List className={classes.rootList}>
                        {listSemester.map((item, index) => {
                            let listSubject = this.groupBySemester(item.name)
                            if(listSubject.length > 0){
                                return(
                                    <React.Fragment key={index}>
                                        <ListItem alignItems="flex-start">
                                            <ListItemText
                                                primary={item.isCurrent?<b>{item.name} - <span className={classes.textCurrentSemester}>Current Semester</span></b>:<b>{item.name}</b>}
                                            />
                                        </ListItem>
                                        <Grid container spacing={24}>
                                            {this.renderUserSubject(listSubject)}
                                        </Grid>
                                        <Divider component="li" />
                                    </React.Fragment>
                                )
                            }
                        })}
                    </List>
                    <ListNewSubject
                        listUserSubject={listNewSubject}
                        listSubject={listSubject}
                        listSemester={listSemester}
                    />
                    <Grid item xs={12} sm={12} style={{alignItems: 'flex-end',display: 'flex'}}>
                        <p className={classes.textAddSubject} onClick={this.handleClickOpen}>Add new subject</p>
                    </Grid>
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
export default (withStyles(styles, { withTheme: true })(UserSubject));