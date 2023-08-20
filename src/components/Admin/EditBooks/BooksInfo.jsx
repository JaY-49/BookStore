import React, { useContext, useEffect, useState } from 'react'
import './booksinfo.css'
import bookService from '../../../services/bookService';
import WithAuth from '../../../layout/WithAuth';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow, styled, tableCellClasses } from '@mui/material';
import { toast } from 'react-toastify';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { AuthContext } from '../../../context/AuthContext';

function BooksInfo() {

    const Details = useContext(AuthContext);

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
            backgroundColor: theme.palette.common.black,
            color: theme.palette.common.white,
        },
    }));

    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
            border: 0,
        },
    }));

    const [books, setBooks] = useState([]);
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const getBooks = () => {
        bookService.GetAllBooks().then((response) => {
            setBooks(response.data.result)
        })
    }

    useEffect(() => {
        getBooks();
    }, []);

    const deleteBook = (id) => {
        bookService.DeleteBook(id).then(() => {
            toast.success("Delete Sucsessfully")
            getBooks();
        })
    }

    const navigate = useNavigate();



    return (

        <>
            <div id='main-container' >
                <br />
                <br />
                <h1><u>All Books</u></h1>
                <br />

                {Details.user.role === "seller" && (

                <a href="/addbook">
                    Add Book
                    <IconButton
                        aria-label="Addbook"
                        size="large"
                        sx={{ color: "coral" }}
                    >
                        <AddIcon sx={{ fontSize: 35 }} />
                    </IconButton>
                </a>)}


                <div id='books-table'>
                    <TableContainer>
                        <Table  >
                            <TableHead>
                                <TableRow >
                                    <StyledTableCell><b>Id</b></StyledTableCell>
                                    <StyledTableCell><b>Name</b></StyledTableCell>
                                    <StyledTableCell><b>Price</b></StyledTableCell>
                                    <StyledTableCell><b>Category</b></StyledTableCell>
                                    <StyledTableCell><b>Edit</b></StyledTableCell>
                                    <StyledTableCell><b>Delete</b></StyledTableCell>
                                </TableRow>

                            </TableHead>
                            <TableBody>
                                {books
                                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                    .map((book, index) => {
                                        return <StyledTableRow
                                            key={index}>
                                            <TableCell>{book.id}</TableCell>
                                            <TableCell>{book.name}</TableCell>
                                            <TableCell>{book.price}</TableCell>
                                            <TableCell>{book.category}</TableCell>
                                            <TableCell>
                                                <Button
                                                    type='Edit'
                                                    variant='contained'
                                                    sx={{
                                                        color: "white",
                                                        bgcolor: "green",
                                                    }}
                                                    onClick={() => {
                                                        navigate('/editbook');
                                                        Cookies.set("BookId", (book.id));
                                                        Cookies.set("BookName", (book.name));
                                                        Cookies.set("BookPrice", (book.price));
                                                        Cookies.set("BookCategory", (book.category));
                                                        Cookies.set("BookCategoryId", (book.categoryId));
                                                        Cookies.set("BookDescription", (book.description));
                                                        localStorage.setItem("BookImage", (book.base64image))
                                                    }}
                                                >Edit</Button>
                                            </TableCell>
                                            <TableCell>
                                                <Button
                                                    type='Delete'
                                                    variant='contained'
                                                    onClick={() => {
                                                        deleteBook(book.id);

                                                    }}
                                                    sx={{
                                                        color: "white",
                                                        bgcolor: "red",
                                                    }}
                                                >
                                                    Delete
                                                </Button>
                                            </TableCell>
                                        </StyledTableRow>
                                    }


                                    )}
                            </TableBody>

                        </Table>
                    </TableContainer>
                    <TablePagination
                        component="div"
                        count={books.length}
                        page={page}
                        rowsPerPage={rowsPerPage}
                        onPageChange={handleChangePage}
                        onRowsPerPageChange={handleChangeRowsPerPage}
                    />

                </div>
            </div>
        </>
    )
}
export default WithAuth(BooksInfo);