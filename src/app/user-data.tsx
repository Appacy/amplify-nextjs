'use client'

import { useAuth } from '@/lib/auth-provider';

export default function UserData() {
    const { isAuthenticated, idTokenPayload, attributes } = useAuth();

    if (!isAuthenticated) return (
        <div>
            <h4>Not Authenticated</h4>
        </div>
    );
    
    return (
        <div>
            <h4 style={{marginBlockEnd: '20px', textAlign: 'center'}}>User Data</h4>
            <p><strong>IsAuthenticated:</strong> {isAuthenticated ? 'true' : 'false'}</p>
            {isAuthenticated && (
                <>
                    <p><strong>Authenticated At:</strong> {idTokenPayload?.auth_time && new Date(idTokenPayload?.auth_time * 1000).toLocaleString()}</p>
                    <p><strong>Token Expiry:</strong> {idTokenPayload?.exp && new Date(idTokenPayload.exp * 1000).toLocaleString()}</p>
                </>
            )}
            <br />
            <p><strong>Sub:</strong> {attributes?.sub}</p>
            <p><strong>Username:</strong> {attributes?.email}</p>
            {attributes?.groups && (
                <>
                    <p><strong>Groups:</strong></p>
                    <ul style={{paddingInlineStart: '40px'}}>
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