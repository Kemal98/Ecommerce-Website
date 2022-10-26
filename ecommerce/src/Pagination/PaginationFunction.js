import React from 'react'
import './pagination.css'
const PaginationFunction = ({ postsPerPage, totalPosts, paginate, pageNumbers }) => {

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  console.log(Math.ceil(7 / 2))
  console.log(Math.ceil(totalPosts / postsPerPage))

  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
              <a onClick={(e) => {
                e.preventDefault()
                paginate(number)
              } } href='!#' className='page-link'>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};


export default PaginationFunction