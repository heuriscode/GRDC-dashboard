import { SessionActionType, SessionActions } from './sessionActions';
import { SessionState } from './sessionTypes';

export function sessionReducer(
    state: SessionState,
    { action, data }: SessionActions,
): SessionState {
    switch (action) {
        case SessionActionType.USER_LOGGED_IN:
            return {
                ...state,
                user: data,
            };

        case SessionActionType.USER_LOGGED_OUT:
            return {
                ...state,
                user: null,
            };
    }
}
