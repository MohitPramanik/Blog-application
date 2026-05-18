import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setCredentials } from '../store/features/auth/authSlice';
import { useLazyCheckAuthenticationQuery } from '../store/services/authApi';

export default function AuthInitializer({ children }: { children: React.ReactNode }) {
    const dispatch = useDispatch();
    const [triggerCheckAuthentication] = useLazyCheckAuthenticationQuery();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');

        if (!storedToken || !storedUser) {
            dispatch(logout());
            return;
        }

        let parsedToken;
        let parsedUser;

        try {
            parsedToken = JSON.parse(storedToken);
            parsedUser = JSON.parse(storedUser);
        } catch {
            dispatch(logout());
            return;
        }

        if (!parsedToken || !parsedUser || typeof parsedUser !== 'object') {
            dispatch(logout());
            return;
        }

        dispatch(setCredentials({ token: parsedToken, user: parsedUser }));

        triggerCheckAuthentication(undefined)
            .unwrap()
            .catch(() => {
                dispatch(logout());
            });
    }, [dispatch, triggerCheckAuthentication]);

    return children;
}