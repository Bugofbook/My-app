import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import globalTheme from '../theme/global'
import { Global, css } from '@emotion/react'

const globalStyles = css`
    html,
    body {
        height: 100%;
        width: 100%;
    }
    #root {
        height: 100%;
        width: 100%;
    }
`

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <Head>
              <title>Welcome to table-game-next!</title>
            </Head>
            <Global styles={globalStyles} />
            <Component {...pageProps} />
      </ThemeProvider>
    </>
  );
}

export default CustomApp;
