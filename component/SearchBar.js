import Link from 'next/link'
import React, { useState } from 'react'
import styles from '../styles/Searchbar.module.css'
import Image from 'next/image'
import axios from 'axios'

const SearchBar = ({placeholder, orders}) => {
    const [filteredData, setFilteredData] = useState([])
    const [wordEnter, setWordEnter] = useState('')
   
    const handleFilter = (e) => {
        const searchWord = e.target.value
        setWordEnter(searchWord)
        console.log(orders)
        const newFilter = orders?.filter((order) => {
            return order._id.toLowerCase().includes(searchWord.toLowerCase())
        })
        if (searchWord === '') {
            setFilteredData([])
        } else {
            setFilteredData(newFilter)
            console.log(newFilter)
        }
    }

    const clearInput = () => {
        setFilteredData([])
        setWordEnter('')
    }

  return (
    <div className={styles.search}>
        <div className={styles.searchInputs}>
            <input type="text" placeholder={placeholder} value={wordEnter} onChange={handleFilter} />
            <div className={styles.searchIcon}>
            {filteredData.length === 0 ? 
            (<Image src='/img/search.webp' alt='search' width={50} height={50} objectFit='contain' />) :
            (<Image className={styles.clearBtn} onClick={clearInput} src='/img/close.png' alt='search' width={50} height={50} objectFit='contain' />)}
            </div>
        </div>
        {filteredData.length != 0 && (
            <div className={styles.dataResult}>
               {filteredData.slice(0,5).map((order)=> {
                    return (
                        <Link href={`/order/${order._id}`} key={order._id} passHref>
                        <p className={styles.trackOrder}>{order._id}</p>
                        </Link>
                    )
                })} 
            </div>
        )}    
    </div>
  )
}


export default SearchBar