import {
    Collapse,
    Paper,
    Table,
    TableBody,
    TableCell,
    TablePagination,
    TableRow,
    IconButton,
    Icon
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import CopyIcon from '@material-ui/icons/FileCopy';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios'
import { styles } from './styles';
import ListMemberCardHead from './tableHead';
import ListMemberCardToolbar from './tableToolbar';
import FormEdit from './formEdit';
import Dialog from '../../dialog';
import { DOMAIN } from '../../../utils/setting'

 
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
            collapse: [],
            total: 0,
            page: 0,
            rowsPerPage: 5,
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.getList = this.getList.bind(this);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps){
        if(this.props.listSubject != nextProps.listSubject){
            this.setState({listSubject: nextProps.listSubject, total: nextProps.total})
        }
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
            this.setState(state => ({ selected: this.props.listMemberCard.map(n => n._id) }));
            return;
        }
        this.setState({ selected: [] });
    };

    handleChangePage = async (event, page) => {
        this.setState({ page, selected: []  });
    };

    handleChangeRowsPerPage = async event => {
        this.setState({ rowsPerPage: event.target.value , selected: [] });
    };
    
    handleOpenDialog = (id) => {      
        this.setState({idUser: id}, function(){
        this.mDialog.handleDialogOpen()
      })
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
    
    getList(){
        const _this = this;        
        axios({
            method: 'get',
            url: DOMAIN + '/api/subjects/list',
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

    handleSubmitEdit(id){
        const { data } = this.state;
        const _this = this;        
        axios({
            method: 'put',
            url: `${DOMAIN}/api/subjects/${id}`,
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
        const { order, orderBy, selected, rowsPerPage, page, listSubject, total } = this.state;
        const emptyRows = rowsPerPage - listSubject.length;
        
        return (
        <Paper className={classes.root}>
            <Dialog
                onRef={dialog => (this.mDialog = dialog)} 
                disagree="Cancel"
                agree="Delete"
                title ="Notice"
                content="Do you want to delete this subject from list?"
                action={this.handleDelete} 
            />
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
                        rowCount={listSubject.length}
                    />
                    <TableBody>
                    {listSubject
                        .sort(getSorting(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((item, index) => {
                        const isSelected = this.isSelected(item._id);
                        console.log(item);
                        console.log(this.state.data);
                        
                        console.log(!!this.state.data.code? this.state.data.code:item.code);
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
                                {/* <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}}></TableCell> */}
                                <TableCell scope="row" padding="default"  onClick={() => this.handleEditComponent(index)}>
                                    {item.code}
                                </TableCell>
                                <TableCell scope="row" padding="default"  onClick={() => this.handleEditComponent(index)}>
                                    {item.name}
                                </TableCell>
                                <TableCell  scope="row" padding="default" style={{textAlign: 'center'}}> 
                                    {/* <Icon classes={{root: classes.iconCopy}}>
                                        file_copy
                                    </Icon> */}
                                    <IconButton> 
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
                labelRowsPerPage="SỐ hàng"
                rowsPerPage={rowsPerPage}
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