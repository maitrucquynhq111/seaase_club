import {
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    IconButton,
    Icon,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Checkbox
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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
            data: {},
            idSelect: '',
            selected: [],
            index: 0,
            listSemesters: [],
            collapse: [],
            limit: 5,
            total: 0,
            page: 0,
            openDialog: false,
            openDialogMany: false
        };
        this.handleDelete = this.handleDelete.bind(this);
        this.handleDeleteMany = this.handleDeleteMany.bind(this);
        this.getList = this.getList.bind(this);
    }

    componentWillMount(){
        this.props.onRef(null)
    }

    async componentDidMount() {
        this.props.onRef(this)
        this.loading.startLoading()
        await this.getList()
        this.loading.stopLoading()
    }

    componentWillReceiveProps(nextProps){
        if(this.props.listSemesters != nextProps.listSemesters){
            this.setState({listSemesters: nextProps.listSemesters, total: nextProps.total})
        }
    }

    handleClose = () => {
        this.setState({openDialog:false})
    }
    
    handleOpenDialog = (id) => {      
        this.setState({idSelect: id}, function(){
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
            this.setState(state => ({ selected: state.listSemesters.map(n => n._id) }));
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

    handleEditComponent = (id) => {
        const listSemesters = this.state.listSemesters;
        const collapse = this.state.collapse;
        for(var i = 0;i <= listSemesters.length; i++)
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
        let url = `${DOMAIN}/api/semesters/list?${stringify(_pick(data, ['limit', 'skip', 'search']))}`
        
        await axios({
            method: 'get',
            url: url,
        })
        .then(result => {
          if(result.status == 200){
              _this.setState({
                    listSemesters: result.data.data.list,
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
            url: `${DOMAIN}/api/semesters/deleteMany`,
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
        const { data, idSelect } = this.state;
        const _this = this;
             
        axios({
            method: 'delete',
            url: `${DOMAIN}/api/semesters/${JSON.stringify(idSelect)}`,
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
        const { order, orderBy, selected, page, V, total, openDialog, openDialogMany, limit, listSemesters } = this.state;
        const emptyRows = limit - listSemesters.length;
        
        return (
        <Paper className={classes.root}>
            <Loading onRef={id => (this.loading = id)}/> 
            <DialogForm
                onRef={dialog => (this.mDialog = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete this semester from list?"
                action={this.handleDelete} 
            />
            {/* Delete many */}
            <DialogForm
                onRef={dialog => (this.mDialogMany = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete semesters from list?"
                action={this.handleDeleteMany} 
            />
            <Dialog 
                open={openDialogMany} 
                onClose={this.handleClose} 
                aria-labelledby="form-dialog-title"
                classes={{
                    paperWidthSm: classes.paperWidthSm,
                }}
            >
                <DialogTitle id="form-dialog-title">List Student</DialogTitle>
                <DialogContent>
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
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
                        rowCount={listSemesters.length}
                    />
                    <TableBody>
                    {listSemesters
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
                                    {item.name}
                                </TableCell> 
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    <IconButton onClick={() => this.handleOpenDialog(item._id)} > 
                                        <DeleteIcon/>
                                    </IconButton>
                                </TableCell>
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    {item.isCurrent && <Icon color="secondary">grade</Icon>}
                                </TableCell>
                            </TableRow> ,
                            <TableRow key={index} className={classes.tableRowHeight}>
                              <TableCell colSpan={4} padding={'none'} className = {classes.tableCellEdit}>
                                <Collapse in={this.state.collapse[index]} unmountOnExit>
                                    <FormEdit
                                        semester={item}
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