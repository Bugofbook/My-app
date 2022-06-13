import {useState, useEffect  } from "react";
import { Link } from "react-router-dom";
export const Main = () => {
    const [test, settest] = useState('')
    useEffect(() => {
        if (test !== '') {
            console.log('test', test)
        }else {
            console.log('main')
            settest('Main')
        }
    }, [test])
    return (
        <>
            <h1>Main</h1>
            <p>Main</p>
            <Link to="/lockRegistration">裝置註冊頁面</Link>
        </>
    )
}