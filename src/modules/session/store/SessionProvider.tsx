'use client';

import {
    createContext,
    Dispatch,
    DispatchWithoutAction,
    ReactNode,
    useContext,
    useEffect,
    useReducer,
} from 'react';
import isEmpty from 'lodash/isEmpty';
import { useRouter } from 'next/router';
import { sessionReducer } from './sessionReducer';
import { logInUser, logoutUser, SessionActions } from './sessionActions';
import { Roles, SessionState } from './sessionTypes';
import { useSession } from '../hooks/useSession';

export const initialState: SessionState = {
    user: {
        // dummy data for now
        userId: '1',
        name: 'Jack',
        email: 'test@test.com',
        avatarUrl: '',
        roles: [Roles.Admin],
        username: 'jackmcpickle',
    },
};

type SessionDispatchContext = DispatchWithoutAction | Dispatch<SessionActions>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const SessionDispatchContext = createContext((_a: SessionActions) => {});
const SessionStateContext = createContext(initialState);

export function SessionProvider({ children }: { children: ReactNode }) {
    const [state, dispatch] = useReducer(
        sessionReducer,
        initialState,
        () => initialState,
    );
    const { session, isSessionLoading, isSessionError } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (!isEmpty(session)) {
            console.log('login');
            dispatch(logInUser(session));
        }
        if (isSessionError) {
            console.log('logout');
            dispatch(logoutUser());
        }
        if (!isSessionLoading && isSessionError && router.pathname !== '/') {
            console.log('redirecting to login page');
            router.push('/');
        }
    }, [session, isSessionLoading, router, dispatch, isSessionError]);

    return (
        <SessionStateContext.Provider value={state}>
            <SessionDispatchContext.Provider value={dispatch}>
                {children}
            </SessionDispatchContext.Provider>
        </SessionStateContext.Provider>
    );
}

export function useSessionStateContext(): SessionState {
    return useContext(SessionStateContext);
}

export function useSessionDispatchContext(): SessionDispatchContext {
    return useContext(SessionDispatchContext);
}
