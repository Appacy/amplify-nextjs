"use client";

import { PropsWithChildren, Suspense } from "react";
import { AuthProvider } from './auth-provider';
import { Provider } from "react-redux";
import { store } from './redux/store';

export default function Providers({ children }: PropsWithChildren) {
    return (
        <Suspense fallback={<>Loading...</>}>
            <Provider store={store}>
                <AuthProvider>
                    {children}
                </AuthProvider>
            </Provider>
        </Suspense>
    );
}