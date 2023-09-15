'use client';

import {
    createContext,
    Dispatch,
    DispatchWithoutAction,
    ReactNode,
    useContext,
    useReducer,
} from 'react';
import { ERROR_TYPE } from '@/utils/types';
import { appConfigReducer } from './appReducer';
import { AppActions } from './appActions';
import { AppConfigState } from './appTypes';

export const initialState: AppConfigState = {
    sidebarOpen: false,
    error: {
        type: ERROR_TYPE.ERROR,
        message: '',
    },
};

type AppConfigDispatchContext = DispatchWithoutAction | Dispatch<AppActions>;

// eslint-disable-next-line @typescript-eslint/no-empty-function
const AppConfigDispatchContext = createContext((_actions: AppActions) => {});
const AppConfigStateContext = createContext(initialState);

export const AppConfigProvider = ({ children }: { children: ReactNode }) => {
    const [state, dispatch] = useReducer(
        appConfigReducer,
        initialState,
        () => initialState,
    );

    return (
        <AppConfigStateContext.Provider value={state}>
            <AppConfigDispatchContext.Provider value={dispatch}>
                {children}
            </AppConfigDispatchContext.Provider>
        </AppConfigStateContext.Provider>
    );
};

export const useAppConfigContext = (): AppConfigState => {
    return useContext(AppConfigStateContext);
};

export const useAppConfigDispatchContext = (): AppConfigDispatchContext => {
    return useContext(AppConfigDispatchContext);
};
