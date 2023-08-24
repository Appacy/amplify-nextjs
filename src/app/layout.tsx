import { AuthProvider } from '@/lib/auth-provider'
import'./globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Amplify } from 'aws-amplify'
import awsExports from "../aws-exports";
import dynamic from 'next/dynamic';

const LoginLogout = dynamic(() => import("./login-logout"), { ssr: false });

Amplify.configure({ ...awsExports, ssr: true });

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Amplify Test',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <div className='wrapper'>
            <header className='header'>
              <a href="/">Home Page</a>
              <a href="/protected-admin">Protected (Admin Group)</a>
              <a href="/protected-user">Protected (User Group)</a>
              <LoginLogout />
            </header>
            {children}
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
