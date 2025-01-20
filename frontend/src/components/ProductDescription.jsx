import React from 'react'

const ProductDescription = () => {
  return (
    <div className='mt-20'>
    <div className='flex gap-3 mb-4'>
        <button className='btn_dark_rounded !rounded-none !text-xs !py-[6px] w-36'>Description</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Care Guide</button>
        <button className='btn_dark_outline !rounded-none !text-xs !py-[6px] w-36'>Size Guide</button>
    </div>
    <div className='flex flex-col pb-16'>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Quibusdam aliquam unde voluptas, aspernatur quo esse beatae quis
             soluta pariatur debitis! Minima ducimus aut rem 
             perferendis consectetur, repudiandae nisi quibusdam modi.
        </p>
        <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. 
            Excepturi aliquid corrupti ducimus, aut omnis nobis dolorem, 
            neque ea quibusdam similique inventore sit. 
            Labore quo doloremque dicta molestias sed! Velit, soluta.</p>
    </div>
    </div>
  )
}

export default ProductDescription
