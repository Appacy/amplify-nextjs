'use client'

import { FC, createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Amplify, Auth, Hub } from "aws-amplify";
import awsExports from "../aws-exports";
import { Attributes, User, HubCapsule, AuthError, Status } from './types';

Amplify.configure({ ...awsExports, ssr: true });


type AuthProps = {
    children?: ReactNode
}

export interface AuthContextModel {
    isAuthenticated: boolean;
    idToken?: string;
    attributes?: Attributes;
    status: Status;
    logout: () => Promise<any>;
    login: (username: string, password: string, newPassword?: string) => Promise<AuthError | User>;
    isUser: (obj: User | AuthError) => boolean;
    isAuthError: (obj: User | AuthError | string) => boolean;
}
  
const AuthContext = createContext<AuthContextModel>({
    isAuthenticated: false,
    status: 'idle',
    logout: () => { return Promise.resolve() },
    login: (username: string, password: string, newPassword?: string) => { return Promise.resolve({}) },
    isUser: (obj: User | AuthError) => false,
    isAuthError: (obj: User | AuthError | string) => false,
})


const AuthProvider: FC<AuthProps> = ({children}) => { 
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [status, setStatus] = useState<Status>('idle');
    const [idToken, setIdToken] = useState<string | undefined>();
    const [attributes, setAttributes] = useState<Attributes | undefined>();

    useEffect(() => {
        Auth.currentAuthenticatedUser().then((_user) => {
            if (isUser(_user)) setUser((_user as User));
        }).catch((error) => {
            setIsAuthenticated(false);
            setIdToken(undefined)
            setAttributes(undefined);
            console.log("Auth.currentAuthenticatedUser error", error);
        })

        return () => {
            resetUser();
        }
    }, [])

    useEffect(() => {
        const listener = (data: HubCapsule) => {
        switch (data.payload.event) {
            case 'init':
            break;
            case 'configured':
            console.log('the Auth module is configured');
            break;
            case 'signIn':
            console.log('user signed in');
            break;
            case 'signIn_failure':
            console.error('user sign in failed');
            break;
            case 'signUp':
            console.log('user signed up');
            break;
            case 'signUp_failure':
            console.error('user sign up failed');
            break;
            case 'confirmSignUp':
            console.log('user confirmation successful');
            break;
            case 'completeNewPassword_failure':
            console.error('user did not complete new password flow');
            break;
            case 'autoSignIn':
            console.log('auto sign in successful');
            break;
            case 'autoSignIn_failure':
            console.error('auto sign in failed');
            break;
            case 'forgotPassword':
            console.log('password recovery initiated');
            break;
            case 'forgotPassword_failure':
            console.error('password recovery failed');
            break;
            case 'forgotPasswordSubmit':
            console.log('password confirmation successful');
            break;
            case 'forgotPasswordSubmit_failure':
            console.error('password confirmation failed');
            break;
            case 'verify':
            console.log('TOTP token verification successful');
            break;
            case 'tokenRefresh':
            console.log('token refresh succeeded');
            break;
            case 'tokenRefresh_failure':
            console.error('token refresh failed');
            break;
            case 'cognitoHostedUI':
            console.log('Cognito Hosted UI sign in successful');
            break;
            case 'cognitoHostedUI_failure':
            console.error('Cognito Hosted UI sign in failed');
            break;
            case 'customOAuthState':
            console.log('custom state returned from CognitoHosted UI');
            break;
            case 'customState_failure':
            console.error('custom state failure');
            break;
            case 'parsingCallbackUrl':
            console.log('Cognito Hosted UI OAuth url parsing initiated');
            break;
            case 'userDeleted':
            console.log('user deletion successful');
            break;
            case 'updateUserAttributes':
            console.log('user attributes update successful');
            break;
            case 'updateUserAttributes_failure':
            console.log('user attributes update failed');
            break;
            case 'signOut':
            console.log('user signed out');
            break;
        }
        };
        
        const hub = Hub.listen('auth', listener);

        return () => { 
            hub(); 
        }
    },[])

    function setUser(user: User) {
        if (
            user &&
            user.getSignInUserSession() &&
            user.getSignInUserSession()!.isValid()
        ) {
            setIdToken(user.getSignInUserSession()!.getIdToken().getJwtToken())
            setIsAuthenticated(true);
            const attributes = user.attributes;
            const payload = user.getSignInUserSession()?.getIdToken().decodePayload();
            if (attributes) {
                setAttributes({
                    sub: user.attributes?.sub,
                    email: user.attributes?.email,
                    groups: payload && payload['cognito:groups']
                })
            }
        } else {
            resetUser();
        }
    }

    function resetUser() {
        setIsAuthenticated(false);
        setIdToken(undefined)
        setAttributes(undefined);
    }

    async function login(username: string, password: string, newPassword?: string): Promise<User | AuthError> {
        setStatus('pending');
        return await Auth.signIn({ username: username, password: password}).then(result => {
            if (isUser(result)){
                if ((result as User).challengeName === 'NEW_PASSWORD_REQUIRED') {
                    if (newPassword) Auth.completeNewPassword(result, newPassword).finally(() => {
                        setStatus('idle');
                    })
                }
            }
            setUser(result as User);
            setStatus('idle');
            return (result as User);
        }).catch(error => {
            console.log(error)
            setStatus('idle');
            return {
                message: error.name
            } as AuthError;
        })
    }

    async function logout() {
        await Auth.signOut().then(result => {
            resetUser();
            return result;
        }).catch(error => {
            return error;
        });
    }

    function isUser(obj: User | AuthError): obj is User {
        return (obj as User).getSignInUserSession !== undefined;
      }
    
      function isAuthError(obj: User | AuthError | string): obj is AuthError {
        return (obj as AuthError).message !== undefined;
      }
    
    const value: AuthContextModel = {
        isAuthenticated,
        idToken,
        attributes,
        status,
        logout,
        login,
        isAuthError,
        isUser
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export {AuthContext, AuthProvider}

export function useAuth() {
  return useContext(AuthContext)
}
  