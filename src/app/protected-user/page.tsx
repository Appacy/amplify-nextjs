import ProtectedRoute from '@/lib/protected-route';
import { redirect } from 'next/navigation';
import styles from './page.module.css'

export default async function ProtectedUser() {
  const status = await ProtectedRoute({ allowedGroups: ['User'] });
  console.log(status)
  if (status === 'NotAuthenticated') redirect('/login');
  if (status === 'NotAuthorised') return (
    <main className={styles.container}>
      <h3>Not Authorised</h3>
    </main>
  ); 

  return (
    <main className={styles.container}>
      <h3>Protected Page for User Group</h3>
    </main>
  )
}
