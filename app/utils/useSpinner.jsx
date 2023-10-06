import React, { useState } from 'react'
import Spinner from '../components/Spinner'

function useSpinner() {
    const [loading,setLoading] = useState(false)
    return [
        loading ? <Spinner/>:null,
        ()=> setLoading(true),
        ()=> setLoading(false)
    ]
}

export default useSpinner
