// import './App.css';
import {
  Routes,
  Route,
  useNavigate,
  BrowserRouter
} from 'react-router-dom'
import Home from './components/Home/Home';
import Signin from './components/Signin/Signin';
import Signup from './components/Signup/Signup';
import Navbar from './components/Navbar/Navbar'
import { isUserLoggedIn } from './reducers/authReducer';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getallProducts } from './reducers/productReducer';
// import { getTopics } from './reducers/homePageReducer';
import Notes from './components/Notes/Notes';
import Users from './components/Users/Users';

function App() {
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if(!auth.authenticate)
    {
      dispatch(isUserLoggedIn());
    }

    // fetching all the categories: if user is logged in
    // if(auth.authenticate)
    // {

    // }
  }, [auth.authenticate])
  
  return (
    <div className="App">
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} /> 
          <Route path='/notes' element={<Notes />} /> 
          <Route path='/signin' element={<Signin />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/users' element={<Users/>} /> 
        </Routes>
    </div>
  );
}

export default App;
