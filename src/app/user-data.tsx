'use client'

import { useEffect, useState, ChangeEvent, MouseEvent } from 'react';
import { useAuth } from '@/lib/auth-provider';
import { AuthError, User } from '@/lib/types';

export default function UserData() {
    const { isAuthenticated, attributes } = useAuth();

    if (!isAuthenticated) return <></>;
    
    return (
        <div style={{textAlign: 'center'}}>
            <p>IsAuthenticated: {isAuthenticated ? 'true' : 'false'}</p>
            <p>Sub: {attributes?.sub}</p>
            <p>Username: {attributes?.email}</p>
            {attributes?.groups && (
                <>
                    <p>Groups:</p>
                    <ul>
                        {attributes.groups.map((group, index) => {
                            return (
                                <li key={index}>{group}</li>
                            )
                        })}
                    </ul>
                </>
            )}
            
        </div>
    )
}