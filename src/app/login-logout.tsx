'use client'

import { useAuth } from '@/lib/auth-provider';

export default function LoginLogout() {
    const { isAuthenticated } = useAuth();

    if (isAuthenticated){
        return (
            <a href="/logout">Logout</a>
        )
    } else {
        return (
            <a href="/login">Login</a>
        )
    }
}