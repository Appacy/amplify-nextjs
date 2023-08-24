import Image from 'next/image'
import styles from './page.module.css'
import DoLogout from './logout'

export default function Logout() {
  return (
    <main className={styles.container}>
      <DoLogout />
    </main>
  )
}
