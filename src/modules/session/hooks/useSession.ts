import { useQuery } from '@tanstack/react-query';
import { SessionResponse } from '@/modules/session/store/sessionTypes';
import { LoginErrorResponse } from '@/utils/types';
import { isLoginErrorResponse } from '@/utils/typeGuards';
import { QueryKeys } from '@/utils/queryKeys';

async function getSession() {
    const response = await fetch('/api/auth/context', {
        method: 'POST',
    });
    const data = await (response.json() as PromiseLike<
        SessionResponse | LoginErrorResponse
    >);
    if (isLoginErrorResponse(data)) {
        throw new Error(data.message);
    }
    if (!response.ok) {
        throw new Error('Could not get session');
    }
    return data;
}

export function useSession() {
    const { data, error, isLoading, isError } = useQuery<SessionResponse>({
        queryKey: [QueryKeys.Session],
        queryFn: getSession,
    });

    return {
        session: data,
        isSessionError: isError,
        isSessionLoading: isLoading,
        sessionError: error,
    };
}
