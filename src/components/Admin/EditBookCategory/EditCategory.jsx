import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom";
// import './userinfo.css'
import { Button, TextField, Typography } from '@mui/material'
import { Form, Formik } from 'formik'
import { toast } from 'react-toastify';
import categoryService from '../../../services/categoryService';
import Cookies from 'js-cookie';

const EditUser = () => {

    const [editCategoryId, setEditCategoryId] = useState();
    const [editCategoryName, setEditCategoryName] = useState();

    useEffect(() => {

        setEditCategoryId(Cookies.get("categoryId"))
        setEditCategoryName(Cookies.get("categoryName"))

    }, []);



    const handleSubmit = async (values) => {

        if (!values.categoryId) {
            values.categoryId = editCategoryId;
        }
        if (!values.categoryName) {
            values.categoryName = editCategoryName;
        }


        const payload = {
            "id": editCategoryId,
            "name": values.categoryName,
        };
        console.log(payload);

        await categoryService.EditCategory(payload).then(res=>{
            toast.success("Category Edited Sucsessfully", { position: "top-right" })
            navigate("/categoriesinfo")
        })
        .catch((error) => {
            toast.error("Something Went Wrong!!!", { position: "top-right" })
                console.log(error)
        })

    };



    const navigate = useNavigate();

    return (
        <div id='addbook-main-container'>

            < Typography variant="h3" ><u>Edit Category</u></Typography>
            <br /> <br />

            <div id="addbook-container">
                <Formik
                    initialValues={{ categoryName: "", categoryId: "", }}
                    // validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, setFieldValue, errors, handleBlur }) => {
                        console.log(errors);
                        return (
                            <Form >
                                <div id="addbook-components">
                                    <h2>Category Id : </h2>
                                    <TextField

                                        disabled
                                        id="categoryId"
                                        name="categoryId"
                                        variant='outlined'
                                        value={editCategoryId}
                                        sx={{
                                            width: 150,
                                        }
                                        }
                                    />
                                    <br />
                                    <br />

                                    <h4>Category Name : {editCategoryName}</h4>

                                    <TextField
                                        defaultValue={editCategoryName}
                                        id="categoryName"
                                        label="Category Name"
                                        name="categoryName"
                                        variant='outlined'
                                        value={values.categoryName}
                                        error={errors.categoryName}
                                        onChange={(e) => setFieldValue("categoryName", e.target.value)}
                                        onBlur={handleBlur}
                                        sx={{
                                            width: 400,
                                        }
                                        }
                                    />

                                    <br />
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
                                            Make Changes
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

export default EditUser
