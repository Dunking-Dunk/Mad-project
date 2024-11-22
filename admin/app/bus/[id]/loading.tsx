'use client'

import { InfinitySpin } from 'react-loader-spinner'

export default function Loading() {
  return <div className='w-full h-full flex justify-center items-center'>
    <InfinitySpin 
    width='200'
    color="#F94C10"
  />
  </div>
}