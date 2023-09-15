import { useMutation, useQueryClient } from '@tanstack/react-query';

async function logout() {
    const response = await fetch('/api/auth/logout', {
        method: 'POST',

        headers: {
            Pragma: 'no-cache',
        },
    });
    if (!response.ok) throw new Error('Could not logout.');
    return response.ok;
}

export function useLogoutMutation() {
    const queryClient = useQueryClient();
    return useMutation<boolean, Error>(logout, {
        onSuccess: () => {
            queryClient.invalidateQueries();
            queryClient.resetQueries();
        },
    });
}
