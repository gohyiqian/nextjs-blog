// you can only import global css file to pages/_app.js

import '../styles/global.css';
import { AppProps } from 'next/app';
import ReadingBar from '../components/ReadingBar';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <ReadingBar />
      <Component {...pageProps} />
    </>
  );
}
