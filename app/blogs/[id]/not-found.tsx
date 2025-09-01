
import type { Metadata } from 'next'
import styles from './not-found.module.css'
 
export const metadata: Metadata = {
  title: '404 - Blog Not Found',
  description: 'The page you are looking for does not exist.',
}
 
export default function NotFound() {
  return (
      <div className={styles.notFoundContainer}>
        <h1>404 - Blog Not Found</h1>
        <p>The page you are looking for does not exist.</p>
      </div>
  )
}

