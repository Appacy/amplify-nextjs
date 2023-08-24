'use client'

import { useState, ChangeEvent, MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/auth-provider';
import { AuthError, User } from '@/lib/types';
import { ChallengeName } from 'amazon-cognito-identity-js';

type LoginFormData = {
    username: string,
    password: string,
    newPassword: string
}
export default function DoLogin() {
    const router = useRouter();
    const {isAuthenticated, login, isUser, isAuthError} = useAuth();
    const [message, setMessage] = useState<string>('');
    const [challenge, setChallenge] = useState<ChallengeName>();
    const [formData, setFormData] = useState<LoginFormData>({
        username: '',
        password: '',
        newPassword: ''
    })
    
    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormData(prevState => ({
            ...prevState,
            [e.target.name]: e.target.value.trim()
        }));
    };

    const handleSubmit = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        login(formData.username, formData.password, formData.newPassword).then(result => {
            if (isUser(result)) {
                if ((result as User).getSignInUserSession()?.isValid()) {
                    setMessage(`Logged in as ${(result as User).attributes?.email}. Redirecting to home page...`);
                    setTimeout(() => {
                        router.push('/');
                    },2000)
                } else {
                    const challengeName = (result as User).challengeName;
                    if (challengeName) {
                        setMessage(`${(result as User).challengeName}`)
                        setChallenge(challengeName);
                    }
                }
            }
            if (isAuthError(result)) {
                setMessage(`Login error:- ${(result as AuthError).message}`)
            }
        }).catch(error => {
            setMessage(`Login error:- ${error}`)
        })
    }

    return (
        <form>
            <div>
                <label 
                    htmlFor='username'
                >
                    Username
                </label>
                <input 
                    id='username' 
                    name='username' 
                    value={formData.username}
                    onChange={handleChange}
                />
            </div>
            <div>
                <label 
                    htmlFor='password'
                >
                    Password
                </label>
                <input 
                    id='password' 
                    name='password' 
                    type='password' 
                    value={formData.password}
                    onChange={handleChange}
                />
            </div>
            {(!isAuthenticated && challenge && challenge === 'NEW_PASSWORD_REQUIRED') && (
                <div>
                    <label 
                        htmlFor='newPassword'
                    >
                       New Password
                    </label>
                    <input 
                        id='newPassword' 
                        name='newPassword' 
                        type='password' 
                        value={formData.newPassword}
                        onChange={handleChange}
                    />
                </div>
            )}
            <div>
                <button 
                    type='button' 
                    onClick={handleSubmit}
                >
                    {challenge ? `Complete ${challenge}` : 'Login'}
                </button>
            </div>
            <div>
                <p>{message}</p>
            </div>
        </form>
    )
}