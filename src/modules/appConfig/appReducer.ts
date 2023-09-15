import { ERROR_TYPE } from '@/utils/types';
import { AppActionType, AppActions } from './appActions';
import { AppConfigState } from './appTypes';

export function appConfigReducer(
    state: AppConfigState,
    { action, data }: AppActions,
): AppConfigState {
    switch (action) {
        case AppActionType.TOGGLE_SIDEBAR:
            return {
                ...state,
                sidebarOpen: data ?? !state.sidebarOpen,
            };
        case AppActionType.CLEAR_NOTICE: {
            return {
                ...state,
                error: {
                    type: ERROR_TYPE.ERROR,
                    message: '',
                },
            };
        }

        case AppActionType.SET_NOTICE: {
            return {
                ...state,
                error: data,
            };
        }

        default:
            return state;
    }
}
