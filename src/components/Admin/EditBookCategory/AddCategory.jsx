import React from 'react'
// import './addbook.css'
import { Button,  FormHelperText,  TextField,  Typography, } from '@mui/material'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import categoryService from '../../../services/categoryService';
import { useNavigate } from 'react-router-dom';


const AddCategory = () => {

    const navigate = useNavigate();
    
    const validationSchema = Yup.object().shape({
        categoryName: Yup.string().required("Enter Category Name, "),
    })

    const handleSubmit = async (values) => {

        const payload = {
            "name": values.categoryName,
        };
        console.log(payload);

        await categoryService.AddCategory(payload).then((response) => {
            toast.success("Category Added Sucsessful", { position: "top-right" })
            navigate("/categoriesinfo")
        })
            .catch((error) => {
                toast.error("Something Went Wrong!!!", { position: "top-right" })
                console.log(error)
            })
    };

    return (
        <div id='addbook-main-container'>

            < Typography variant="h3" ><u>Add Category</u></Typography> <br /> <br />

            <div id="addbook-container">

                <Formik
                    initialValues={{ categoryName: "" }}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values)}
                >
                    {({ values, setFieldValue, errors, handleBlur }) => {
                        console.log(errors);
                        return (

                            <Form >
                                <div id="addbook-components">
                                    
                                <br/>
                                        <br/>
                                        <br/>
                                        <br/>
                                        <TextField
                                            id="categoryName"
                                            label="Enter Name of Category"
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

                                    <FormHelperText error>
                                        <ErrorMessage name="categoryName" />
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
                                        <br/>
                                        <br/>
                                        <br/>
                                        <br/>
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

export default AddCategory