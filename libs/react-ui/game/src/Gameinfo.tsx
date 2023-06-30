/* eslint-disable @typescript-eslint/ban-ts-comment */
// import Grid from '@mui/system/Grid';
import { Box } from '@mui/system';
import Grid from '@mui/material/Grid'
import type { GameState } from '@my-app-game/chess/information'
import type { ChessSet } from "@my-app-game/chess/chess/type"

export function GameInFo({ players, history, gameinfo, jumpto}: {players: any, history: any[], gameinfo: any, jumpto: (prop: any) => any})  {
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
function GameStepShow({history, players, list, jumpto}: {history: any[], players: any, list: any[], jumpto: (prop:any) => any}) {
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
type GameHistory<Player extends string> = {
  gameState: GameState<Player>,
  chessSets: Array<ChessSet>,
}
export function GameInFo1<Player extends string>({ history, UserData, jumpto}: { history: Array<GameHistory<Player>>, UserData: Record<Player, string>, jumpto: (step: number) => void}) {
	return (
		<Grid item xs={12} sm={4}>
			<h2>遊戲歷程{/*Game Step*/}</h2>
			<p>點擊按鍵，可以跳到特定的狀態。{/*there are all steps in the game , click bottom for  jumping to special state of Game*/}</p>
			{/* <p>遊戲結束時，可以把記錄存在本機。When game is end , you can save data to local</p> */}
			{/* <p>遊戲結束時，可以把記錄存在本機。When game is end , you can save data to local</p> */}
			{/* <GameEndBottom gamestate={info.gamestate} adddata={() => adddata()}/> */}
			<GameStepShow1 history={history} UserData={UserData} jumpto={(step) => jumpto(step)} />
		</Grid>
	)
}

function caculateBottonText<Player extends string>(currentGameHistory: GameHistory<Player>, UserData: Record<Player, string>) {
  const currentState = currentGameHistory.gameState.gameState
  if (currentState === 'start') {
    return '回到開始'
  }
  const ChessLocationString = currentGameHistory.chessSets.map((element) => {
    if (element === null || element.to === null || element.from !== null) {
      return ''
    }
    return `(${element.to[0] + 1},${element.to[1] + 1})`
  }).filter(e=>e).join(',')
  const currentPlayer = currentGameHistory.chessSets['0']?.owner  as Player || 'unknown' as Player
  const playerName = Object.hasOwnProperty.call(UserData, currentPlayer) ? UserData[currentPlayer] : currentPlayer
  if (currentState === 'end') {
    return `${playerName} 放棋子到 ${ChessLocationString} 遊戲結束`
  }
  return `${playerName} 放棋子到 ${ChessLocationString}`
}
function GameStepShow1<Player extends string>({history, UserData, jumpto}: { history: Array<GameHistory<Player>>, UserData: Record<Player, string>, jumpto: (step: number) => void}) {
	return (
		<Box sx={{ display: 'flex', flexDirection: 'column', width: '200px'}}>
		{
			history.map((element,step) => {
				const libotton = caculateBottonText(element, UserData)
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
