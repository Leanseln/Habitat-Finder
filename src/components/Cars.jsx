import React from 'react'
import Carousel from './Carousels'

export default function swiper() {

  const slides = [
    "https://upload.wikimedia.org/wikipedia/commons/4/47/PNG_transparency_demonstration_1.png",
    "https://pngimg.com/d/mario_PNG125.png",
    "https://upload.wikimedia.org/wikipedia/commons/e/eb/Creeperasha_Linux_test_image_upload.png"
  ]
  return (
    <div className='max-w-lg'>
        <Carousel>
            {slides.map((s) => {
                <img src={s} />
            })}
        </Carousel>
    </div>
  )
}
