import Image from 'next/image'
import styles from './page.module.css'
import UserData from './user-data'

export default function Home() {
  return (
    <main className={styles.container}>
      <h3>Home Page</h3>
      <UserData />
    </main>
  )
}
