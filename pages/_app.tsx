import { createTheme, ThemeProvider } from '@mui/material';
import type { AppProps } from 'next/app';
import { SnackbarProvider } from 'notistack';
import Head from 'next/head';
import "../src/styles/globals.css";
import { customTheme } from '../src/styles/theme';
import { store } from '../src/store';
import { Provider as ReduxProvider } from 'react-redux'

const theme = createTheme(customTheme);

function MyApp({ Component, pageProps }: AppProps) {
    //@ts-ignore
    const getLayout = Component.getLayout || ((page: any) => page);
    const Layout = getLayout(<Component {...pageProps} />)

    return (
        <>
            <Head>
                <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300&display=swap"
                />
                <link 
                    rel="stylesheet"
                    href="/assets/fonts/fonts.css"
                />
            </Head>
            <ReduxProvider store={store}>
                <ThemeProvider theme={theme}>
                    <SnackbarProvider maxSnack={3}>
                        {Layout}
                    </SnackbarProvider>
                </ThemeProvider>  
            </ReduxProvider>  
        </>
    );
}
export default MyApp
