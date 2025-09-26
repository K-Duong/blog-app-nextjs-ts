'use client'

import styles from './not-found.module.css'
// TODO: add styles
export default function NotFoundGeneral(){
  return (
    <div className={styles.containerNotFoundRoot}>
    <h1>404 - Page Not Found</h1>
        <p>The page you are looking for does not exist.</p>
    </div>
  )

}