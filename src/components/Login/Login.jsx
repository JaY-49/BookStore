import React, { useContext } from "react";
import './login.css';
import {
  // Breadcrumbs,
  Button,
  // List,
  // ListItem,
  Typography,
  // Link,
  TextField,
  FormHelperText,
  // Alert
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Formik, Form } from "formik";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import authService from "../../services/authService";
import Cookies from "js-cookie";
import { AuthContext } from "../../context/AuthContext";

const Login = () => {

  const navigate = useNavigate();
  const userContext = useContext(AuthContext)

  const validationSchema = Yup.object().shape({
    password: Yup.string().min(8, "Enter valid Password.").required("Enter Valid Password."),
    email: Yup.string()
      .matches(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/, "Enter valid Email.")
      .required("Enter valid Email."),
  })

  const handleSubmit = async (values) => {

    const payload = {
      "email": values.email,
      "password": values.password,
    };

    await authService.Login(payload).then(response => {
      console.log("data added sucessfully");
      toast.success("Login Sucsessful", { position: "top-right" })
      navigate("/home")
      Cookies.set("auth_email", values.email)
      userContext.setUser(response.data.result)
    })
      .catch((error) => {
        toast.error("Invalid Details!!!", { position: "top-right" })
        console.log(error)
        // console.log(payload)
      })
  }


  return (

    <div id="container">

      < Typography variant="h1" >Login or Creat An Account</Typography> <br /> <br />
      <div id="block">
        <div id="components">
          <div >

            < Typography variant="h2">New Customer</Typography><br />
            <p>Registration is free and easy.</p><br />

            <ol id="List">
              <li>Faster checkout</li>
              <li>Save multiple shipping addresses</li>
              <li>View and track orders and more </li>
            </ol>
          </div>
          <div >
            <Button
              className="pink-btn btn"
              variant="contained"
              color="primary"
              sx={{
                ":hover": {
                  bgcolor: "#008094",
                  color: "white"
                }
              }}
              onClick={() => {
                navigate("/Registration")
              }}
            >
              Create An Account
            </Button>
          </div>
        </div>

        <div id="components">

          <Typography variant="h2" > Registered Customers </Typography>
          <p>Already have account? Please Login</p>
          <br />

          <Formik
            initialValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={(values) => handleSubmit(values)}
          >
            {({ values, setFieldValue, errors, handleBlur }) => {
              console.log(errors);
              return (
                <Form id="form">

                  <div >
                    <div id="block">
                      <TextField
                        id="email"
                        label="Enter Email"
                        name="email"
                        variant='filled'
                        value={values.email}
                        error={errors.email}
                        onChange={(e) => setFieldValue("email", e.target.value)}
                        onBlur={handleBlur}
                      />

                    </div>

                    <div id="block">
                      <TextField
                        id="password"
                        label="Enter Password"
                        name="password"
                        type="password"
                        variant='filled'
                        value={values.password}
                        error={errors.password}
                        onChange={(e) => setFieldValue("password", e.target.value)}
                        onBlur={handleBlur}
                      />
                    </div>
                    <FormHelperText error>
                      <ErrorMessage name="email" />
                      <ErrorMessage name="password" />
                    </FormHelperText>

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
                        }}
                      >
                        Login
                      </Button>
                    </div>
                  </div>
                </Form>
              )
            }}
          </Formik>
        </div>
      </div>
    </div>
  );
};
export default Login;
