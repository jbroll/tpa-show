import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import MuiTableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';

import SearchBox from './SearchBox'

const TableCell = withStyles({
  root: {
    borderBottom: "none",
    padding: 2
  }
})(MuiTableCell);

function descendingComparator(a, b, orderBy) {
  a = a[orderBy];
  b = b[orderBy];

  if (b < a) { return -1; }
  if (b > a) { return 1; }
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
  const { header, order, orderBy, onRequestSort, onRequestSearch } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      { !props.search ? null :
        <TableRow>
          <TableCell colSpan={header.length} align="right">
            <SearchBox onChange={onRequestSearch}/>
          </TableCell>
        </TableRow>
      }
      <TableRow>
        {header.map((headCell, index) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.sort ? order : false}
          >
            { 
              headCell.headRender ? headCell.headRender(headCell, index) : (
                headCell.sort !== undefined ? 
                <TableSortLabel
                  active={orderBy === headCell.sort}
                  direction={orderBy === headCell.sort ? order : 'asc'}
                  onClick={createSortHandler(headCell.sort)}
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
  search: PropTypes.bool,
};

EnhancedTable.propTypes = {
  config: PropTypes.array.isRequired,
  rows: PropTypes.array.isRequired,
  rowKey: PropTypes.func.isRequired,
  rowRender: PropTypes.func,
  search: PropTypes.bool,
  classes: PropTypes.object,
};

export default function EnhancedTable(props) {
  var { config, rows, classes, rowKey, rowProps, rowRender, search, ...rest } = props;

  if (classes == null) {
    classes = {};
  }

  config = config.map(col => {
    return {
      ...col,
      sort: col.sort === true ? col.id : col.sort,
      search: col.search === undefined ? col.id : col.search,
    }
  });

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('');
  const [searchFor, setSearchFor] = React.useState('');

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleRequestSearch = (e) => {
    setSearchFor(e.target.value);
  };

  return (
    <div className={classes.root}>
          <Table className={classes.table} {...rest} >
            <EnhancedTableHead
              header={config}
              order={order}
              orderBy={orderBy}
              onRequestSort={handleRequestSort}
              search={search}
              onRequestSearch={handleRequestSearch}
            />
            <TableBody>
              { 
                  stableSort(rows, getComparator(order, orderBy))
                  .filter((row) => {
                    if ( searchFor === '') {
                      return true;
                    }
                    for (var term of searchFor.split(" ")) {
                      if (term === '') { continue; }
                      for (var i = 0; i < config.length; i++) {
                        if (config[i].search && row[config[i].search] && row[config[i].search].indexOf(term) !== -1) {
                          break;
                        }
                      }
                      if (i === config.length) {
                        return false;
                      }
                    }
                    return true;
                  })
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
