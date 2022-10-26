import React, { useState } from 'react'
import {fs,storage} from '../../Config/Config'
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddProducts = () => {
    const navigate = useNavigate()

    const [category, setCategory] = useState('')
    const [title,setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [priceBefore, setPriceBefore] = useState('')
    const [image, setImage] = useState(null);

    const[imageError, setImageError] = useState('')

    const [successMsg,setSucccessMsg] = useState('');
    const [uploadError, setUploadError] = useState('');

    const types = ['image/jpg','image/jpeg','image/png','image/PNG']

    const handleProductImg = (e) => {
       let selectedFile = e.target.files[0]
       if(selectedFile) {
            if(selectedFile&&types.includes(selectedFile.type)) {
                  setImage(selectedFile)
                  setImageError('')
            }
            else {
                setImage(null)
                setImageError('Please select a valid image file type (png or jpg)')
            }
       }
        else {
        console.log('Please select file')
       }
    }

    const handleAddProducts = (e) => {
       e.preventDefault()
        const uploadTask = storage.ref(`product-image/${image.name}`).put(image)
        uploadTask.on('state_changed', snapshot => {
             const progress = (snapshot.bytesTransferred/snapshot.totalBytes)* 100
            },error => setUploadError(error.message),() => {
            storage.ref('product-image').child(image.name).getDownloadURL().then(url => {
                fs.collection('Products').add({
                    title,
                    description,
                    category,
                    price:Number(price),
                    priceBefore:Number(priceBefore),
                    url
                }).then(() => {
                    document.getElementById('file').value = '';
                    toast.success('Product added to balance!', {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                        });
                    setTimeout(() => {
                        setSucccessMsg('')
                        navigate({ pathname: '/' })
                    }, 3000);
                }).catch(error => setUploadError(error.message))
            })
            }
         )
        }
        
     
  return (
    <div className='container_add_product'>
  <ToastContainer
position="top-right"
autoClose={3000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
/>

            <br></br>
            <br></br>
            <h2>Add Products</h2>
            <hr></hr>        
            {successMsg&&<>
                <div className='success-msg'>{successMsg}</div>
                <br></br>
            </>} 
            <form autoComplete="off" className='form-group' onSubmit={handleAddProducts}>
                <label>Product Title</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setTitle(e.target.value)} value={title}></input>
                <br></br>
                <label>Product Description</label>
                <input type="text" className='form-control' required
                onChange={(e)=>setDescription(e.target.value)} value={description}></input>
                <br></br>
                <label>Product Price</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setPrice(e.target.value)} value={price}></input>
                <br></br>
                <label>Price before discount</label>
                <input type="number" className='form-control' required
                onChange={(e)=>setPriceBefore(e.target.value)} value={priceBefore}></input>
                <br></br>

                
                
                <label>Upload Product Image</label>
                <input type="file" id="file" className='form-control' required onChange={handleProductImg}></input>
                
                <label for="cars">Category:</label>
                 <select className='form-control' onChange={(e)=>setCategory(e.target.value)} name="cars">
                   <option value="Phone">Phone</option>
                   <option value="Computer">Computer</option>
                   <option value="Dron">Dron</option>
                   <option value="Photo">Photo</option>
                </select>
             
                {imageError&&<>
                    <br></br>
                    <div className='error-msg'>{imageError}</div>
                   
                </>}
                <br></br>           
                <div style={{display: "flex", justifyContent: "center", flexDirection: "column"}}>
                    <button type="submit" className='btn btn-success btn-md'>
                        SUBMIT
                    </button>
               <span><Link to='/'> Return me to the home page</Link></span>  

                </div>
            </form>
            {uploadError&&<>
                    <br></br>
                    <div className='error-msg'>{uploadError}</div>
                    
                </>}

        </div>
  )
}

export default AddProducts