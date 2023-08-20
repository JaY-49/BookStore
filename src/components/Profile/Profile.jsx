import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext';
import './profile.css'
import { IconButton } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import CategoryIcon from '@mui/icons-material/Category';
import ContactPageIcon from '@mui/icons-material/ContactPage';
import { useNavigate } from 'react-router-dom';

const Profile = () => {

  const Details = useContext(AuthContext);

  const user = useContext(AuthContext);
  const logout = () => {
    user.signOut();
    navigate("/login")
  }

  const navigate = useNavigate();

  return (
    <div id='main-container'>
      <div id="profile-container">
        <h1>Profile</h1>
        <h2>Your Details</h2>
        <br />
        <h2>Email:</h2>
        <h2>{Details.user.email}</h2>
        <br />
        <h2>Username:</h2>
        <h2>{Details.user.firstName}</h2>
        <br />
        <h2>Role:</h2>
        <h2>{Details.user.role}</h2>
        <br />

        <div id='admin-tools'>

          {Details.user.role !== "buyer" && (
            <div>
              <h1>EditBooks</h1>
              <a href='/booksinfo'>
                <IconButton
                  aria-label="EditBooks"
                  size="large"
                  sx={{ color: "coral" }}
                >
                  <LibraryBooksIcon sx={{ fontSize: 45 }} />
                </IconButton>
              </a>
            </div>)}


          {Details.user.role === "admin" && (
            <div>
              <h1>EditUsers</h1>
              <a href="/usersinfo">
                <IconButton
                  aria-label="EditUsers"
                  size="large"
                  sx={{ color: "coral" }}
                >
                  <AdminPanelSettingsIcon sx={{ fontSize: 45 }} />
                </IconButton>
              </a>
            </div>)}


          {Details.user.role === "admin" && (
            <div>
              <h1>Edit Categroies</h1>
              <a href="/categoriesinfo">
                <IconButton
                  aria-label="EditCategories"
                  size="large"
                  sx={{ color: "coral" }}
                >
                  <CategoryIcon sx={{ fontSize: 45 }} />
                </IconButton>
              </a>
            </div>)}

          <div>
            <h1>Edit Profile</h1>
            <a href="/editprofile">
              <IconButton
                aria-label="Edit Profile"
                size="large"
                sx={{ color: "coral" }}
              >
                <ContactPageIcon sx={{ fontSize: 45 }} />
              </IconButton>
            </a>
          </div>

          <div>
            <h1>Logout</h1>
            <a href="/login">
              <IconButton
                aria-label="LogOut"
                size="large"
                sx={{ color: "coral" }}
                onClick={logout}
              >
                <LogoutIcon sx={{ fontSize: 45 }} />
              </IconButton>
            </a>
          </div>
        </div>
        <br />
      </div>
    </div >
  )
}

export default Profile
