import React, { useEffect } from 'react'

export default function NoResult() {

    useEffect(()=> {
        console.log('Test')
    }, [])
    return (
        <div className='container'>
            No Result Found...
        </div>
    )
}
