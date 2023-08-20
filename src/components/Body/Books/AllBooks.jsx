import React, { useEffect, useMemo, useState } from 'react'
import './books.css'
import bookService from '../../../services/bookService';
import WithAuth from '../../../layout/WithAuth';
import { FormControl, FormControlLabel, InputAdornment, InputLabel, MenuItem, Pagination, Radio, RadioGroup, Select, TextField } from '@mui/material';
import categoryService from '../../../services/categoryService';

import SearchIcon from "@mui/icons-material/Search";
import { AuthContext } from '../../../context/AuthContext';
import { toast } from 'react-toastify';

function BooksList() {

    const defaultFilter = {
        pageIndex: 1,
        pagesize: 5,
        keyword: "",
    };

    const [bookResponse, setBookResponse] = useState({
        pagelndex: 0,
        pagesize: 10,
        totalpages: 1,
        items: [],
        totalItems: 0,
    });

    const [categories, setCategories] = useState([]);
    const [sortBy, setSortBy] = useState();
    const [filters, setFilters] = useState(defaultFilter);

    useEffect(() => {
        getAllCategroies();
    }, []);


    const getAllCategroies = async () => {
        await categoryService.getAll().then((res) => {
            if (res) {
                setCategories(res);
            }
        });
    };

    const searchAllBook = (filters) => {
        bookService.GetAllBooks(filters).then((res) => {
            setBookResponse(res)
        });
    };

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filters.keyword === " ") delete filters.keyword;
            searchAllBook({ ...filters });
        }, 500);
        return () => clearTimeout(timer);
    }, [filters]);

    console.log(bookResponse);
    console.log(filters);



    const book = useMemo(() => {
        const bookList = [...bookResponse.items]
        if (bookList) {
            bookList.array.forEach((element) => {
                element.category = categories.find(
                    (a) => a.id === element.categoryId
                )?.name
            });
            return bookList;
        }
        return [];
    }, [categories, bookResponse]);

    // const addToCart = (book) => {
    //     Shared.addToCart(book, AuthContext.Consumer.id).then((res) =>{
    //         if(res.error){
    //             toast.error(res.message);
    //         }else{
    //             toast.success(rres.message);
    //             cartContect.updateCart();
    //         }
    //     })
    // }

    const sortBooks = (e) => {
        setSortBy(e.target.value);
        const bookList = [...bookResponse.items];

        bookList.sort((a, b) => {
            if (a.name < b.name) {
                return e.target.value === "a-z" ? -1 : 1;
            }
            if (a.name > b.name) {
                return e.target.value === "a-z" ? 1 : -1;
            }
            return 0;
        });
        setBookResponse({ ...bookResponse, items: bookList });
    };


    return (

        <>
            <div id='main-container'>
                <br />
                <br />
                <h1>All Books</h1>
                <br />


                <div>
                    <TextField
                        id="search"
                        name='text'
                        placeholder='Search...'
                        type="search"
                        label="What You are looking for....."
                        onChange={(e) => {
                            setFilters({
                                ...filters,
                                keyword: e.target.value,
                                pageIndex: 1,
                            })
                        }}
                        sx={{ width: 600 }}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <select
                        value={sortBy}
                        onChange={sortBooks}
                    >
                        <option value="a-z">A - Z</option>
                        <option value="z-a">Z - A</option>
                    </select>
                    {/* <FormControl>
                        <RadioGroup
                            row
                            aria-labelledby="Sort"
                            name="Sort"
                            onChange={handleSort}
                            value={sortBy}
                        >
                            <FormControlLabel value="a-z" labelPlacement='bottom' control={<Radio />} label="a-z" />
                            <FormControlLabel value="z-a" labelPlacement='bottom' control={<Radio />} label="z-a" />
                        </RadioGroup>
                    </FormControl> */}

                </div>
                <br />

                <div id="card-container">

                    {books.map((book, index) => (
                        <div key={index}>

                            <div id="card">
                                <div id='card-image'><img src={book.base64image} alt='' /></div>
                                <div id="card-block">
                                    <h4><b>{book.name}</b></h4>
                                    <h4><b>MRP &#8377 {book.price}</b></h4>
                                    <h4><b>{book.category}</b></h4>
                                    <p>{book.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}

                </div>
                <div>
                    <Pagination
                        count={bookResponse.totalpages}
                        onChange={(e, newPage) => {
                            setFilters({ ...filters, pagelndex: newPage });
                        }} />
                </div>
            </div>

        </>

    )
}
export default WithAuth(BooksList);