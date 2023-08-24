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
    const {isAuthenticated, status, login, completeNewPassword, isUser, isAuthError} = useAuth();
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

        login(formData.username, formData.password).then(result => {
            if (isUser(result)) {
                if ((result as User).getSignInUserSession()?.isValid()) {
                    setMessage(`Logged in as ${(result as User).attributes?.email}. Redirecting to home page...`);
                    setTimeout(() => {
                        router.push('/');
                    },2000)
                } else if (challenge && challenge === 'NEW_PASSWORD_REQUIRED' && formData.newPassword.length) {
                    completeNewPassword((result as User), formData.newPassword).then(data => {
                        if (isUser(data)) {
                            setMessage(`New password complete. Logged in as ${(result as User).attributes?.email}. Redirecting to home page...`);
                            setTimeout(() => {
                                router.push('/');
                            },2000)
                        }
                        if (isAuthError(result)) {
                            setMessage(`Error completing new password:- ${(result as AuthError).message}`)
                        }
                    })
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
                <p>Test credentials (User Group): test@appacy.dev / password1</p>
                <p>Test credentials (Admin Group): test1@appacy.dev / password1</p>
            </div>
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
            <div style={{textAlign: 'center'}}>
                {status === 'pending' ? (
                    <p>Loading...</p>
                ) : (
                    <button 
                        type='button' 
                        onClick={handleSubmit}
                    >
                        {challenge ? `Complete ${challenge}` : 'Login'}
                    </button>
                )}
            </div>
            <div>
                <p>{message}</p>
            </div>
        </form>
    )
}