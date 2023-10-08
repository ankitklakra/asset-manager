import React from 'react'
import {Cards} from '../components/Cards'
import Link from 'next/link'

export const Products3 = ({products,addToCart}) => {
    return products.map((individualProduct)=>(
        <Link key={individualProduct.ID} href={`/admin/manage/${individualProduct.ID}`}>
        <Cards key = {individualProduct.ID} individualProduct={individualProduct} 
        addToCart={addToCart}/>
        </Link>
    ))
}
