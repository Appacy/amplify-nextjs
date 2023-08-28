import Image from 'next/image'
import styles from './page.module.css'
import dynamic from 'next/dynamic';

const UserData = dynamic(() => import("./user-data"), { ssr: false });
const UserDataRedux = dynamic(() => import("./user-data-redux"), { ssr: false });

export default function Home() {
  return (
    <main className={styles.container}>
      <h3>Home Page</h3>
      <UserData />
      <UserDataRedux />
    </main>
  )
}
