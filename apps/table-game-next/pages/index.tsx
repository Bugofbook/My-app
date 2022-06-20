import {useState, useEffect  } from "react";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Layout from '../layout'
const Index = () => {
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
      <Layout>
        <Grid item xs={12}>
            <title>Home Page</title>
            <Typography variant="body1" color="initial">
                使用nx.js + ReactHook + meterial-UI重新翻修。
            </Typography>
            <Typography variant="body1" color="initial">
                GithubPages: https://bugofbook.github.io/My-app/
            </Typography>
            <Typography variant="body1" color="initial">
                目標：
            </Typography>
            <Typography variant="body1" color="initial">
                1. 練習JS的演算法。
            </Typography>
            <Typography variant="body1" color="initial">
                2. monorepo的前後端整合
            </Typography>
            <Typography variant="body1" color="initial">
                2. 前端可能環境：react-dom-router(github pages)、next.js、react-native或vue 
            </Typography>
            <Typography variant="body1" color="initial">
                2. 後端可能環境：AWS no-server solution、express、Firebase 
            </Typography>
            <Typography variant="body1" color="initial">
                近期預定要完成的功能：
            </Typography>
            <Typography variant="body1" color="initial">
                1. 用AWS的雲服務來上傳記錄
            </Typography>
            <Typography variant="body1" color="initial">
                2. 演算法的更新修改
            </Typography>
        </Grid>
      </Layout>
    )
}
export default Index