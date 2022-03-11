import React,{useEffect,useState} from 'react'
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import Pagination from './Pagination';

function Demo() 
{

    const [AllProducts, setAllProducts] = useState([]);
    let [CartItems,setCartItems] = useState(0)
    let [ProductsOrdered,setProductOrdered] = useState(JSON.parse(localStorage.getItem('ProductsOrdered'))||[])
    let navigate = useNavigate()
    let [Sort,setSort] = useState('Default')
    let [ItemsPerPage,setItemsPerPage] = useState(5)

    const fetchData = async() =>
    {
        let response = await axios.get("http://interviewapi.ngminds.com/api/getAllProducts");
        console.log(response.data.products);
        // setAllProducts(response.data.products);
        setCartItems(JSON.parse(localStorage.getItem("cart"))||0)

        let temp = response.data.products.slice(0,ItemsPerPage)
        console.log(temp);
        setAllProducts(temp)
    }

    useEffect(() => 
    {
        fetchData()
    }, [])
    console.log(Sort)

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

    console.log(CartItems);

    const sortProduct = (value) =>
    {
        setSort(value)

        if(value==='Low to High')
        {
                AllProducts.sort(function(a,b){
                    return a.price - b.price
                })   
        }
        else if(value === 'High to Low')
        {
            AllProducts.sort(function(a,b){
                return b.price - a.price
            }) 
        }
        else
        {
            fetchData()
        }
        console.log(AllProducts);

    }

    const quantity = (value) =>
    {
        setItemsPerPage(value)
        let temp = AllProducts.slice(0,5)
        console.log(temp);
        setAllProducts(temp)
    }
    
    return (
                <div className="container">
                    <Navbar  />

                    <div className="row">
                        <div className="col-sm-12">
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

                    <div className="row">
                        {AllProducts.map((product) => (
                        <div className="col-md-3" key={product._id}>
                            <div className="bg-info">
                            <img
                                src={`http://interviewapi.ngminds.com/${product.image}`}
                                alt="img not found"
                                width="100"
                                height="200"
                            />
                            console.log(product);
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
                                {/* <Pagination
                                    data={AllProducts}
                                    // RenderComponent={Demo}
                                    title="Posts"
                                    pageLimit={5}
                                    dataLimit={10}
                                /> */}
                                </div>
                            </div>
                            <div className="col-sm-6 text-right">
                                <div style={{margin:'25px 0px'}}>
                                    <label className="control-label">Items Per Page : </label>
                                    <select value={ItemsPerPage} onChange={(e)=>quantity(e.target.value)}>
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