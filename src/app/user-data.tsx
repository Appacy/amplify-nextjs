'use client'

import { useAuth } from '@/lib/auth-provider';

export default function UserData() {
    const { isAuthenticated, attributes } = useAuth();

    if (!isAuthenticated) return (
        <div>
            <h4>Not Authenticated</h4>
        </div>
    );
    
    return (
        <div>
            <p><strong>IsAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
            <p><strong>Sub:</strong> {attributes?.sub}</p>
            <p><strong>Username:</strong> {attributes?.email}</p>
            {attributes?.groups && (
                <>
                    <p><strong>Groups:</strong></p>
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