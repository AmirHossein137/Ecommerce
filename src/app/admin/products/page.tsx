import ProductForm from '@/components/admin-panel/ProductForm'
import React from 'react'

const Product = () => {
  return (
    <div className='h-[calc(100vh-96px)] grid place-items-center overflow-y-auto'>
      <div className='bg-white w-[400px] rounded-lg p-4'>
        <ProductForm />
      </div>
    </div>
  )
}

export default Product