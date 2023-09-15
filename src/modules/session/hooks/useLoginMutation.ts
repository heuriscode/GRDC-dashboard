import { useMutation, useQueryClient } from '@tanstack/react-query';
import { LoginErrorResponse } from '@/utils/types';
import { isLoginErrorResponse } from '@/utils/typeGuards';
import {
    LoginBody,
    SessionResponse,
} from '@/modules/session/store/sessionTypes';
import { QueryKeys } from '@/utils/queryKeys';

async function postLogin(body: LoginBody) {
    const auth = btoa(`${body.username}:${body.password}`);
    const response = await fetch('/api/auth/basic', {
        method: 'POST',
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${auth}`,
        },
    });

    const data = await (response.json() as PromiseLike<
        SessionResponse | LoginErrorResponse
    >);

    if (isLoginErrorResponse(data)) {
        throw new Error(data.message);
    }

    if (!response.ok) {
        throw new Error('Could not login.');
    }

    return data;
}

export const useLoginMutation = () => {
    const queryClient = useQueryClient();
    return useMutation<SessionResponse, Error, LoginBody>(postLogin, {
        onSuccess: data => {
            queryClient.setQueryData([QueryKeys.Session], data);
        },
    });
};
