import {useState, useEffect  } from "react";

export const LockRegistration = () => {
    const [test, settest] = useState('')
    useEffect(() => {
        if (test !== '') {
            console.log('test', test)
        } else {
            console.log('lockRegistration')
            settest('lockRegistration')
        }
    }, [test])
    return (
        <>
            <h1>LockRegistration</h1>
            <p>LockRegistration</p>
        </>
    )
}