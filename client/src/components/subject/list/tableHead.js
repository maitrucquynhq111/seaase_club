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
    { id: 'name', numeric: false, disablePadding: false, label: 'Tên' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Mô tả' },
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
  