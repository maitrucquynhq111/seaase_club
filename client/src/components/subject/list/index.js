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
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import React from 'react';
import axios from 'axios'
import { styles } from './styles';
import ListMemberCardHead from './tableHead';
import ListMemberCardToolbar from './tableToolbar';
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
            selected: [],
            index: 0,
            listSubject: [],
            collapse: [],
            total: 0,
            page: 0,
            rowsPerPage: 5,
        };
        this.handleSubmitEdit = this.handleSubmitEdit.bind(this)
        this.getList = this.getList.bind(this)
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
                            </TableRow> ,
                            <TableRow key={index} className={classes.tableRowHeight}>
                              <TableCell colSpan={6} padding={'none'} className = {classes.tableCellEdit}>
                                <Collapse in={this.state.collapse[index]} unmountOnExit>
                                    <Paper className={classes.paper}>
                                        {/* <form className={classes.container} noValidate autoComplete="off">     */}
                                            <Grid container spacing={24}>                   
                                                <Grid item xs={12} sm={6} style={{alignItems: 'flex-end',display: 'flex'}}>
                                                    <TextField
                                                        label="Subject Code"
                                                        name="code"
                                                        margin="dense"
                                                        // required
                                                        value={!!this.state.data.code?this.state.data.code:item.code}
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
                                                        value={!!this.state.data.name? this.state.data.name:item.name}
                                                        onChange={this.handleChange}
                                                        className={classes.textField}
                                                        InputProps={{
                                                            shrink: true,
                                                            classes: { 
                                                                inputType: classes.inputType
                                                            },
                                                        }}
                                                        // InputLabelProps={{
                                                        //     className:classes.label
                                                        // }}
                                                    />
                                                </Grid>
                                            </Grid>   
                                            <Grid container justify='flex-end' className={classes.marginTop}>
                                                <Button 
                                                    variant="contained" 
                                                    color="primary"
                                                    onClick={() => this.handleSubmitEdit(item._id)} 
                                                    // onClick={() => console.log('ADD')} 
                                                    className={classes.button}
                                                >
                                                    Update
                                                </Button>
                                            </Grid>
                                        {/* </form>*/}
                                    </Paper>
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