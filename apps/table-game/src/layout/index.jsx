/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import { Outlet } from "react-router-dom";
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
export const Layout = ({ children }) => {
    return (
        <ThemeProvider theme={globalTheme}>
            <CssBaseline />
            <Global styles={globalStyles} />
            { children}
        </ThemeProvider>
    )
}
