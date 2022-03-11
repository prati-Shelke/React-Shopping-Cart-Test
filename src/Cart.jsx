import React,{useEffect, useState} from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import Navbar from './Navbar'
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
toast.configure()

function Cart()
{
    let product = useLocation().state
    // let [Price,setPrice] = useState()
    // let [Quantity,setQuantity] = useState()
    // let [TotalAmount,setTotalAmount] = useState()
    let [ProductsOrdered,setProductsOrdered] = useState(JSON.parse(localStorage.getItem('ProductsOrdered'))||[])
    let navigate = useNavigate()


    const incrementQty = (e,ind) =>
    {
      e.preventDefault()
      ProductsOrdered[ind].qty += 1
      ProductsOrdered[ind].total = parseInt(ProductsOrdered[ind].total) + parseInt(ProductsOrdered[ind].price)
        
      console.log(ProductsOrdered);
      setProductsOrdered([...ProductsOrdered])
      localStorage.setItem('ProductsOrdered',JSON.stringify(ProductsOrdered))
    }

    const decrementQty = (e,ind) =>
    {
      e.preventDefault()
      ProductsOrdered[ind].qty -= 1
      ProductsOrdered[ind].total = parseInt(ProductsOrdered[ind].total) - parseInt(ProductsOrdered[ind].price)
      setProductsOrdered([...ProductsOrdered])
      localStorage.setItem('ProductsOrdered',JSON.stringify(ProductsOrdered))
    }

    const removeItem = (ind) =>
    {
        ProductsOrdered.splice(ind,1)
        setProductsOrdered([...ProductsOrdered])
        localStorage.setItem('ProductsOrdered',JSON.stringify(ProductsOrdered))
    }
    const placeOrder = () =>
    {
        let TotalAmount = 0
        ProductsOrdered.map(pro=>
          TotalAmount += pro.total
        )
        if(TotalAmount>500)
        {
          navigate('/place-order',{state:ProductsOrdered})
        }
        else
        {
          toast.error('Plz add more Items to place order',{ position: toast.POSITION.TOP_RIGHT, autoClose: 1500 , theme: "colored",hideProgressBar:true})
        }
    }

    const countinueShopping = () =>
    {
        navigate("/home");
    }


    return (
      <div className='container'>
        <Navbar />
        <div className="col-md-12">
          <div className="panel panel-default">
            <div className="panel-heading">MY CART ({ProductsOrdered.length})</div>
            {ProductsOrdered.length!==0 ? ProductsOrdered.map((product,ind) =>
            <div className="panel-body" key={product.productID}>
            
              <form>
                <div className="row">
                  <div className="col-md-3">
                    <img alt='not defined'
                      src={`http://interviewapi.ngminds.com/${product.image}`}
                      width="100px"
                      height="200px"
                    />
                  </div>
                  <div className="col-md-3">
                    {product.name}
                    <br />
                    <i className="fa fa-inr"></i>{product.price}
                  </div>
                  <div className="col-md-3">
                    
                    quantity
                    <br />
                    <button
                      ng-click="decrement()"
                      className="qtyminus"
                      ng-disabled="qty<=0"
                      onClick = {(e)=>decrementQty(e,ind)}
                      style={product.qty===1 ? {cursor:'not-allowed'} : {cursor:'pointer'}}
                      disabled = {product.qty===1 && true}
                    >
                      -
                    </button>
                    <input
                      ng-model="qty"
                      type="text"
                      name="quantity"
                      style={{width:'150px'}}
                      className="qty"
                      size="5px"
                      value={product.qty}
                      onChange={()=>''}
                    />
                    <button ng-click="increment()" onClick={(e)=>incrementQty(e,ind)}>+</button>
                  </div>
                  <div className="col-md-3">
                    {" "}
                    <a className="btn btn-warning" onClick={()=>removeItem(ind)}>
                      remove
                    </a>
                  </div>
                </div>
              </form>
              <hr />
              <div className="row">
                <div className="col-md-9">
                  <label className="pull-right">Amount Payable</label>
                </div>
                <div className="col-md-3 ">{product.total}</div>
              </div>
            </div>
            ): <label style={{color:'red',fontSize:'16px',margin:'50px'}}> Your Cart is empty</label>}
            <div className="panel-footer">
              <button className="btn btn-success" style={{}} onClick={countinueShopping}>Continue Shopping</button>
              <button className="pull-right btn btn-danger" onClick={placeOrder}>Place Order</button>
            </div>
          </div>
        </div>
      </div>
    );
}

export default Cart