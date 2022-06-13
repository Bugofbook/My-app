import {useState, useEffect  } from "react";
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

// import { useNavigate } from 'react-router-dom'

import { Layout } from "../layout";
import { Outlet } from "react-router-dom";
// import { GlobalContext } from "../content/global";

export const Root = () => {
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
        <Layout>
            <HeadMenu />
            <Outlet />
        </Layout>
    )
}


const  HeadMenu = () =>  {
  return (
    <Toolbar>
        {/* <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="menu"
        sx={{ mr: 2 }}
        >
        <MenuIcon />
        </IconButton> */}
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
        News
        </Typography>
        <Button color="inherit">Login</Button>
    </Toolbar>
  );
}