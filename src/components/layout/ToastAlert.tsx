import { useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
    CheckCircleIcon,
    XCircleIcon,
    XMarkIcon,
} from '@heroicons/react/24/solid';
import { clsx } from 'clsx';
import {
    useAppConfigContext,
    useAppConfigDispatchContext,
} from '@/modules/appConfig';
import { clearNoticeToast } from '@/modules/appConfig/appActions';
import { useTimeoutFn } from '@/hooks/useTimeoutFn';
import { ERROR_TYPE } from '@/utils/types';

const RESET_TIME = 15000;

export function ToastAlert() {
    const state = useAppConfigContext();
    const dispatcher = useAppConfigDispatchContext();
    const [, , resetErrorToast] = useTimeoutFn(
        () => dispatcher(clearNoticeToast()),
        RESET_TIME,
    );

    useEffect(() => {
        if (state.error) {
            resetErrorToast();
        }
    }, [state.error, resetErrorToast]);

    const show = Boolean(state.error.message);
    const errorType = state.error.type === ERROR_TYPE.ERROR;
    const successType = state.error.type === ERROR_TYPE.SUCCESS;

    return (
        <div
            className={clsx(
                show ? '' : 'pointer-events-none hidden',
                'fixed right-4 top-20 z-50 lg:top-4',
            )}
        >
            <Transition
                show={show}
                enter="transition-all duration-300 transform"
                enterFrom="opacity-0 -translate-y-6"
                enterTo="opacity-100 translate-y-0"
            >
                <div
                    className={clsx(
                        'flex w-[375px] max-w-full rounded-md border p-4 md:w-[500px]',
                        errorType ? 'border-red-600 bg-red-500' : '',
                        successType ? 'border-green-800 bg-green-700' : '',
                    )}
                >
                    <div className="flex-shrink-0">
                        {successType && (
                            <CheckCircleIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        )}
                        {errorType && (
                            <XCircleIcon
                                className="h-6 w-6 text-white"
                                aria-hidden="true"
                            />
                        )}
                    </div>
                    <div className="ml-3">
                        <div
                            className={clsx(
                                'text-base',
                                errorType ? 'text-white' : '',
                                successType ? 'text-white' : '',
                            )}
                        >
                            <p className="w-[300px] max-w-full md:w-[400px]">
                                {state.error.message}
                            </p>
                        </div>
                    </div>
                    <div className="ml-auto pl-3">
                        <div className="-mx-1.5 -my-1.5">
                            <button
                                onClick={() => dispatcher(clearNoticeToast())}
                                type="button"
                                className={clsx(
                                    'inline-flex rounded-md p-1.5 focus:outline-none focus:ring-2 focus:ring-offset-2',
                                    errorType
                                        ? 'bg-red-500 text-white hover:bg-red-600 focus:ring-red-600 focus:ring-offset-red-50'
                                        : '',
                                    successType
                                        ? 'bg-green-700 text-white hover:bg-green-700 focus:ring-green-700 focus:ring-offset-green-700'
                                        : '',
                                )}
                            >
                                <span className="sr-only">Dismiss</span>
                                <XMarkIcon
                                    className="h-6 w-6"
                                    aria-hidden="true"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </Transition>
        </div>
    );
}
