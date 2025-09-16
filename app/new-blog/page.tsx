import {FormNewBlog} from "@/components";

import styles from './page.module.css'

export default function NewBlogPage(){
  return (
    <div className={styles.contain}>
      <header>
        <h1>Create new blog</h1>
      </header>
      <main className={styles.main}>
        <FormNewBlog/>
      </main>
    </div>
  )
}