import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home';
import SignUp from './components/LoginandSignup/SignUp'
import Login from './components/LoginandSignup/Login'
import NotFound from './components/NotFound';
import AddProducts from './components/AdminAddToCart/AddProducts';
import MyBasket from './components/MyBasket/MyBasket';
import About from './components/About';
import AdminPage from './SupportChat/AdminChat/AdminPage';
import ClientPage from './SupportChat/ClientChat/ClientPage';
import OrederProducts from './components/OrderProducts/OrederProducts';

function App() {
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home/>}/>
          <Route path='/signup' element={<SignUp/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/add-products' element={<AddProducts/>}/>
          <Route path='/cart'element={<MyBasket/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/admin' element={<AdminPage/>}/>
          <Route path='/client' element={<ClientPage/>}/>
          <Route path='/order-products' element={<OrederProducts/>}/>
          <Route path='/*' element={<NotFound/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
