import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
import './addbook.css'
import { Button, MenuItem, Select, TextField, Typography, Input, InputLabel } from '@mui/material'
import { Form, Formik } from 'formik'
import bookService from '../../../services/bookService'
import { toast } from 'react-toastify';
import categoryService from '../../../services/categoryService';
import Cookies from 'js-cookie';



const EditBook = () => {

    const [categories, setCategories] = useState([]);

    useEffect(() => {
        categoryService.GetAllCategories().then((response) => {
            setCategories(response.data.result)
        }).catch("Data Not Found")
    }, [])


    const [BookId, setBookId] = useState();
    const [BookName, setBookName] = useState();
    const [BookPrice, setBookPrice] = useState();
    const [BookCategory, setBookCategory] = useState();
    const [BookCategoryId, setBookCategoryId] = useState();
    const [BookDescription, setBookDescription] = useState();
    const [BookImage, setBookImage] = useState();



    useEffect(() => {
        setBookId(Cookies.get("BookId"))
        setBookPrice(Cookies.get("BookPrice"))
        setBookName(Cookies.get("BookName"))
        setBookCategory(Cookies.get("BookCategory"))
        setBookCategoryId(Cookies.get("BookCategoryId"))
        setBookDescription(Cookies.get("BookDescription"))
        setBookImage(localStorage.getItem("BookImage"))
    }, []);

    const [img, setImg] = useState("");

    const imgToBase64 = (files) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader()
            if (files) {
                reader.readAsDataURL(files);
            }
            reader.onload = () => {
                setImg(reader.result)
            }
        })
    }

    const handleImage = async (e, setFieldValue) => {
        const files = e.target.files[0]

        const base64Img = await imgToBase64(files)
        setFieldValue('bookImage', base64Img)
    }

    const handleSubmit = async (values) => {

        if (!values.bookName) {
            values.bookName = BookName;
        }
        if (!values.bookCategoryId) {
            values.bookCategoryId = BookCategoryId;
        }
        if (!values.bookDescription) {
            values.bookDescription = BookDescription;
        }
        if (!values.bookPrice) {
            values.bookPrice = BookPrice;
        }

        if (img) {
            var image = img;
        }
        else {
            var image = BookImage;
        }


        const payload = {

            "id": BookId,
            "name": values.bookName,
            "description": values.bookDescription,
            "price": values.bookPrice,
            "categoryId": values.bookCategoryId,
            "base64image": image,
        };
        console.log(payload);

        await bookService.EditBook(payload).then(response => {
            toast.success("Book Edited Sucsessfully", { position: "top-right" })
            navigate("/booksinfo")
            Cookies.remove("BookId")
            Cookies.remove("BookPrice")
            Cookies.remove("BookName")
            Cookies.remove("BookCategory")
            Cookies.remove("BookCategoryId")
            Cookies.remove("BookDescription")
            localStorage.removeItem("BookImage")

        })
            .catch((error) => {
                toast.error("Something Went Wrong!!!", { position: "top-right" })
                console.log(error)
            })
    };

    const navigate = useNavigate();

    return (
        <div id='addbook-main-container'>

            < Typography variant="h3" ><u>Edit Book</u></Typography> <br /> <br />
            <p>Enter Details You Want to Change Otherwise Leave It</p>

            <div id="addbook-container">

                <Formik
                    initialValues={{ bookId: "", bookName: "", bookPrice: "", bookCategoryId: "", bookDescription: "", bookImage: "" }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, setFieldValue, errors, handleBlur }) => {
                        console.log(errors);
                        return (
                            <Form >
                                <div id="addbook-components">
                                    <h4>Book ID : </h4>

                                    <TextField
                                        disabled
                                        id="bookId"
                                        name="bookId"
                                        variant='outlined'
                                        value={BookId}
                                        sx={{
                                            width: 150,
                                        }
                                        }
                                    />

                                    <br />
                                    <div id='addbook-components-row'>
                                        <h4>Book Name : {BookName}</h4>
                                        <h4>Book Price : {BookPrice}</h4>
                                    </div>
                                    <div id='addbook-components-row'>
                                        <TextField

                                            id="bookName"
                                            // label="Enter Name of Book"
                                            name="bookName"
                                            variant='outlined'
                                            value={values.bookName}
                                            onChange={(e) => {
                                                setFieldValue("bookName", e.target.value)
                                            }}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 400,
                                            }
                                            }
                                        />

                                        <TextField
                                            id="bookPrice"
                                            label="Enter Price of Book"
                                            name="bookPrice"
                                            variant='outlined'
                                            value={values.bookPrice}
                                            onChange={(e) => setFieldValue("bookPrice", e.target.value)}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 400,
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <div id='addbook-components-row'>
                                        <h4>Book Category : {BookCategory}</h4>
                                        <h4>Book Image :</h4>
                                    </div>
                                    <InputLabel id="Category" />
                                    <div id='addbook-components-row'>
                                        <Select
                                            sx={{
                                                width: 400,
                                            }}
                                            name='bookCategory'
                                            id="bookCategory"
                                            value={values.bookCategoryId}
                                            onChange={(e) => {
                                                setFieldValue("bookCategoryId", e.target.value)
                                            }} >

                                            {categories?.map((categories, index) => {
                                                return <MenuItem key={index} value={categories.id}>{categories.name}</MenuItem>
                                            })}
                                        </Select>

                                        <Input type='file'
                                            id="bookImage"
                                            name="bookImage"
                                            value={values.bookImage}
                                            onChange={(e) => {
                                                handleImage(e, setFieldValue)
                                            }}
                                            sx={{
                                                width: 400,
                                            }}
                                        />
                                    </div>
                                    <br />

                                    <div>
                                        <h4>Book Description : {BookDescription}</h4>
                                        <TextField
                                            id="bookDescription"
                                            label="Enter description of Book..."
                                            name="bookDescription"
                                            variant='outlined'
                                            value={values.bookDescription}
                                            onChange={(e) => setFieldValue("bookDescription", e.target.value)}
                                            onBlur={handleBlur}
                                            fullWidth

                                        />
                                    </div>
                                    <br />
                                    <div >
                                        <Button
                                            type="submit"
                                            className="pink-btn btn"
                                            variant="contained"
                                            sx={{
                                                ":hover": {
                                                    bgcolor: "#008094",
                                                    color: "white"
                                                }
                                            }} >
                                            CHANGE
                                        </Button>
                                    </div>
                                </div>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
        </div>
    );
};

export default EditBook
