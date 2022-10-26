import React from 'react'
import InvidualProduct from './InvidualProduct'

const Products = ({products, addToCart, user }) => {
  return (
  <>
     {products.map((product) => (
        <InvidualProduct key={product.ID} product={product} user={user} addToCart={addToCart} />
    ))}
      </>
  )
}

export default Products