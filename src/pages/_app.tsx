import { NextPage } from 'next';
import { ReactNode, ReactElement } from 'react';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import FetchingIndicator from '@/components/layout/FetchingIndicator';
import ErrorBoundary from '@/components/layout/ErrorBoundary';
import { AppConfigProvider } from '@/modules/appConfig';
import { SessionProvider } from '@/modules/session/store';
import '../styles/globals.css';
import { ToastAlert } from '@/components/layout/ToastAlert';

const queryClient = new QueryClient();

type NextPageWithLayout = NextPage & {
    getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
    Component: NextPageWithLayout;
    pageProps: AppProps['pageProps'];
};

function AdaptApp({
    Component,
    pageProps: { session, ...pageProps },
}: AppPropsWithLayout) {
    // Use the layout defined at the page level, if available
    const getLayout = Component.getLayout || (page => page);

    return (
        <QueryClientProvider client={queryClient}>
            <SessionProvider>
                <AppConfigProvider>
                    {getLayout(
                        <>
                            <Head>
                                <title>GRDC Dashboard</title>
                                <meta
                                    name="description"
                                    content="GRDC Dashboard"
                                />
                                <link
                                    rel="icon"
                                    href="/favicon.ico"
                                />
                            </Head>
                            <ErrorBoundary>
                                <Component {...pageProps} />
                            </ErrorBoundary>
                        </>,
                    )}
                    <ToastAlert />
                    <FetchingIndicator />
                </AppConfigProvider>
            </SessionProvider>
        </QueryClientProvider>
    );
}

export default AdaptApp;
