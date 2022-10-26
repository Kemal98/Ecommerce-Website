import React, { useEffect, useState } from 'react'
import NavBar from './NavBar/NavBar'
import Products from './components/ListProducts/Products'
import { auth, fs } from './Config/Config';
import { useNavigate } from 'react-router-dom';
import './App.css'
import Cart from './Carousel/Cart';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from './components/Footer';
import { MDBIcon } from 'mdb-react-ui-kit';
import Header from './Carousel/Header';
import TopBar from './components/TopBar';
import FeaturesList from './components/FeaturesList';
import Payment from './components/Payment';
import PaginationFunction from './Pagination/PaginationFunction';
import EmailSend from './sendEmail/EmailSend';
import NavBarTwo from './NavBar/NavBarTwo';
import SearchProducts from './components/SearchProducts';
import ChatBox from './SupportChat/ChatBox/ChatBox';
// import {io} from "socket.io-client";

// const socket = io.connect("http://localhost:3001");

const Home = () => {
const navigate = useNavigate();

function GetUserId () {
    const[uid, setUid] = useState(null)
    useEffect(() => {
      auth.onAuthStateChanged(user => {
        if(user) {
          setUid(user.uid)
        }
      })
    }, [])
    return uid
  };


  const uuid = GetUserId()
  
  const GetCurrentUser = () => {
    const [user,setUser] = useState(null)
     console.log(user)
     useEffect(()=> {
      auth.onAuthStateChanged(user => {
        if(user) {
         fs.collection('users').doc(user.uid).get().then(snapshot => {
          setUser(snapshot.data().fullName);
         }) 
        }
        else {
          setUser(null)
        }
      })
    }, [])
    return user;
  };
  
const user = GetCurrentUser();

  // Products in stoock
  const [products, setProducts] = useState([]);
  const [productUpdate, setProductUpdata] = useState([])
  const [productFilter, setProductFilter] = useState([])

  const getProduct = async () => {
   const products = await fs.collection('Products').get()
   const productArray = []
   for(const snap of products.docs) {
    const data = snap.data();
    data.ID = snap.id
    productArray.push({
      ...data
    })

    if(productArray.length === products.docs.length) {
      setProducts(productArray)
      setProductUpdata(productArray)
      setProductFilter(productArray)
    }
   }
  }
 useEffect(() => {
  getProduct();
 },[])


 

 

//  Filter product

const filterMark = (item) => {
  const result = productUpdate.filter((curentData) => {
    return curentData.category === item
  })
  
  setProducts(result)
  if(item == 'All') {
    setProducts(productUpdate)
  }
}


const filterClear = (item) => {
  if(item == 'ClearFilter') {
    setProducts(productUpdate)
  }
}

// search product||
const [search, setSearch] = useState('');
const [valuePrice, setValuePrice] = useState();


const priceValue = (price) => {
  setValuePrice(price)
  const result = productUpdate.filter((curentData) => {
    return curentData.price <= price  
  })
  setProducts(result)
} 



const value = search.length
useEffect(() => {
  if(value < 1) {
    setProducts(productUpdate)
  } 
},[value])

 const SearchProduct = (e) => {
      e.preventDefault();
      setProducts(products.filter((product) => 
      product.description.toLowerCase().includes(search.toLowerCase()) 
    ))
 }



 const [alertCart, setAlertCart] = useState(false)
 let Product;
 const addToCart = (prodcut) => {

    if(uuid !== null ){
       Product=prodcut
       Product['qty'] = 1;
       Product['TotalProductPrice']=Product.qty*Product.price;
       fs.collection('Cart'+ uuid).doc(prodcut.ID).set(Product).then(() => {
          console.log('add product')
          console.log(prodcut)
          
          toast.success('Product added to cart', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            });
       })
      
    }
    else {   
      toast.error('No login!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        });

      setTimeout(() => {
         navigate({ pathname: '/login' })
      }, 3000);
     
    }
 }; 

 const [totalProduct, setTotalProduct]= useState(0);
 console.log(totalProduct)

 useEffect(() =>{
  auth.onAuthStateChanged(user => {
    if(user){
      fs.collection('Cart' + user.uid).onSnapshot(snapshot => {
        const qty = snapshot.docs.length
        setTotalProduct(qty)
      })
      }
    })
  }, [])


// pagination 
const [currentPage, setCurrentPage] = useState(1);
const [postsPerPage] = useState(3);

const indexOfLastPost = currentPage * postsPerPage;
const indexOfFirstPost = indexOfLastPost - postsPerPage;

const currentPosts = products.slice(indexOfFirstPost, indexOfLastPost);

const paginate = (pageNumber) => {

  setCurrentPage(pageNumber)
};
// end pagination
const pageNumbers = []


// locaction href
const locationHref = () => {
  window.location.href = 'https://www.aliexpress.com/w/wholesale-drone.html'
}
const text = 'In addition to mobile phones, we also offer mp3 devices, navigation devices, cameras, laptops'
 



return (
  <> 
    <div>
    {user === null || user === "Admin"  ?  "" : 
      <EmailSend user={user} socket={"socket"}/>}
       <ToastContainer/>
        <TopBar/>
         <NavBar user={user}  uuid={uuid}   alertCart={alertCart}  totalProduct={totalProduct}/>
          <NavBarTwo/>
           <Header/>
            <Payment/>
             <FeaturesList/>
              {products.length > 0 && (
               <div id='stock' className='container-fluid cart_'>
                <h2>Products in stock</h2>
                <div className='search_products'>
                {alertCart && (<div className='addCart'><p>Add TO Cart</p></div>)}
                {/* Filter product */}
                <form onSubmit={(e) =>{SearchProduct(e)}}>
                <div class="form">
                  <input onChange={(e) => {setSearch(e.target.value)}} type="text" class="search__input" placeholder="Type your text"/>
                   <button  type='submit' class="search__button">
                    <svg class="search__icon" aria-hidden="true" viewBox="0 0 24 24">
                         <g>
                        <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"></path>
                        </g>
                     </svg>
                   </button>
                 </div>
               </form>
             </div>
             <div className='filter-product'>
              <div>
                <div className='filter'>  
                <ul> 
                 <h5>Category:</h5>    
                <li>
                <a onClick={() => filterMark('All')} className='hover-animation'>All</a>
               </li>
              <li>
                <a onClick={() => filterMark('Computer')} className='hover-animation'>Computer</a>
              </li>
              <li>
                <a onClick={() => filterMark('Phone')} className='hover-animation'>Phone</a>
              </li>
              <li>
                <a onClick={() => filterMark('Dron')} className='hover-animation'>Dron</a>
              </li>

          <label for="name">Price:</label>
            <span>{valuePrice}$</span>
             <input onClick={(e) => priceValue(e.target.value)} type="range"  name="name" required min='350' max='3000'></input>
              <button className='clearFilter' type='button' onClick={() => filterClear('ClearFilter')} >Clear Filter</button>
            </ul>
                </div>
             </div>
               <div id='product' style={{margin:'auto' }} className="row row-cols-1 g-4">
                    {/* filter product */}
                  <Products user={user} addToCart={addToCart} products={currentPosts} alertCart={alertCart} />
                </div>
             </div>
             {/* pagination */}
             <div className="clarfix">
                 <div className="hint-text">Showing <b>{currentPage}</b> out of <b>{products.length}</b> entries</div>
                    <ul className="pagination">
                     <li className={`${currentPage === 1 ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                     onClick = { () => setCurrentPage((prev) => prev === 1 ? prev : prev - 1)}>Previous</a></li>
                    <PaginationFunction
                     postsPerPage={postsPerPage}
                     totalPosts={products.length}
                     pageNumbers={pageNumbers}
                     paginate={paginate}
                   />
                 <li className={`${currentPage === pageNumbers.length ? 'page-item disabled' : 'page-item' }`}><a href="#!"
                onClick = { () => setCurrentPage((next) => next === pageNumbers.length ? next : next + 1)}>Next</a></li>
            </ul>
        </div>
      </div>
        )}
          <Payment text={text}/>
          <div id='action' className='container-fluid paralax'>
           <div className='palarax-container'>
           <h3>The action on drone matrix lasts until September 20, 2022</h3>
           <button className='tehno_shop_btn' onClick={locationHref}>BUY</button>
          </div>
          </div>
           <div id='our'className='container-fluid slider'>
          <Cart />
        </div>

        {products < 1 &&(""
        //  <div className='container'>
        //  </div> 
        )}
          
  
         <div id='info'>
          <Footer />
         </div>
    </div> 
    
    </>
  )
  

}

export default Home