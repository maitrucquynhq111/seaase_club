import {
    Grid,
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    TextField,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    List,
    ListItem,
    Divider,
    ListItemText
} from '@material-ui/core';
import axios from 'axios';
import { withStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import React from 'react';
import {stringify} from 'query-string';

// Component
import { styles } from './styles';
import ListMemberCardHead from './tableHead';
import ListMemberCardToolbar from './tableToolbar';
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
class ListUsers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            idUser: '',
            selected: [],
            index: 0,
            listUser: [],
            listSubject: [],
            listUserSubject: [],
            collapse: [],
            limit: 5,
            total: 0,
            page: 0,
            openDialog: false
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getList = this.getList.bind(this);
    }

    componentWillMount(){
        this.props.onRef(null)
    }

    componentWillReceiveProps(nextProps){
        if(this.props.listUser != nextProps.listUser){
            this.setState({listUser: nextProps.listUser, total: nextProps.total})
        }
    }

    async componentDidMount() {
        this.props.onRef(this)
        this.loading.startLoading()
        await this.getList()
        await axios({
            method: 'get',
            url: DOMAIN + '/api/subjects/list',
        })
        .then(result => {
          if(result.status == 200){
              this.setState({
                    listSubject: result.data.data.list,
                })
          }
        })
        .catch(err => console.log(err))
        this.loading.stopLoading()
    }

    handleClickOpen = () => {
        this.setState({openDialog:true, newSubject: {}})
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        this.setState({ selected: newSelected }, function() {
        });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: this.props.listMemberCard.map(n => n._id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleChangePage = async (event, page) => {
        const _this = this;
        this.setState({ page: page, selected: []  },async function() {
            _this.loading.startLoading()
            await _this.getList()
            _this.loading.stopLoading()
        });
    };

    handleChangeRowsPerPage = async event => {
        const _this = this;
        this.setState({ limit: event.target.value, page: 0 , selected: [] },async function() {
            _this.loading.startLoading()
            await _this.getList()
            _this.loading.stopLoading()
        });
    };
    
    handleOpenDialog = (id) => {      
        this.setState({idUser: id}, function(){
        this.mDialog.handleDialogOpen()
      })
    }

    handleOpenListSubject = (id) => {
        const _this = this;        
        axios({
            method: 'get',
            url: `${DOMAIN}/api/userSubjects/getByUser/${id}`,
        })
        .then(result => {
          if(result.status == 200){              
              _this.setState({
                    listUserSubject: result.data.data,
                    openDialog: true
                })
          }
        })
        .catch(err => console.log(err))
    }

    handleEditComponent = (id) => {
        const listUser = this.state.listUser;
        const collapse = this.state.collapse;
        for(var i = 0;i <= listUser.length; i++)
        {
            if(i === id) {
              collapse[i] = !collapse[i];
            }
            else {
                collapse[i] = false
            }
        }
        this.setState(collapse);
    }

    isSelected = id => {
        return this.state.selected.indexOf(id) !== -1
    };

    getList(){
        const _this = this;
        const { limit, page } = this.state
        let data = {
            skip: page*limit,
            limit: limit,
        }
        let url = `${DOMAIN}/api/users/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        console.log(url);
        
        axios({
            method: 'get',
            // url: DOMAIN + '/api/users/list',
            url: url,
        })
        .then(result => {
          if(result.status == 200){
            //   console.log(result.data.data);
              
              _this.setState({
                    listUser: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }

    handleDelete(){
        const { data, idUser } = this.state;
        const _this = this;
             
        axios({
            method: 'delete',
            url: `${DOMAIN}/api/users/${idUser}`,
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
              _this.getList()
            alert("Success")
            _this.handleEditComponent(-1)
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
    }
    render() { 
        const { classes } = this.props;   
        const { order, orderBy, selected, page, listUser, listSubject, listUserSubject, total, openDialog, limit } = this.state;
        const emptyRows = limit - listUser.length;
        
        return (
        <Paper className={classes.root}>
            <Loading onRef={id => (this.loading = id)}/> 
            <DialogForm
                onRef={dialog => (this.mDialog = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete this user from list?"
                action={this.handleDelete} 
            />
            <Dialog 
                open={openDialog} 
                onClose={this.handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{
                    paperWidthSm: classes.paperWidthSm,
                }}
            >
                <DialogTitle id="form-dialog-title">List Subject</DialogTitle>
                <DialogContent>
                    <List className={classes.rootList}>
                        {listUserSubject.map((item, index) => {
                            let subject = listSubject.find(element => element._id == item.subjectId)                            
                            return(
                                <React.Fragment key={index}>
                                    <ListItem alignItems="flex-start">
                                        <ListItemText
                                        primary={subject.name}
                                        secondary={[
                                            <React.Fragment>
                                                <p><b>Subject Code: </b>{subject.code}</p>
                                                {/* <IconButton onClick={() => this.handleDeleteUserSubject(item._id)} > 
                                                    <DeleteIcon/>
                                                </IconButton> */}
                                            </React.Fragment>
                                        ]}
                                        />
                                    </ListItem>
                                    <Divider component="li" />
                                </React.Fragment>

                            )
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
            {/* <ListMemberCardToolbar 
                numSelected={selected.length} 
                handleDelete={() => this.handleOpenDialog(t('membercard_list_delete'), t('membercard_list_do_you_want_to_delete_this_card_from_list'))}
            /> */}
            <div className={classes.tableWrapper}>
                <Table className={classes.table + ' table-card'} aria-labelledby="tableTitle">
                    <ListMemberCardHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={listUser.length}
                    />
                    <TableBody>
                    {listUser
                        .sort(getSorting(order, orderBy))
                        .map((item, index) => {
                        const isSelected = this.isSelected(item._id);                        
                        return (
                           [  
                            <TableRow 
                                hover
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={-1}
                                key={item.code+'row'}
                                selected={isSelected}
                            >
                                {/* <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} onClick={event => this.handleClick(event, item._id)}/>
                                </TableCell> */}
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}} onClick={() => this.handleEditComponent(index)}>
                                    {item.code}
                                </TableCell>
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}} onClick={() => this.handleEditComponent(index)}>
                                    {item.name}
                                </TableCell>
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}} onClick={() => this.handleEditComponent(index)}>
                                    {item.class}
                                </TableCell>
                                <TableCell scope="row" padding="default" onClick={() => this.handleEditComponent(index)}>
                                    {item.email}
                                </TableCell>
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}} onClick={() => this.handleEditComponent(index)}>
                                    {item.birthday}
                                </TableCell>
                                <TableCell scope="row" padding="default"  onClick={() => this.handleEditComponent(index)}>
                                    {item.fbLink}
                                </TableCell>
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    <IconButton onClick={() => this.handleOpenListSubject(item._id)} > 
                                        <CopyIcon/>
                                    </IconButton>
                                </TableCell> 
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    <IconButton onClick={() => this.handleOpenDialog(item._id)} > 
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell> 
                            </TableRow>,
                            <TableRow key={index} className={classes.tableRowHeight}>
                              <TableCell colSpan={7} padding={'none'} className = {classes.tableCellEdit}>
                                <Collapse in={this.state.collapse[index]} unmountOnExit>
                                    <FormEdit 
                                        user={item}
                                        getList={this.getList}
                                        handleEditComponent={this.handleEditComponent}
                                    />
                                </Collapse>
                              </TableCell>
                            </TableRow>
                           ]
                        );
                    })}
                    {emptyRows > 0 && (
                        <TableRow style={{ height: 49 * emptyRows }}>
                            <TableCell colSpan={8} />
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </div>
            <TablePagination
                component="div"
                count={total}
                labelRowsPerPage="Rows per page"
                rowsPerPage={limit}
                page={page}
                backIconButtonProps={{
                    'aria-label': 'Previous Page',
                }}
                nextIconButtonProps={{
                    'aria-label': 'Next Page',
                }}
                rowsPerPageOptions={[5,10,25,50,100]}
                onChangePage={this.handleChangePage}
                onChangeRowsPerPage={this.handleChangeRowsPerPage}
            />
        </Paper>
        );
    }
}
export default (withStyles(styles, { withTheme: true })(ListUsers));