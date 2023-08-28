'use client'

import { useAppSelector } from '@/lib/redux/hooks'

export default function LoginLogout() {
    const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);

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