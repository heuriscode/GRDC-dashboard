import { ActionCreator, ActionCreatorWithoutData } from '@/utils/types';
import { SessionResponse } from './sessionTypes';

export enum SessionActionType {
    USER_LOGGED_IN = 'USER_LOGGED_IN',
    USER_LOGGED_OUT = 'USER_LOGGED_OUT',
}

export type SessionActions =
    | ActionCreator<SessionActionType.USER_LOGGED_IN, SessionResponse>
    | ActionCreatorWithoutData<SessionActionType.USER_LOGGED_OUT>;

export const logInUser = (data: SessionResponse): SessionActions => ({
    action: SessionActionType.USER_LOGGED_IN,
    data,
});

export const logoutUser = (): SessionActions => ({
    action: SessionActionType.USER_LOGGED_OUT,
});
