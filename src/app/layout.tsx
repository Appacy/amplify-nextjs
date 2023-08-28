import'./globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Amplify } from 'aws-amplify'
import awsExports from "../aws-exports";
import dynamic from 'next/dynamic';
import Image from 'next/image'
import Providers from '@/lib/providers';

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
        <Providers>
          <div className='wrapper'>
            <div>
              <a href='https://appacy.uk' target='_blank'>
                <Image
                  src='/appacy.png'
                  width={60}
                  height={60}
                  alt='Appacy Ltd'
                />
              </a>
            </div>
            <header className='header'>
              <a href="/">Home Page</a>
              <a href="/protected-admin">Protected (Admin Group)</a>
              <a href="/protected-user">Protected (User Group)</a>
              <LoginLogout />
            </header>
            {children}
            <code>
              Code: <a href='https://github.com/Appacy/amplify-nextjs' target='_blank'>https://github.com/Appacy/amplify-nextjs</a>
            </code>
          </div>
        </Providers>
      </body>
    </html>
  )
}
