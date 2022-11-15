import type { AppProps } from 'next/app';
import Head from 'next/head';
import { GlobalStyle } from '../styles/globalStyle';
import '../styles/global.css';

if (process.env.NEXT_PUBLIC_API_MOCKING === 'enabled') {
  import('../mocks');
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>React test competition</title>
        <meta name='viewport' content='width=device-width, initial-scale=1' />
      </Head>
      <GlobalStyle />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
