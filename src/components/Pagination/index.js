import React from 'react'
import styles from './index.module.css'

export default function Pagination({ currentPage, totalPages, prevPage, nextPage }) {
  return (
    <div className={styles.container}>
      <button onClick={prevPage}>Prev</button>
      <p>{currentPage} of {totalPages}</p>
      <button onClick={nextPage}>Next</button>
    </div>
  )
}
