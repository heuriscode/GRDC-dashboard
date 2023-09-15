import { FormEvent, useEffect } from 'react';
import { useRouter } from 'next/router';
import isEmpty from 'lodash/isEmpty';
import { CheckCircleIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import {
    useSessionStateContext,
    useSessionDispatchContext,
} from '@/modules/session/store';
import { setErrorToast, setSuccessToast } from '@/modules/appConfig/appActions';
import { useAppConfigDispatchContext } from '@/modules/appConfig';
import { logInUser } from '@/modules/session/store/sessionActions';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';
import { useLoginMutation } from './hooks/useLoginMutation';

export default function Login() {
    const appDispatch = useAppConfigDispatchContext();
    const sessionState = useSessionStateContext();
    const dispatchSession = useSessionDispatchContext();
    const { isLoading, isError, isSuccess, mutate, reset, error, data } =
        useLoginMutation();
    const router = useRouter();

    useEffect(() => {
        if (!isEmpty(sessionState.user)) router.push('/dashboard');
    }, [sessionState, router]);

    useEffect(() => {
        if (isSuccess && data) {
            appDispatch(setSuccessToast('Login successful'));
            dispatchSession(logInUser(data));
        }
        if (isError && error) {
            appDispatch(setErrorToast(error.message));
            reset();
        }
    }, [
        router,
        isError,
        isSuccess,
        error,
        reset,
        data,
        appDispatch,
        dispatchSession,
    ]);

    async function onSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault();

        if (!e.currentTarget.checkValidity()) {
            appDispatch(
                setErrorToast('Your username/password are missing or invalid'),
            );
            return;
        }
        const body = {
            username: e.currentTarget.username.value,
            password: e.currentTarget.password.value,
        };
        mutate(body);
    }

    return (
        <form
            className="mt-8 space-y-4"
            onSubmit={onSubmit}
        >
            <input
                type="hidden"
                name="remember"
                defaultValue="true"
            />
            <div className="-space-y-px rounded-md shadow-sm">
                <div>
                    <label
                        htmlFor="email"
                        className="sr-only"
                    >
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="username"
                        autoComplete="username"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        placeholder="Username"
                    />
                </div>
                <div>
                    <label
                        htmlFor="password"
                        className="sr-only"
                    >
                        Password
                    </label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        required
                        className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder:text-gray-500 focus:z-10 focus:border-primary-500 focus:outline-none focus:ring-primary-500 sm:text-sm"
                        placeholder="Password"
                    />
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="group relative flex w-full justify-center rounded-md border border-transparent bg-primary-500 px-4 py-2 text-sm font-medium text-white hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                >
                    <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        {isLoading && !isSuccess ? (
                            <SpinnerIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        ) : (
                            <LockClosedIcon
                                className="h-5 w-5 text-primary-500 group-hover:text-primary-400"
                                aria-hidden="true"
                            />
                        )}
                        {!isLoading && isSuccess && (
                            <CheckCircleIcon
                                className="h-5 w-5 text-white"
                                aria-hidden="true"
                            />
                        )}
                    </span>
                    {isLoading && !isSuccess ? 'Success' : 'Sign in'}
                    {}
                </button>
            </div>
            <div className="flex items-center justify-end">
                <div className="text-sm">
                    <a
                        href="#"
                        className="font-medium text-gray-400 hover:text-primary-500 focus:outline-none focus:ring focus:ring-primary-500"
                    >
                        Can&apos;t access account?
                    </a>
                </div>
            </div>
        </form>
    );
}
