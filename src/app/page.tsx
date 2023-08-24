import Image from 'next/image'
import styles from './page.module.css'
import UserData from './user-data'

export default function Home() {
  return (
    <main className={styles.container}>
      <h1>Home Page</h1>
      <UserData />
    </main>
  )
}
