import {
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
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
    Checkbox,
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
import UserSubject from './userSubject'
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
            data: {},
            idUser: '',
            selected: [],
            index: 0,
            listSubject: [],
            listUserSubject: [],
            listSemester: [],
            listUser: [],
            collapse: [],
            limit: 5,
            total: 0,
            page: 0,
            // total: 0,
            // page: 0,
            // rowsPerPage: 5,
            openDialog: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteMany = this.handleDeleteMany.bind(this);
        this.getList = this.getList.bind(this);
    }

    componentWillMount(){
    }

    async componentDidMount() {
        this.loading.startLoading()
        await this.getList()
        await axios({
            method: 'get',
            url: DOMAIN + '/api/users/list',
        })
        .then(result => {
          if(result.status == 200){
              this.setState({
                    listUser: result.data.data.list,
                })
          }
        })
        .catch(err => console.log(err))
        await axios({
            method: 'get',
            url: DOMAIN + '/api/semesters/list/all',
        })
        .then(result => {
          if(result.status == 200){
              this.setState({
                    listSemester: result.data.data.list,
                })
          }
        })
        .catch(err => console.log(err))
        this.loading.stopLoading()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.listSubject != nextProps.listSubject){
            this.setState({listSubject: nextProps.listSubject, total: nextProps.total})
        }
    }

    handleClickOpen = () => {
        this.setState({openDialog:true, newSubject: {}})
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }
    
    handleOpenDialog = (id) => {      
        this.setState({idUser: id}, function(){
        this.mDialog.handleDialogOpen()
      })
    }

    handleOpenDialogMany = () => {
        this.mDialogMany.handleDialogOpen()
    }

    handleChange = (e) => {
        let value = e.target.value
        let name = e.target.name;
        let data = this.state.data; 
        data[name] = value; 
        this.setState({data})
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
            this.setState(state => ({ selected: state.listSubject.map(n => n._id) }));
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

    handleOpenListStudent = (id) => {
        const _this = this;        
        axios({
            method: 'get',
            url: `${DOMAIN}/api/userSubjects/getBySubject/${id}`,
        })
        .then(result => {
          if(result.status == 200){
                _this.setState({ listUserSubject: result.data.data, idUser: id }, function(){
                      _this.mUserSubject.handleOpen()
                  })
          }
        })
        .catch(err => console.log(err))
    }

    handleEditComponent = (id) => {
        const listSubject = this.state.listSubject;
        const collapse = this.state.collapse;
        for(var i = 0;i <= listSubject.length; i++)
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
    }
    
    async getList(){
        const _this = this;
        const { limit, page } = this.state
        let data = {
            skip: page*limit,
            limit: limit,
        }
        let url = `${DOMAIN}/api/subjects/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        
        await axios({
            method: 'get',
            url: url,
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
    }

    handleDeleteMany(){
        const { data, selected } = this.state;
        const _this = this;
             
        axios({
            method: 'delete',
            url: `${DOMAIN}/api/subjects/deleteMany`,
            data: {data: selected}
        })
        .then(result => {
          if(result.status == 200){
              _this.getList()
              _this.setState({selected: []})
              _this.mDialogMany.handleDialogClose()
            alert("Success")
          }
          else{
              alert("Something went wrong")
          }
        })
        .catch(err => console.log(err))
    }

    handleDelete(){
        const { data, idUser } = this.state;
        const _this = this;
             
        axios({
            method: 'delete',
            url: `${DOMAIN}/api/subjects/${idUser}`,
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

    render() { 
        const { classes } = this.props;   
        const { order, orderBy, selected, page, listSubject, listUserSubject, listUser, listSemester, total, limit } = this.state;
        const emptyRows = limit - listSubject.length;
        
        return (
        <Paper className={classes.root}>
            <Loading onRef={id => (this.loading = id)}/> 
            <DialogForm
                onRef={dialog => (this.mDialog = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete this subject from list?"
                action={this.handleDelete} 
            />
            {/* Delete many */}
            <DialogForm
                onRef={dialog => (this.mDialogMany = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete subjects from list?"
                action={this.handleDeleteMany} 
            />
            <UserSubject
                onRef={dialog => (this.mUserSubject = dialog)}
                listUser={listUser}
                listSemester={listSemester}
                listUserSubject={listUserSubject}
            />
            {/* <Dialog 
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
                        {listUserSubject.map((item, index) => {
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
                        })}
                    </List>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog> */}
            <ListToolbar 
                numSelected={selected.length} 
                handleDelete={() => this.handleOpenDialogMany()}
            />
            <div className={classes.tableWrapper}>
                <Table className={classes.table + ' table-card'} aria-labelledby="tableTitle">
                    <ListHead
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={this.handleSelectAllClick}
                        onRequestSort={this.handleRequestSort}
                        rowCount={listSubject.length}
                    />
                    <TableBody>
                    {listSubject
                        .sort(getSorting(order, orderBy))
                        // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
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
                                <TableCell padding="checkbox">
                                    <Checkbox checked={isSelected} onClick={event => this.handleClick(event, item._id)}/>
                                </TableCell>
                                {/* <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}}></TableCell> */}
                                <TableCell scope="row" padding="default"  onClick={() => this.handleEditComponent(index)}>
                                    {item.code}
                                </TableCell>
                                <TableCell scope="row" padding="default"  onClick={() => this.handleEditComponent(index)}>
                                    {item.name}
                                </TableCell>
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    <IconButton onClick={() => this.handleOpenListStudent(item._id)} > 
                                        <CopyIcon/>
                                    </IconButton>
                                </TableCell> 
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    <IconButton onClick={() => this.handleOpenDialog(item._id)} > 
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell> 
                            </TableRow> ,
                            <TableRow key={index} className={classes.tableRowHeight}>
                              <TableCell colSpan={4} padding={'none'} className = {classes.tableCellEdit}>
                                <Collapse in={this.state.collapse[index]} unmountOnExit>
                                    <FormEdit
                                        subject={item}
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
export default (withStyles(styles, { withTheme: true })(ListMemberCard));