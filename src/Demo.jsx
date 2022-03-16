import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from './Pagination';

function Demo() 
{

    const [AllProducts, setAllProducts] = useState([]);
    // let [CartItems,setCartItems] = useState(0)
    let [ProductsOrdered,setProductOrdered] = useState(JSON.parse(localStorage.getItem('ProductsOrdered'))||[])
    let navigate = useNavigate()
    let [Sort,setSort] = useState('Default')
    let [ItemsPerPage,setItemsPerPage] = useState(5)
    const [currentPage, setCurrentPage] = useState(1);
    let [currentItems,setcurrentItems] = useState([])
   

    const fetchData = async() =>
    {
        let response = await axios.get("http://interviewapi.ngminds.com/api/getAllProducts");
        // console.log(response.data.products);
        setAllProducts(response.data.products);
        
    }

     // Get current posts
    const indexOfLastItem = currentPage * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    currentItems = AllProducts.slice(indexOfFirstItem, indexOfLastItem);

    useEffect(() => 
    {
        fetchData()
        
    }, [])
   
    useEffect(()=>
    {
        setCurrentPage(1)
    },[ItemsPerPage])

    //-------------------------------------Add to cart function---------------------
    const AddtoCart = (product) =>
    {
    
      if(ProductsOrdered.length===0)
      {
        ProductsOrdered.push({
            
                productID: product._id,
                qty:1,
                price: product.price,
                total: product.price,
                name : product.name,
                image : product.image
            })
      }
      else
      {
                let temp = 'not same'
                ProductsOrdered.map(localproductsOrder =>
                {
                    if(localproductsOrder.productID === product._id)
                    {
                        localproductsOrder.qty = localproductsOrder.qty + 1
                        localproductsOrder.total = localproductsOrder.total * localproductsOrder.qty
                        temp = 'same'
                    }
                  
                })
                if(temp === 'not same')
                {
                    ProductsOrdered.push({
                    productID: product._id,
                    qty:1,
                    price: product.price,
                    total: product.price,
                    name : product.name,
                    image : product.image
                    })
                }
      }
      localStorage.setItem('ProductsOrdered',JSON.stringify(ProductsOrdered))
      navigate("/cart", { state: product });
    }


    //------------------------for sorting according to price of product------------
    const sortProduct = (value) =>
    {
        setSort(value)
        if(value==='Low to High')
        {
            AllProducts = AllProducts.sort(function(a,b){
                    return a.price - b.price
                })   
        }
        else if(value === 'High to Low')
        {
            AllProducts = AllProducts.sort(function(a,b){
                return b.price - a.price
            }) 
        }
        else
        {
            fetchData()
        }
        // setAllProducts(AllProducts)
    }
    console.log(AllProducts);

    //-----------------------Change page---------------------------------------
    const paginate = pageNumber => 
    {
        setCurrentPage(pageNumber)
    }

    const previousPage = () =>
    {
      setCurrentPage(currentPage-1) 
      
    }

    const nextPage = () =>
    {
        
        setCurrentPage(currentPage+1) 
    }

    return (
                <div className="container">
                    <Navbar  />

                    <div className="row">
                        <div className="col-sm-12 text-left">
                            <div style={{margin:'25px 0px'}}>
                                <label className="control-label">Sort by:</label>
                                <select value={Sort} onChange={(e)=>sortProduct(e.target.value)}>
                                    <option value="Default">Default</option>
                                    <option value="High to Low">High to Low</option>
                                    <option value="Low to High">Low to High</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row m-5">
                        {currentItems.map((product,index) => (
                        <div className="col-md-3" key={product._id}>
                            <div className={`${index %4===0 && 'bg-info'} ${index%4===1 && 'bg-success'} ${index%4===2 && 'bg-warning'} ${index%4===3 && 'bg-danger'}`}>
                            <div style={{paddingRight:'180px'}}>
                            <img
                                src={`http://interviewapi.ngminds.com/${product.image}`}
                                alt="img not found"
                                width="100"
                                height="200"
                            />
                            </div>
                            <p>{product.name}</p>
                            <p>
                                <i className="fa fa-inr"></i>
                                {product.price}
                            </p>
                            <a className="btn btn-warning" onClick={() => AddtoCart(product)}>
                                Add to Cart
                            </a>
                            </div>
                            <hr></hr>
                        </div>
                        ))}
                    </div>

                    <div className='row'>
                            <div className="col-sm-6 text-left">
                                <div style={{margin:'25px 0px'}}>
                                <Pagination
                                   ItemsPerPage={ItemsPerPage}
                                   totalItems={AllProducts.length}
                                   paginate = {paginate}
                                   currentPage = {currentPage}
                                   previousPage = {previousPage}
                                   nextPage = {nextPage}
                                />
                                </div>
                            </div>
                            <div className="col-sm-6 text-right">
                                <div style={{margin:'25px 0px'}}>
                                    <label className="control-label">Items Per Page : </label>
                                    <select value={ItemsPerPage} onChange={(e)=>setItemsPerPage(e.target.value)}>
                                        <option value="5">5</option>
                                        <option value="10">10</option>
                                        <option value="25">25</option>
                                        <option value="50">50</option>
                                    </select>
                                </div>
                            </div>
                    </div>
                        
                    
                    
                </div>
    )
}

export default Demo