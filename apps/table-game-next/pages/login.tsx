import {useState, useEffect, useContext  } from "react";
// import { Root } from "../layout/root";
import Link from 'next/link'
// import { GlobalContext } from "../content/global";
// import Axios from "axios";

const Login = () => {
    const [test, settest] = useState('')
    // const { userSystem } = useContext(GlobalContext);
    // const loginProcess = async ({pCode, id, pwd}) => {
    //     console.log('data', loginData)
    // }

    useEffect(() => {
        if (test !== '') {
            console.log('test', test)
        } else {
            console.log('login')
            settest('login')
        }
    }, [test])
    return (
        <>
            <h1>login</h1>
            <p>Login</p>
            <Link href="/">首頁</Link>
        </>
    )
}
export default Login
// passport.use(new LocalStrategy({
//     usernameField: 'id',
//     passwordField: 'pwd',
//     passReqToCallback: true
// }, async (req, id, pwd, done) => {
//     try {
//         const pCode = req.body.pCode ? req.body.pCode.toLowerCase() : '';
//         if (!pCode || !global.PROJ_MAP[pCode])
//             throw `Project code not exist`;
//         let retVal = await alzkAxios.coreAPI('/post/project/login',{ pCode: pCode, id: id }, {id:id, pwd:pwd});
//         if (retVal.status != 'ok')
//             return done(null, false, { status: retVal.status, errorText: retVal.errortext });
//         return done(null, { pCode: pCode, id: id }, retVal.data );  // returned to authenticate with (err, user, infoForClient). will call serializeUser with loginSession={ id, pCode }
//     } catch(err) {
//         return done(err, false);
//     };
// })
// );