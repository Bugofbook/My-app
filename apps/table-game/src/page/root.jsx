import {useState, useEffect, useContext  } from "react";
// import { useNavigate } from 'react-router-dom'

import { Layout } from "../layout";
import { Outlet } from "react-router-dom";
// import { GlobalContext } from "../content/global";

export const Root = () => {
    const [test, settest] = useState('')
    // const { userSystem } = useContext(GlobalContext);
    // const navigate = useNavigate()
    // useEffect(() => {
    //     console.log('aaa', userSystem.isLogin())
    //     if ( !userSystem.isLogin() ) {
    //         console.log('沒有登入')
    //         navigate('/login')
    //     }
    // }, [navigate, userSystem])
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
            <Outlet />
        </Layout>
    )
}