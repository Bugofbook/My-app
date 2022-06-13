/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
// import Grid from '@mui/system/Grid';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid'

// export const GameInFo = ({players={},history=[], info={}, adddata=f=>f ,jumpto=f=>f}) => {
const GameInFo = ({players={},history=[], gameinfo={}, jumpto=f=>f}) => {
	return (
		<Grid item xs={12} sm={4}>
			<h2>遊戲歷程{/*Game Step*/}</h2>
			<p>點擊按鍵，可以跳到特定的狀態。{/*there are all steps in the game , click bottom for  jumping to special state of Game*/}</p>
			{/* <p>遊戲結束時，可以把記錄存在本機。When game is end , you can save data to local</p> */}
			{/* <p>遊戲結束時，可以把記錄存在本機。When game is end , you can save data to local</p> */}
			{/* <GameEndBottom gamestate={info.gamestate} adddata={() => adddata()}/> */}
			<GameStepShow history={history} players={players} list={gameinfo.actionlists} jumpto={(step) => jumpto(step)} />
		</Grid>
	)
}
export default GameInFo

const GameStepShow = ({history=[], players={} , list=[],jumpto=f=>f}) => {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px'}}>
		{
			history.map((_element,step) => {
				const libotton = step ?
				`${players[list[step - 1].owner]} Push chess to ( ${list[step - 1].rowskey + 1},${list[step - 1].columnskey + 1} )` :
				`Go to Start`
				return (
					<Box sx={{cursor: 'pointer'}} component='button' key={step} onClick={() => jumpto(step)}>
						{libotton}
					</Box>
					)
				})
		}
		</Box>
	)
}