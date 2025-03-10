import Image from 'next/image'
import React from 'react'

const Test = () => {
  return <>
    <Image
      src="/writing1.png"
      alt="Picture of the author"
      className='profile-images'
      width={600}
      height={400}
    />
  </>
}

export default Test