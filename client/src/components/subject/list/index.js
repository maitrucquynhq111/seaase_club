import {
    Checkbox,
    Collapse,
    MenuItem,
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
import SendIcon from '@material-ui/icons/Send';
import React from 'react';
import { styles } from './styles';
import ListMemberCardHead from './tableHead';
import ListMemberCardToolbar from './tableToolbar';
import axios from 'axios';
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
            selected: [],
            index: 0,
            listSubject: [],
            total: 0,
            page: 0,
            rowsPerPage: 5,
        };
    }

    componentWillMount(){
        axios({
            method: 'get',
            url: DOMAIN + '/api/subjects/list',
        })
        .then(result => {
          if(result.status == 200){
              this.setState({
                    listSubject: result.data.data.list,
                    total: result.data.data.sum,
                })
          }
        })
        .catch(err => console.log(err))
    }

    componentDidMount() {
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

    isSelected = id => {
        return this.state.selected.indexOf(id) !== -1
    };
    render() { 
        const { classes } = this.props;   
        const { order, orderBy, selected, rowsPerPage, page, listSubject, total } = this.state;
        const listMemberCard = [
            {name: 'Toán', description: 'khó'}
        ];
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
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}}>
                                    {item.name}
                                </TableCell>
                                <TableCell scope="row" padding="default" style={{textTransform: 'capitalize'}}>
                                    {item.description}
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