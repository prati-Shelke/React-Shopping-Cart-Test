import React from 'react';

const Pagination = ({ ItemsPerPage, totalItems, paginate,currentPage ,previousPage,nextPage}) => {
  const pageNumbers = [];
  let Number = currentPage
  
  for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) 
  {
    pageNumbers.push(i);
  }
  console.log(Number!=pageNumbers.length);
 

  return (
    <nav>
      <ul className='pagination'>
      
        
          <li className='page-item'>
          <a className='page-link' style={{cursor:'pointer'}} onClick={()=>Number!=1 && previousPage()} >Previous</a>
          {pageNumbers.map(number => (
            <a key={number}  style={{backgroundColor:number==currentPage && 'blue',color:number==currentPage && 'white',cursor:'pointer'}} onClick={() =>{ paginate(number);Number=number}} className='page-link'>
              {number}
            </a>
            ))}
            <a className='page-link' style={{cursor:'pointer'}} onClick={Number!=pageNumbers.length && nextPage}>Next</a>
          </li>
        
      </ul>
    </nav>
  );
};

export default Pagination;