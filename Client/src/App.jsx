import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from "./Pages/User/Home";
import UserLogin from './Pages/User/UserLogin';
import Signup from './Pages/User/Signup';
import EmailOtp from "./Component/User/Login-Signup/EmailOtp";
import AdminHome from "./Pages/Admin/Homeadmin";
import Cart from "./Pages/User/Cart";
import SingleProduct from "./Pages/User/SingleProduct";
import Account from './Component/User/Account';
import AllProduct from './Pages/Admin/AllProduct';


function App() {
  return ( 
    <Router>
    <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<UserLogin />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/emailVerification" element={<EmailOtp/>}/>
    <Route path="/cart" element={<Cart/>}/>
    <Route path="/productView/:id" element={<SingleProduct/>}/>
    <Route path="/account" element={<Account/>}/>

    {/* admin pages */}
    <Route path="/adminHome" element={<AdminHome />} />
    <Route path="/products" element={<AllProduct />} />
    </Routes>
    </Router>
   
  );
}

export default App;
