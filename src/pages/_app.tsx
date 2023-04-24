import { Press_Start_2P, Roboto } from 'next/font/google';
import type { AppProps } from 'next/app'
import '@/styles/globals.scss';

const pressStart2P = Press_Start_2P({
    weight: ['400'],
    variable: '--font-press-start-2-p',
    subsets: ['latin'],
    display: 'swap'
});

const roboto = Roboto({
    weight: ['400', '700'],
    variable: '--font-roboto',
    subsets: ['latin'],
    display: 'swap'
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main className={`${pressStart2P.variable} ${roboto.variable}`}>
        <Component {...pageProps} />
    </main>
  );
}
