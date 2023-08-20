import React, { useContext, useEffect, useState } from 'react'
import './books.css'
import bookService from '../../../services/bookService';
import WithAuth from '../../../layout/WithAuth';
import { FormControl, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from '@mui/material';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from '../../../context/AuthContext';
import cartService from '../../../services/cartService';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import EditNoteIcon from '@mui/icons-material/EditNote';


function Books() {


    const User = useContext(AuthContext);
    const UserId = User.user.id;

    const navigate = useNavigate();

    const defaultFilter = {
        pageIndex: 1,
        pagesize: 5,
        keyword: "",
    };

    const [books, setBooks] = useState([]);
    const [sortBy] = useState();
    const [filters, setFilters] = useState(defaultFilter);

    const getBooks = () => {
        if (filters.keyword === "") {
            bookService.GetAllBooks(filters).then((response) => {
                if (response && response.status === 200) {
                    setBooks(response.data.result)
                }
            })
        } else {
            bookService.searchBooks(filters).then((response) => {
                if (response && response.status === 200) {
                    setBooks(response.data.result)
                }
            })
        }
    };
    useEffect(() => {
        getBooks({ ...filters });
    }, [filters]);


    const handleSort = (e) => {
        var item = e.target.value;
        if (item === "1") {
            setBooks([...books].sort((a, b) => a.name.localeCompare(b.name)));
        } else if (item === "2") {
            setBooks([...books].sort((a, b) => b.name.localeCompare(a.name)));
        }
    };

    const handleAddToCart = async (book) => {

        const Payload = {
            "bookId": book.id,
            "userId": UserId,
            "quantity": 1
        }

        await cartService.AddItemToCart(Payload)
            .then((response) => {
                console.log("data added sucessfully");
                toast.success("Added", { position: "top-right" });
            })
            .catch((error) => {
                toast.error("Invalid !!!", { position: "top-right" })
                console.log(error)
            })
    }


    return (

        <>
            <div id='main-container' >
                <br />
                <br />
                <h1>All Books</h1>
                <br />

                <TextField
                    id="search"
                    type="search"
                    label="What You are looking for....."
                    onChange={(e) => {
                        setFilters({
                            ...filters,
                            keyword: e.target.value,
                            pagelndex: 1,
                        })
                    }}

                    sx={{ width: 600 }}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <SearchIcon />
                            </InputAdornment>
                        ),
                    }} />

                <FormControl  >
                    <RadioGroup
                        row
                        aria-labelledby="Sort"
                        name="Sort"
                        onChange={handleSort}
                        value={sortBy}
                    >
                        <FormControlLabel value="1" labelPlacement='bottom' control={<Radio />} label="a-z" />
                        <FormControlLabel value="2" labelPlacement='bottom' control={<Radio />} label="z-a" />
                    </RadioGroup>
                </FormControl>
                <br />
                <br />


                <div id='containt-container'>

                    {books.map((book, index) => (
                        <div key={index}>
                            <div id="card-container">

                                <div id="card">
                                    <div><img id='card-image' src={book.base64image} alt=''

                                    /></div>
                                    <div id="card-block">
                                        <h4><b>{book.name}</b></h4>
                                        <h4><b>MRP  {book.price}</b></h4>
                                        <h4><b>{book.category}</b></h4>
                                        {/* <p>{book.description}</p> */}
                                    </div>
                                    {User.user.role === "buyer" && (
                                        <IconButton
                                            aria-label="Add to cart"
                                            size="large"
                                            sx={{ color: "coral" }}
                                            onClick={() => handleAddToCart(book)}
                                        >
                                            <AddShoppingCartIcon />
                                        </IconButton>)}

                                    {User.user.role === "seller" && (
                                        <IconButton
                                            aria-label="Add to cart"
                                            size="large"
                                            sx={{ color: "coral" }}
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
                                        >
                                            <EditNoteIcon />
                                        </IconButton>)}

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                {/* <Stack spacing={2}>
      <Pagination count={10} color="secondary" />
    </Stack> */}
            </div >

        </>

    )
}
export default WithAuth(Books);