import type { Metadata } from 'next'
import styles from './layout.module.css';
import ProtectedRoute from '@/lib/protected-route';
import { redirect } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Admin | Amplify Test',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const status = await ProtectedRoute({ allowedGroups: ['Admin'] });
  if (status === 'NotAuthenticated') redirect('/login');
  if (status === 'NotAuthorised') return (
    <main className={styles.container}>
      <h3>Not Authorised</h3>
    </main>
  ); 

  return (
    <>
      <nav className={styles.nav}>
        <a href='/admin/page1'>Page 1</a>
        <a href='/admin/page2'>Page 2</a>
        <a href='/admin/page3'>Page 3</a>
        <a href='/admin/page4'>Page 4</a>
      </nav>
      <main className={styles.main}>
        {children}
      </main>
    </>
  )
}
