import React from 'react'
import {Cards} from '../components/Cards'
import Link from 'next/link'

export const Products = ({products,addToCart}) => {
    return products.map((individualProduct)=>(
        <Link key={individualProduct.ID} href={`/${individualProduct.ID}`}>
        <Cards key = {individualProduct.ID} individualProduct={individualProduct} 
        addToCart={addToCart}/>
        </Link>
    ))
}
