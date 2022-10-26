import React, { useState } from 'react'

const Search = ({products}) => {
  const [search, setSearch] = useState('')
  const SearchProduct = (e) => {
     e.preventDefault()
  }
  console.log(products)
  return (
    <>
    <input onChange={(e) => setSearch(e.target.value)} className='search-pr' type='serach' placeholder='Product search'/>
    </>

  )
}

export default Search