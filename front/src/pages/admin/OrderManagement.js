import { useState, useEffect } from 'react';
import moment from 'moment';

// MUi
import PropTypes from 'prop-types';
import { ThemeProvider, alpha } from '@mui/material/styles';
import theme from '../../theme/theme';
import { Typography, Box, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, TableSortLabel, Toolbar, Paper, Checkbox, IconButton, Tooltip, FormControlLabel,  } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { visuallyHidden } from '@mui/utils';

function createData(orderNumber, total, orderStatus, customer, orderedItems, Addons, pickup, orderPlaced) {
  return {
    orderNumber,
    total,
    orderStatus,
    customer,
    orderedItems,
    Addons,
    pickup,
    orderPlaced
  };
}

const orderStatusSetting = (order) => {
  if (order.isPlaced && order.confirmed && order.isReady && order.isFinished) {
    return 'Order Fulfilled'
  } else if ( order.isPlaced && order.confirmed && order.isReady ) {
    return 'Ready to Pick Up'
  } else if ( order.isPlaced && order.confirmed) {
    return 'Order Confirmed'
  } else if ( order.isPlaced ) {
    return 'Order Placed'
  }
}

const pickupOption = (order) => {
  if (order.isPaidAtRestaurant && order.isPlaced) {
    return 'Collect Payment'
  } else if ( !order.isPaidAtRestaurant && order.isPlaced && order.isPaid ) {
    return 'Order Paid'
  } else {
    return 'not confirmed the payment yet'
  }
}

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
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  {
    id: 'OrderNumber',
    numeric: false,
    label: 'Order Number',
  },
  {
    id: 'totalAmount',
    numeric: true,
    label: 'Total',
  },
  {
    id: 'status',
    numeric: false,
    label: 'Order Status',
  },
  {
    id: 'customer',
    numeric: false,
    label: 'Customer',
  },
  {
    id: 'orderedItems',
    numeric: true,
    label: 'Ordered Items',
  },
  {
    id: 'addOnItems',
    numeric: true,
    label: 'Add-on Items',
  },
  {
    id: 'pickup',
    numeric: false,
    label: 'Pay at Pick-up',
  },
  {
    id: 'Date',
    numeric: false,
    label: 'Date',
  }
]

function EnhancedTableHead(props) {
  const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
    props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            color="primary"
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{
              'aria-label': 'select all desserts',
            }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const EnhancedTableToolbar = (props) => {
  const { numSelected } = props;

  return (
    <Toolbar
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: '1 1 100%' }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: '1 1 100%' }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          Nutrition
        </Typography>
      )}

      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

EnhancedTableToolbar.propTypes = {
  numSelected: PropTypes.number.isRequired,
};


// placed -> Paid -> confirmed -> Ready -> Finished
// orderNumber, date, totalamount, status, customer, orderedItems, Addons


const OrderManagement = (props) => {

  // MUI states
  const [ order, setOrder ] = useState('asc');
  const [ orderBy, setOrderBy ] = useState('orderNumber');
  const [ selected, setSelected ] = useState([]);
  const [ page, setPage ] = useState(0);
  const [ dense, setDense ] = useState(true);
  const [ rowsPerPage, setRowsPerPage ] = useState(5);

  // states
  const [ loading, setLoading ] = useState(true);
  const [ allOrders, setAllOrders ] = useState([]);

  const rows = props.allOrder ?
    props.allOrders.map((order) => {
    createData(order.OrderNumber, (order.grandTotal).toFixed(2), orderStatusSetting(order), order.customer.username, order.orderedItems.length, order.addOns.length, pickupOption(order), moment(order.updatedAt).format('LLL') )
    })
    :
    createData('0', 0, 'loading...', 'loading...', 0, 0, 'loading...', 'loading...')

  // MUI handlers
  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = rows.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
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

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  useEffect(() => {
    async function setOrder() {
      if (props.allOrder) {
        await setAllOrders(props.allOrder);
      }
    }
    setOrder();
    if (allOrders.length > 0) {
      setLoading(false);
      console.log('melong')
    } else {
      setOrder()
    }
  },[allOrders])

  return (
    <ThemeProvider theme={theme}>
      {!loading ?
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={dense ? 'small' : 'medium'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={rows.length}
                />
                <TableBody>
                  {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                    rows.slice().sort(getComparator(order, orderBy)) */}
                  {stableSort(rows, getComparator(order, orderBy))
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const isItemSelected = isSelected(row.name);
                      const labelId = `enhanced-table-checkbox-${index}`;

                      return (
                        <TableRow
                          hover
                          onClick={(event) => handleClick(event, row.name)}
                          role="checkbox"
                          aria-checked={isItemSelected}
                          tabIndex={-1}
                          key={row.name}
                          selected={isItemSelected}
                        >
                          <TableCell padding="checkbox">
                            <Checkbox
                              color="primary"
                              checked={isItemSelected}
                              inputProps={{
                                'aria-labelledby': labelId,
                              }}
                            />
                          </TableCell>
                          <TableCell
                            component="th"
                            id={labelId}
                            scope="row"
                            padding="none"
                          >
                            {row.name}
                          </TableCell>
                          <TableCell align="right">{row.calories}</TableCell>
                          <TableCell align="right">{row.fat}</TableCell>
                          <TableCell align="right">{row.carbs}</TableCell>
                          <TableCell align="right">{row.protein}</TableCell>
                        </TableRow>
                      );
                    })}
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: (dense ? 33 : 53) * emptyRows,
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
        :
        <Typography>Order </Typography>
      }
    </ThemeProvider>
  );
}
export default OrderManagement;