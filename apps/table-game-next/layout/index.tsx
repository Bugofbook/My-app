import {useState, useEffect  } from "react"
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import Link from 'next/link'

const Layout = ({ children }) => {
    const [test, settest] = useState('')
    useEffect(() => {
        if (test !== '') {
            console.log('test', test)
        } else {
            console.log('root')
            settest('Root')
        }
    }, [test])
    return (
        <Container maxWidth={false} disableGutters>
            <Grid container spacing={3}>
                <LayoutNav />
                { children }
            </Grid>
        </Container>
    )
}

export default Layout

const  LayoutNav = () =>  {
  return (
    <AppBar position="sticky" color="primary">
        <Toolbar>
            <Link href="/">
                <Button variant="text" color="inherit" >
                    Home
                </Button>
            </Link>
            <Link href="/connectchess/tictactoe">
                <Button variant="text" color="inherit" >
                井字棋
                </Button>
            </Link>
            <Link href="/connectchess/tictactoespecial">
                <Button variant="text" color="inherit" >
                井字棋變化版
                </Button>
            </Link>
            <Link href="/connectchess/gomoku">
                <Button variant="text" color="inherit" >
                五子棋簡化版
                </Button>
            </Link>
            <Link href="/catchchess/othello">
                <Button variant="text" color="inherit" >
                奧賽羅棋簡化版
                </Button>
            </Link>
            {/* <MuiLink component={Link}  variant="button" color="inherit" href="/">
                Home
            </MuiLink>
            <MuiLink component={Link} variant="button" color="inherit" href="/connectchess/tictactoe">
                井字棋
            </MuiLink>
            <MuiLink component={Link} variant="button" color="inherit" href="/connectchess/tictactoespecial">
                井字棋變化版
            </MuiLink>
            <MuiLink component={Link} variant="button" color="inherit" href="/connectchess/gomoku">
                五子棋簡化版
            </MuiLink>
            <MuiLink component={Link} variant="button" color="inherit" href="/catchchess/othello">
                奧賽羅棋簡化版
            </MuiLink> */}
        </Toolbar>
    </AppBar>
  );
}