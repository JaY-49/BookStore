import './App.css';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Navbar from './components/Navbar/Navbar';
import { ThemeProvider, createTheme } from '@mui/material';
import HomePage from './components/Body/Home/HomePage';
import About from './components/Body/About/About';
import PageNotFound from './components/Body/PageNotFound/PageNotFound';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Profile from './components/Profile/Profile';
import AuthWrapper from './context/AuthContext';
import Books from './components/Body/Books/Books';
import BooksInfo from './components/Admin/EditBooks/BooksInfo';
import UserInfo from './components/Admin/EditUsers/UserInfo';
import AddBook from './components/Admin/EditBooks/AddBook';
import EditBook from './components/Admin/EditBooks/EditBook';
import EditUser from './components/Admin/EditUsers/EditUsers';
import CategoriesInfo from './components/Admin/EditBookCategory/CategoriesInfo';
import AddCategory from './components/Admin/EditBookCategory/AddCategory';
import EditCategory from './components/Admin/EditBookCategory/EditCategory';
import EditProfile from './components/Profile/EditProfile';
import Cart from './components/Body/Cart/Cart';

function App() {

  // const name = 'Jay';

  const theme = createTheme({
    palette: {
      primary: {
        main: '#FF7F50',
      },
      secondary: {
        main: '#fff',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            backgroundColor: "coral",
          }
        }
      }
    }
  })

  return (
    <div>

      <ThemeProvider theme={theme}>

        <AuthWrapper >
          <Header />

          <Navbar />

          <div>
            <BrowserRouter>
              <ToastContainer />

              <div>
                <NavLink to='/' >    </NavLink>
                <NavLink to='/Registeration'>        </NavLink>
                <NavLink to='/Login'>        </NavLink>
                <NavLink to='/HomePage'>    </NavLink>
                <NavLink to='/Books'>    </NavLink>
                <NavLink to='/About'>        </NavLink>
                <NavLink to='/BooksInfo'>        </NavLink>
                <NavLink to='/AddBook'>        </NavLink>
                <NavLink to='/EditBook'>        </NavLink>
                <NavLink to='/UserInfo'>        </NavLink>
                <NavLink to='/EditUser'>        </NavLink>
                <NavLink to='/EditProfile'>        </NavLink>
                <NavLink to='/Profile'>        </NavLink>
                <NavLink to='/CategoriesInfo'>        </NavLink>
                <NavLink to='/EditCategory'>        </NavLink>
                <NavLink to='/Cart'>        </NavLink>
              </div>
              <Routes>
                <Route path='/registration' element={<Registration />} />
                <Route path='/login' element={<Login />} />
                <Route path='/' element={<Login />} />
                <Route path='/home' element={<HomePage />} />
                <Route path='/books' element={<Books />} />
                <Route path='/about' element={<About />} />
                <Route path='/profile' element={<Profile />} />
                <Route path='/booksinfo' element={<BooksInfo />} />
                <Route path='/editbook' element={<EditBook />} />
                <Route path='/addbook' element={<AddBook />} />
                <Route path='/usersinfo' element={<UserInfo />} />
                <Route path='/edituser' element={<EditUser />} />
                <Route path='/editprofile' element={<EditProfile />} />
                <Route path='/categoriesinfo' element={<CategoriesInfo />} />
                <Route path='/addcategory' element={<AddCategory />} />
                <Route path='/editcategory' element={<EditCategory />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/*' element={<PageNotFound />} />
              </Routes>

            </BrowserRouter>
          </div>

          <Footer />
        </AuthWrapper>

      </ThemeProvider>
    </div>
  )
}

export default App;