import React,{useEffect,useState} from 'react'

function Demo2(props) 
{
    console.log(props.data);
    return (
      <div>
        <div className="row">
                        <div className="col-sm-12">
                            <div style={{margin:'25px 0px'}}>
                                <label className="control-label">Sort by:</label>
                                <select name="" id="">
                                    <option value="">Default</option>
                                    <option value="High to Low">High to Low</option>
                                    <option value="Low to High">Low to High</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="row">
                        {/* {AllProducts && AllProducts.map((product) => (
                        <div className="col-md-3" key={product._id}>
                            <div className="bg-info">
                            <img
                                src={`http://interviewapi.ngminds.com/${product.image}`}
                                alt="img not found"
                                width="100"
                                height="200"
                            />
                        
                            <p>{product.name}</p>
                            <p>
                                <i className="fa fa-inr"></i>
                                {product.price}
                            </p>
                            <a className="btn btn-warning" 
                            // onClick={() => AddtoCart(product)}
                            >
                                Add to Cart
                            </a>
                            </div>
                            <hr></hr>
                        </div>
                        ))} */}
                    </div>
            </div>
    );
  }

  export default Demo2