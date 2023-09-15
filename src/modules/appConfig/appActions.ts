import {
    ActionCreator,
    ActionCreatorWithoutData,
    ErrorType,
    ERROR_TYPE,
} from '@/utils/types';

export enum AppActionType {
    TOGGLE_SIDEBAR = 'TOGGLE_SIDEBAR',
    SET_NOTICE = 'SET_NOTICE',
    CLEAR_NOTICE = 'CLEAR_NOTICE',
}

export type AppActions =
    | ActionCreator<AppActionType.TOGGLE_SIDEBAR, boolean>
    | ActionCreator<AppActionType.SET_NOTICE, ErrorType>
    | ActionCreatorWithoutData<AppActionType.CLEAR_NOTICE>;

export const toggleNavBar = (toggle = false): AppActions => ({
    action: AppActionType.TOGGLE_SIDEBAR,
    data: toggle,
});

export const setNoticeToast = (data: ErrorType): AppActions => ({
    action: AppActionType.SET_NOTICE,
    data,
});

export const setSuccessToast = (message: string): AppActions => ({
    action: AppActionType.SET_NOTICE,
    data: { message, type: ERROR_TYPE.SUCCESS },
});

export const setErrorToast = (message: string): AppActions => ({
    action: AppActionType.SET_NOTICE,
    data: { message, type: ERROR_TYPE.ERROR },
});

export const clearNoticeToast = (): AppActions => ({
    action: AppActionType.CLEAR_NOTICE,
});
