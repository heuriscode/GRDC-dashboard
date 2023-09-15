import { Transition } from '@headlessui/react';
import { useIsFetching } from '@tanstack/react-query';
import { SpinnerIcon } from '@/components/icons/SpinnerIcon';

export default function FetchingIndicator() {
    const isFetching = useIsFetching();

    return (
        <div className="fixed z-50 pointer-events-none bottom-4 right-4">
            <Transition
                show={Boolean(isFetching)}
                enter="transition-all duration-200 transform"
                enterFrom="opacity-0 translate-y-4"
                enterTo="opacity-100 translate-y-0"
                leave="transition-all duration-200 transform"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-4"
            >
                <div className="p-2 bg-gray-200 rounded-md">
                    <SpinnerIcon className="w-5 h-5 color-gray-600" />
                </div>
            </Transition>
        </div>
    );
}
