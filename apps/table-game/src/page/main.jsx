import {useState, useEffect  } from "react";
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
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
        <Grid item xs={12}>
            <title>Home Page</title>
            <Typography variant="body1" color="initial">
                使用nx.js + ReactHook + meterial-UI重新翻修了一次。
            </Typography>
            <Typography variant="body1" color="initial">
                裡面的遊戲是為了練習JS的演算法而做的，比較不注重畫面。
            </Typography>
            <Typography variant="body1" color="initial">
                預定要完成的功能：
            </Typography>
            <Typography variant="body1" color="initial">
                1. 用AWS的雲服務來上傳記錄
            </Typography>
            <Typography variant="body1" color="initial">
                2. 演算法的更新修改
            </Typography>
        </Grid>
    )
}