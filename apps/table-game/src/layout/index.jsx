import {useState, useEffect  } from "react"
import Container from '@mui/material/Container'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid'
import { Link } from 'react-router-dom'

// import { useNavigate } from 'react-router-dom'

// import { Root } from './root'
import { Outlet } from "react-router-dom";
// import { GlobalContext } from "../content/global";

export const Layout = () => {
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
                <Outlet />
            </Grid>
        </Container>
    )
}


const  LayoutNav = () =>  {
  return (
    <AppBar position="sticky" color="primary">
        <Toolbar>
            <Button component={Link} variant="text" color="inherit" to="/">
                Home
            </Button>
            <Button component={Link} variant="text" color="inherit" to="/connectchess/tictactoe">
                井字棋
            </Button>
            <Button component={Link} variant="text" color="inherit" to="/connectchess/tictactoespecial">
                井字棋變化版
            </Button>
            <Button component={Link} variant="text" color="inherit" to="/connectchess/gomoku">
                五子棋簡化版
            </Button>
            <Button component={Link} variant="text" color="inherit" to="/connectchess/connect6">
                六子棋
            </Button>
            <Button component={Link} variant="text" color="inherit" to="/catchchess/othello">
                奧賽羅棋簡化版
            </Button>
        </Toolbar>
        </AppBar>
  );
}
