import { Button, FormHelperText, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
// import React, {useEffect, useState } from 'react'
import './registration.css'
import { ErrorMessage, Form, Formik } from 'formik'
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import authService from '../../services/authService';


const Registration = () => {


  const navigate = useNavigate("/")

  const validationSchema = Yup.object().shape({
    userFirstName: Yup.string().min(3,"Enter Proper Name,"),
    userLastName: Yup.string().min(3,"Enter Proper Name,"),
    userEmail: Yup.string().matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter Proper Email, ")
    .required("Enter Email, "),
    userPassword: Yup.string().matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, "Enter Strong Password,").required("Enter Password,"),
    userRoleId: Yup.mixed().required("Select Role.")
  })

  const handleSubmit = async (values) => {

    const payload = {
      firstName: values.userFirstName,
      lastName: values.userLastName,
      email: values.userEmail,
      roleId: values.userRoleId,
      password: values.userPassword
    };

    await authService.Register(payload)
      .then((response) => {
        console.log("data added sucessfully");
        toast.success("Registration Sucsessful", { position: "top-right" });
        navigate("/")
      })
      .catch((error) => {
        toast.error("Invalid Details!!!", { position: "top-right" })
        console.log(error)
      })

  };

  return (
    <div id='registration-main-container'>

      < Typography variant="h2" >Registration</Typography>
      <br /> <br />

      <div id="registration-container">
        <Formik
          initialValues={{ userFirstName: "", userLastName: "", userRoleId: "", userEmail: "", userRole: "", userPassword: "", }}
          validationSchema={validationSchema}
          onSubmit={(values) => handleSubmit(values)}
        >
          {({ values, setFieldValue, errors, handleBlur }) => {
            // console.log(errors);
            return (
              <Form >
                <div id="registration-components">
                  <h2>Enter Your Details</h2>
                  <div id='registration-components-row'>
                    <h4>First Name</h4>
                    <h4>Last Name</h4>
                  </div>
                  <div id='registration-components-row'>
                    <TextField
                      id="userFirstName"
                      label="First Name"
                      name="userFirstName"
                      variant='outlined'
                      value={values.userFirstName}
                      error={errors.userFirstName}
                      onChange={(e) => setFieldValue("userFirstName", e.target.value)}
                      sx={{
                        width: 400,
                      }
                    }
                    onBlur={handleBlur}
                    />
                    <TextField
                      id="userLastName"
                      label="Last Name"
                      name="userLastName"
                      variant='outlined'
                      value={values.userLastName}
                      error={errors.userLastName}
                      onChange={(e) => setFieldValue("userLastName", e.target.value)}
                      sx={{
                        width: 400,
                      }
                    }
                    onBlur={handleBlur}
                    />

                  </div>

                  <div id='registration-components-row'>
                    <h4>Email</h4>
                    <h4>Password</h4>
                  </div>
                  <div id='registration-components-row'>

                    <TextField
                      id="userEmail"
                      label="Email"
                      name="userEmail"
                      variant='outlined'
                      value={values.userEmail}
                      error={errors.userEmail}
                      onChange={(e) => setFieldValue("userEmail", e.target.value)}
                      sx={{
                        width: 400,
                      }
                    }
                    onBlur={handleBlur}
                    />
                    <TextField
                      id="userPassword"
                      label="Password"
                      name="userPassword"
                      variant='outlined'
                      value={values.userPassword}
                      error={errors.userPassword}
                      onChange={(e) => setFieldValue("userPassword", e.target.value)}
                      sx={{
                        width: 400,
                      }
                    }
                    onBlur={handleBlur}
                    />

                  </div>
                  <InputLabel id="Role" />
                  <h4>Role</h4>
                  <br />
                  <Select
                    variant='standard'
                    id="userRoleId"
                    labelId="Role"
                    name="userRoleId"
                    value={values.userRoleId}
                    error={errors.userRoleId}
                    onChange={(e) => setFieldValue("userRoleId", e.target.value)}
                    sx={{
                      width: 400,
                    }}
                    onBlur={handleBlur}
                    >
                    <MenuItem value={2}>Seller</MenuItem>
                    <MenuItem value={3}>Buyer</MenuItem>
                  </Select>

                </div>
                    <div className='error'>
                      <FormHelperText error>
                        <ErrorMessage name="userFirstName" />
                        <ErrorMessage name="userLastName" />
                        <ErrorMessage name="userEmail" />
                        <ErrorMessage name="userPassword" />
                        <ErrorMessage name="userRoleId" />
                      </FormHelperText>
                    </div>
                <div >
                  <br />
                  <Button
                    type="submit"
                    className="pink-btn btn"
                    variant="contained"
                    sx={{
                      ":hover": {
                        bgcolor: "#008094",
                        color: "white"
                      }
                    }}
                  >
                    Register
                  </Button>
                  <br />
                  <br />
                  <br />

                </div>

              </Form>
            )
          }}
        </Formik>
      </div>
    </div>
  )
}
export default Registration