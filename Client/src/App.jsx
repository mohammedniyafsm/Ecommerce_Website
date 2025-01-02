import Navbar from "./Component/User/Navbar";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/User/Home";
import Login from "./Component/User/Login-Signup/Login";
import Signup from "./Component/User/Login-Signup/CreateAccount";
import EmailOtp from "./Component/User/Login-Signup/EmailOtp";
import AdminHome from "./Pages/Admin/Homeadmin";
import Navbaradmin from "./Component/Admin/Navbaradmin";
import Cart from "./Pages/User/Cart";
import SingleProduct from "./Pages/User/SingleProduct";
import Account from './Component/User/Account';


function App() {
  return ( 
    <Router>
    <Navbar/>
    {/* <Navbaradmin/> */}
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<Login />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/emailVerification" element={<EmailOtp/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/productView" element={<SingleProduct/>}/>
    <Route path="/account" element={<Account/>}/>




    {/* admin pages */}
    <Route path="/adminHome" element={<AdminHome />} />
    </Routes>
    </Router>
   
  );
}

export default App;
