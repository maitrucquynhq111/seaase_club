import Checkbox from '@material-ui/core/Checkbox';
import { withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';
import React from 'react';
import { tableHeadStyles } from './styles';

// Sortable Table UI-Material
// Styles
const rows = [
    { id: 'code', numeric: false, disablePadding: false, label: 'Student Code' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'class', numeric: false, disablePadding: false, label: 'Class' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email̉' },
    { id: 'birthday', numeric: false, disablePadding: false, label: 'Birthday' },
    { id: 'fbLink', numeric: false, disablePadding: false, label: 'Facebook' },
    { id: 'delete', numeric: false, disablePadding: false, label: '' },
  ];

class ListMemberCardHead extends React.Component {
    createSortHandler = property => event => {
      this.props.onRequestSort(event, property);
    };
  
    render() { 
      const { onSelectAllClick, order, orderBy, numSelected, rowCount, classes,t } = this.props;
      return (
        <TableHead>
          <TableRow>
            {/* <TableCell padding="checkbox">
              <Checkbox
                indeterminate={numSelected > 0 && numSelected < rowCount}
                checked={numSelected === rowCount}
                onChange={onSelectAllClick}
              />
            </TableCell> */}
            {rows.map(row => {
              return (
                <TableCell
                  className={classes.head}
                  key={row.id}
                  numeric={row.numeric}
                  // style={row.id === 'startedDate' || row.id === 'endedDate' ? {minWidth: 120}: {}}
                  padding={row.disablePadding ? 'none' : 'default'}
                  sortDirection={orderBy === row.id ? order : false}
                >
                  <Tooltip
                    title="Sort"
                    placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                    enterDelay={300}
                  >
                    <TableSortLabel
                      active={orderBy === row.id}
                      direction={order}
                      onClick={this.createSortHandler(row.id)}
                    >
                      {row.label}
                    </TableSortLabel>
                  </Tooltip>
                </TableCell>
              );
            }, this)}
          </TableRow>
        </TableHead>
      );
    }
  }
  

export default (withStyles(tableHeadStyles)(ListMemberCardHead));
  