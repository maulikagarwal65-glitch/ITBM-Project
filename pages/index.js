import Head from 'next/head';
import App from '../src/App';

export default function Home() {
  return (
    <>
      <Head>
        <title>QuickCompare – Quick-Commerce Price Comparison</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <App />
    </>
  );
}
