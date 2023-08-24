'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { useRouter } from 'next/navigation';

export default function DoLogout() {
    const {logout} = useAuth();
    const router = useRouter();
    const [message, setMessage] = useState<string>('Logging out...');
    
    useEffect(() => {
        logout().then(result => {
            setMessage('Logged out. Redirecting to login...');
            setTimeout(() => {
                router.replace('/login');
            },2000)
        }).catch(error => {
            setMessage(`Logout error:- ${error}`);
        })
    });

    return (
        <h3>{message}</h3>
    )
}