import React from 'react'

export const Cards = ({ individualProduct, addToCart }) => {
  const handleAddToCart = () => {
    addToCart(individualProduct);
  }
  return (
    <div  style={{ margin: '30px' }}>
      <div className="card w-auto bg-base-100 shadow-xl">
        {/* <figure><img src="/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure> */}
        <div className="card-body">
          <h2 className="card-title">
            {individualProduct.title.toUpperCase()}
            {/* <div className="badge badge-secondary">NEW</div> */}
          </h2>
          <p> {individualProduct.description}</p>
          <div className="card-actions justify-end">
            <div className="badge badge-outline">{individualProduct.category}</div>
            <div className="badge badge-outline">{individualProduct.doctype}</div>
          </div>
        </div>
      </div>
    </div>
  )
}
