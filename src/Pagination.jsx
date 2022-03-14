import React from 'react';

const Pagination = ({ ItemsPerPage, totalItems, paginate,currentPage }) => {
  const pageNumbers = [];

  
  for (let i = 1; i <= Math.ceil(totalItems / ItemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a style={{backgroundColor:number==currentPage && 'blue',color:number==currentPage && 'white',cursor:'pointer'}} onClick={() => paginate(number)} className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Pagination;