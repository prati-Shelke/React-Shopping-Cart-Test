import React from 'react'

function Navbar() {

  let cart = JSON.parse(localStorage.getItem('ProductsOrdered')) || []
  
  return (
    <div className='container' >
      <h1>
        <a href="/home">My Ecommerce Site</a>
        <span className="pull-right">
          <a href="/cart">Cart ({cart.length})</a>
        </span>
      </h1>
      <hr></hr>
    </div>
  );
}

export default Navbar