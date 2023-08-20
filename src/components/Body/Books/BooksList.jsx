import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import './books.css'
import SearchIcon from "@mui/icons-material/Search";
import { Button, FormControl, FormControlLabel, IconButton, InputAdornment, Radio, RadioGroup, TextField } from "@mui/material";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';

const Home = () => {
  // get products items
  const [products, setProducts] = useState([]);
  // get api info
  const [apidata, getApidata] = useState("");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState({});

  const handleChange = (event, value) => {
    setPage(value);
  };

  const getBooks = () => {
    var config = {
      method: "get",
      url: `https://book-e-sell-node-api.vercel.app/api/book?pageSize=8&pageIndex=${page}&keyword=${search}`,
      headers: { "Content-Type": "application/json" },
    };

    axios(config)
      .then(function (response) {
        const result = response.data.result;
        setProducts(result.items);
        getApidata(result);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getBooks();
  }, [page, search]);

  // filter products logic

  const FilterAtoZ = (e) => {
    var item = e.target.value;
    // console.log(item);
    if (item === "1") {
      setProducts([...products].sort((a, b) => a.name.localeCompare(b.name)));
    } else if (item === "2") {
      setProducts([...products].sort((a, b) => b.name.localeCompare(a.name)));
    }
  };

  return (
    <>
      <div id="main-container">
        <h1 >All Books</h1>


        <h1 >
          Total - {apidata.totalItems} items
        </h1>

        <div id="top-container">

          <TextField
            type="text"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            sx={{ width: 600 }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />

          <FormControl  >
            <RadioGroup
              row
              name="sortby"
              placeholder="Sort By"
              onChange={(e) => FilterAtoZ(e)}

            >
              <FormControlLabel labelPlacement='bottom' value="1" control={<Radio />} label="a-z" />
              <FormControlLabel labelPlacement='bottom' value="2" control={<Radio />} label="z-a" />
            </RadioGroup>
          </FormControl>
        </div>


        <br />
        <br />

        <div id="containt-container">
          {products.map((product) => (
            <div id="card-container" key={product.id}>
              <div id="card">
                <div >
                  <img
                    src={product.base64image}
                    alt="img"
                    id="card-image"
                  />
                </div>
                <div id="card-block">
                  <h1 >{product.name}</h1>
                  <h3 >{product.category}</h3>
                  <p >
                    Rs. {product.price}
                  </p>

                  <IconButton
                    aria-label="Add to cart"
                    size="large"
                    sx={{ color: "coral" }}
                  >
                    <AddShoppingCartIcon />
                  </IconButton>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
        </div>
          <Stack spacing={2}>
            <Pagination
            variant="outlined"
              count={apidata.totalPages}
              page={page}
              onChange={handleChange}
            />
          </Stack>
      </div>
    </>
  );
};

export default Home;