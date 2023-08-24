import DoLogin from './login'
import styles from './page.module.css'

export default function Login() {
  return (
    <main className={styles.container}>
      <h3>Login</h3>
      <DoLogin />
    </main>
  )
}
