import ProtectedRoute from '@/lib/protected-route';
import { redirect } from 'next/navigation';
import styles from './page.module.css'

export default async function ProtectedAdmin() {
  const status = await ProtectedRoute({ allowedGroups: ['Admin'] });
  if (status === 'NotAuthenticated') redirect('/login');
  if (status === 'NotAuthorised') return (
    <main className={styles.container}>
      <h3>Not Authorised</h3>
    </main>
  ); 

  return (
    <main className={styles.container}>
      <h3>Protected Page for Admin Group</h3>
    </main>
  )
}
