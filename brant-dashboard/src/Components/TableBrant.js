import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import userStore from '../Stores/UserStore'



const columns = [
  { id: 'name', label: 'Nome', minWidth: 170 },

  {
    id: 'age',
    label: 'age',
    minWidth: 170,
    align: 'right',
    format: value => value.toLocaleString(),
  },
];

/*function createData(name, exemplo) {
  
  return { name, exemplo };
}*/

/*
const rows = [
  createData('Nome_do_paciente', 3287263),
  createData('Nome_do_paciente',  301340),
  createData('Nome_do_paciente', 9833520),
  createData('Nome_do_paciente', 9984670),
  createData('Nome_do_paciente', 7692024),
  createData('Nome_do_paciente', 357578),
  createData('Nome_do_paciente',  70273),
  createData('Nome_do_paciente',  1972550),
  createData('Nome_do_paciente',  377973),
  createData('Nome_do_paciente',  640679),
  createData('Nome_do_paciente',  242495),
  createData('Nome_do_paciente', 17098246),
  createData('Nome_do_paciente', 923768),
  createData('Nome_do_paciente', 8515767),
];*/


let rows = userStore.getAll();
console.log("[table]");
console.log(rows);



const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function TableBrant(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map(row => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                  {columns.map(column => {
                    const value = row[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.format && typeof value === 'age' ? column.format(value) : value}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
