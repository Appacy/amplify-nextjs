'use client'

import { useEffect, useState } from 'react';
import { useAuth } from '@/lib/auth-provider';

export default function DoLogout() {
    const { logout } = useAuth();
    const [message, setMessage] = useState<string>('Logging out...');
    
    useEffect(() => {
        logout().then(result => {
            setMessage('Logged out');
        }).catch(error => {
            setMessage(`Logout error:- ${error}`);
        })
    });

    return (
        <h3>{message}</h3>
    )
}