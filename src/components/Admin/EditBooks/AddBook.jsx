import React, { useState } from 'react'
import './addbook.css'
import { Button, Container, FormControl, FormHelperText, Input, InputLabel, MenuItem, Select, TextField, TextareaAutosize, Typography, makeStyles } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup';
import bookService from '../../../services/bookService'
import { toast } from 'react-toastify';
import categoryService from '../../../services/categoryService';
import { useNavigate } from 'react-router-dom';


const AddBook = () => {
    
    const navigate = useNavigate();

    const validationSchema = Yup.object().shape({
        bookName: Yup.string().required("Enter Book Name, "),
        bookDescription: Yup.string().required("Enter Valid Description, "),
        bookPrice: Yup.number().required("Enter Price, "),
        bookCategory: Yup.number().required("Choose Category, "),
    })

    const [img, setImg] = useState([]);
    const [categories, setCategories] = useState([]);

    const GetAllCategories = () => {
        categoryService.GetAllCategories().then((response) => {
            setCategories(response.data.result)
        })
    }

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
        setFieldValue('image', base64Img)
    }

    const handleSubmit = async (values) => {

        const payload = {
            "base64image": img,
            "categoryId": values.bookCategory,
            "description": values.bookDescription,
            "name": values.bookName,
            "price": values.bookPrice,
        };


        await bookService.AddBook(payload).then(() => {
            toast.success("Book Added Sucsessful", { position: "top-right" })
            navigate("/booksinfo")
        })
            .catch((error) => {
                toast.error("Something Went Wrong!!!", { position: "top-right" })
                console.log(error)
            })
    };

    return (
        <div id='addbook-main-container'>

            < Typography variant="h3" ><u>Add Book</u></Typography> <br /> <br />

            <div id="addbook-container">

                <Formik
                    initialValues={{ bookName: "", bookPrice: "", bookCategory: "", bookDescription: "", bookImage: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, setFieldValue, errors, handleBlur }) => {
                        console.log(errors);
                        return (

                            <Form >
                                <div id="addbook-components">
                                    <div id='addbook-components-row'>
                                        <TextField
                                            id="bookName"
                                            label="Enter Name of Book"
                                            name="bookName"
                                            variant='outlined'
                                            value={values.bookName}
                                            error={errors.bookName}
                                            onChange={(e) => {

                                                GetAllCategories();
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
                                            autoComplate="off"
                                            value={values.bookPrice}
                                            error={errors.bookPrice}
                                            onChange={(e) => setFieldValue("bookPrice", e.target.value)}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 400,
                                            }
                                            }

                                        />
                                    </div>
                                    <br />
                                    <br />


                                    <div id='addbook-components-row'>


                                        <Select
                                            sx={{
                                                width: 400,
                                            }}
                                            name='bookCategory'
                                            id="bookCategory"
                                            value={values.bookCategory}
                                            onChange={(e) => {

                                                setFieldValue("bookCategory", e.target.value)
                                            }} >

                                            {categories?.map((categories, index) => {
                                                return <MenuItem key={index} value={categories.id}>{categories.name}</MenuItem>
                                            })}
                                        </Select>

                                        {/* <Select
                                            id="bookCategory"
                                            label="Choose Cetegory"
                                            name="bookCategory"
                                            value={values.bookCategory}
                                            error={errors.bookCategory}
                                            onChange={(e) => setFieldValue("bookCategory", e.target.value)}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 400,
                                            }}
                                        >
                                            <MenuItem value={2}>Historical Fiction</MenuItem>
                                            <MenuItem value={3}>Fantasy</MenuItem>
                                            <MenuItem value={4}>Horror</MenuItem>
                                            <MenuItem value={5}>Thriller</MenuItem>
                                            <MenuItem value={6}>Essayyyy</MenuItem>
                                            <MenuItem value={7}>Graphic novel</MenuItem>
                                            <MenuItem value={8}>Comic book</MenuItem>
                                            <MenuItem value={9}>Spirituality</MenuItem>
                                            <MenuItem value={10}>Temp Category</MenuItem>
                                            <MenuItem value={11}>Essay New</MenuItem>
                                        </Select> */}

                                        <Input type='file'
                                            id="bookImage"
                                            name="bookImage"
                                            onChange={(e) => {
                                                handleImage(e, setFieldValue)
                                                // const files = e.target.files;
                                                // setFieldValue("bookImage", e.target.value)

                                                // console.log(files);
                                                // const selectedFile = files[0];
                                                // const reader = new FileReader();
                                                // reader.readAsDataURL(selectedFile);
                                            }}
                                            sx={{
                                                width: 400,
                                            }}
                                        />
                                    </div>
                                    <br />
                                    <br />

                                    <div>
                                        <TextField
                                            id="bookDescription"
                                            label="Enter description of Book..."
                                            name="bookDescription"
                                            variant='outlined'
                                            value={values.bookDescription}
                                            error={errors.bookDescription}
                                            onChange={(e) => setFieldValue("bookDescription", e.target.value)}
                                            onBlur={handleBlur}
                                            sx={{
                                                width: 1000,
                                                height: 50
                                            }
                                            }
                                        />
                                    </div>
                                    <br />

                                    <FormHelperText error>
                                        <ErrorMessage name="bookName" />
                                        <ErrorMessage name="bookPrice" />
                                        <ErrorMessage name="bookCategory" />
                                        <ErrorMessage name="bookDescription" />
                                    </FormHelperText>

                                    <br />
                                    <br />
                                    <div >
                                        <Button
                                            type="submit"
                                            className="pink-btn btn"
                                            variant="contained"
                                            disableElevation
                                            sx={{
                                                ":hover": {
                                                    bgcolor: "#008094",
                                                    color: "white"
                                                }
                                            }}
                                        >
                                            ADD
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

export default AddBook
