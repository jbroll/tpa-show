import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: 2
  }
})(MuiTableCell);

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const { header, order, orderBy, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {header.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            { 
              headCell.headRender ? headCell.headRender(headCell, index) : (
                headCell.sortable ? 
                <TableSortLabel
                  active={orderBy === headCell.id}
                  direction={orderBy === headCell.id ? order : 'asc'}
                  onClick={createSortHandler(headCell.id)}
                >
                  {headCell.label}
                </TableSortLabel> :
                  <span> {headCell.label} </span>
              )
            }
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

EnhancedTableHead.propTypes = {
  header: PropTypes.array.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
};

EnhancedTable.propTypes = {
  config: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  classes: PropTypes.object,
};

export default function EnhancedTable(props) {
  var { config, rows, classes, rowKey, rowProps, rowRender, ...rest } = props;

  if (classes == null) {
    classes = {};
  }

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  return (
    <div className={classes.root}>
          <Table className={classes.table} {...rest} >
            <EnhancedTableHead
              header={config}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
            />
            <TableBody>
              { 
                  stableSort(rows, getComparator(order, orderBy))
                  .map((row, rowIndex, sortedRows) => {
                      if (rowRender != null) {
                          return rowRender(row, rowIndex, config);
                      } 

                      return (
                          <TableRow key={rowKey(row)} {...rowProps} >
                              { config.map((cellConfig, colNumber) => {
                                return (
                                  <TableCell key={cellConfig.id} align={cellConfig.align}>
                                    {
                                        cellConfig.cellRender ?
                                          cellConfig.cellRender(
                                            row[cellConfig.id], colNumber, cellConfig, row, rowIndex, config, sortedRows) :
                                          (row[cellConfig.id] || "?")
                                    }
                                  </TableCell>
                                )
                              })
                            }
                          </TableRow>
                      );
                  })
              }
            </TableBody>
          </Table>
    </div>
  );
}
