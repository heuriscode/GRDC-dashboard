import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
} from 'next/document';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return { ...initialProps };
    }

    render() {
        return (
            <Html className="h-full bg-gray-100">
                <Head>
                    <link
                        rel="preconnect"
                        href="https://fonts.googleapis.com"
                    />
                    <link
                        rel="preconnect"
                        href="https://fonts.gstatic.com"
                        crossOrigin="use-credentials"
                    />
                    <link
                        href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;900&display=swap"
                        rel="stylesheet"
                    />
                </Head>
                <body className="h-full">
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
