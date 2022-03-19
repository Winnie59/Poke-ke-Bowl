import React from 'react'
import styles from '../styles/Slider.module.css'
import Image from 'next/image'
import { useState } from 'react'

const Slider = () => {
    const [slide, setslide] = useState(0)
    const handleArrow = (direction) => {
        if (direction === 'left') {
            setslide(slide !== 0 ? slide-1 : 2)
        }
        if (direction === 'right') {
            setslide(slide !== 2 ? slide+1 : 0)
        }
    }

  return (
    <div className={styles.container} >
        <div className={styles.arrow} style={{left:0}} onClick={()=>handleArrow('left')}>
            <Image src='/img/left.png' alt=''layout='fill'/>    
        </div>
        
        <div className={styles.wrapper} style={{transform:`translateX(${-100*slide}vw)`}} >
            <div className={styles.imgSlider} style={{backgroundColor:'#cff8f2'}}>        
                 <Image src= '/img/slide1.png' alt='' layout='fill' objectFit='contain' />
            </div>     
            <div className={styles.imgSlider} style={{backgroundColor:'#ffeea8'}}>        
                 <Image src= '/img/slide2.png' alt='' layout='fill' objectFit='contain' />
            </div> 
            <div className={styles.imgSlider} style={{backgroundColor:'#1be6cf'}}>        
                 <Image src= '/img/slide3.png' alt='' layout='fill' objectFit='contain' />
            </div> 
        </div>
        <div className={styles.arrow} style={{right:0}} onClick={()=>handleArrow('right')}>
           <Image src='/img/right.png' alt='' layout='fill' />    
        </div>
    </div>
  )
}

export default Slider