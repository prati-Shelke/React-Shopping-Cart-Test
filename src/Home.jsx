import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Home() 
{
  const [AllProducts, setAllProducts] = useState([]);
  let [CartItems,setCartItems] = useState(0)
  let [ProductsOrdered,setProductOrdered] = useState(JSON.parse(localStorage.getItem('ProductsOrdered'))||[])
  let navigate = useNavigate()

  useEffect(() => {
    async function fetchData() 
    {
      let response = await axios.get("http://interviewapi.ngminds.com/api/getAllProducts");
      console.log(response.data.products);
      setAllProducts(response.data.products);
      setCartItems(JSON.parse(localStorage.getItem("cart"))||0)
    }
    fetchData()
  }, [])
  // console.log(ProductsOrdered)
  

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

    return (
      <div className="container">
        <Navbar  />
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
                <br />
                <p>{product.name}</p>
                <p>
                  <i className="fa fa-inr"></i>
                  {product.price}
                </p>
                <a
                href
                  className="btn btn-warning"
                  onClick={() => AddtoCart(product)}
                >
                  Add to Cart
                </a>
              </div>
              <hr></hr>
            </div>
          ))}
          
        </div>
      </div>
    );
}

export default Home;
