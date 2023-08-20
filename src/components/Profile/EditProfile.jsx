import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const EditProfile = () => {

  const navigate = useNavigate();

  const Profile = useContext(AuthContext);
  console.log(Profile.user.id)

  Cookies.set("userId" , (Profile.user.id))
  Cookies.set("userFirstName" , (Profile.user.firstName))
  Cookies.set("userLastName" , (Profile.user.lastName))
  Cookies.set("userEmail" , (Profile.user.email))
  Cookies.set("userRoleId" , (Profile.user.roleId))
  Cookies.set("userRole" , (Profile.user.role))
  Cookies.set("userPassword" , (Profile.user.password))
  navigate('/edituser')
  
  return (
    <div>
      
      


      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  )
}

export default EditProfile