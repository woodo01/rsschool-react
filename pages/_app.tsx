import { AppProps } from 'next/app';
import '../styles/index.css';
import '../styles/App.css';
import Layout from '../src/components/Layout';

const MyApp = ({ Component, pageProps }: AppProps) => {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
};

export default MyApp;
