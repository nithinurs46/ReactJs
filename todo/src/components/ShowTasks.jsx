import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

export default function ShowTasks({ setTaskList, taskList }) {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: '#1565c0',
            color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
            fontSize: 14,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(even)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const handleDelete = (id) => {
        const updatedTasklist = taskList.filter(task => task.id !== id);
        setTaskList(updatedTasklist);
    }

    return (
        <Paper sx={{ width: '100%', marginTop: '120px', padding: '20px', minHeight: '400px' }}>
            {taskList.length === 0 ? (
                <div style={{  minWidth: 650, textAlign: 'center', fontSize: '16px', color: '#555', padding: '20px' }}>
                    <h3><i>No tasks to display.</i></h3>
                </div>
            ) : (
            <TableContainer>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="center">Task</StyledTableCell>
                            <StyledTableCell align="center">Date & Time</StyledTableCell>
                            <StyledTableCell align="center">Delete</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {taskList.map((row) => (
                            <StyledTableRow
                                key={row.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <StyledTableCell align="center">{row.name}</StyledTableCell>
                                <StyledTableCell align="center">{row.dueDate}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        onClick={() => handleDelete(row.id)}
                                    >
                                        Delete
                                    </Button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            )}
        </Paper>
    );
}
