import React from 'react'
import {Cards} from '../components/Cards'

export const Products = ({products,addToCart}) => {
    return products.map((individualProduct)=>(
        <Cards key = {individualProduct.ID} individualProduct={individualProduct} addToCart={addToCart}
        />
    ))
}
