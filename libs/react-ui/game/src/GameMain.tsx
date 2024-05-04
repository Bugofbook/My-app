/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Board from './Board'
// import { Box } from '@mui/system';
import Grid from '@mui/material/Grid'

export  const GameMain = ({currentBoard, gameinfo, players, gamerule, mainchange=f=>f}) => {
	return (
	<Grid item xs={12} sm={8}>
	  <h1>{gameinfo.gamename}</h1>
	  <h2>{showgamestate(gameinfo,currentBoard,players)}</h2>
	  <Board
		Squares= {currentBoard.squares}
		className='board'
		change={(rowskey, columnskey) => mainchange(rowskey, columnskey)}
	  />
	  <h2>本遊戲的說明</h2>
	  <ol>{gamerule}</ol>
	</Grid>
	)
  }
export const GameMain1 = ({gameState, gameinfo, UserData, gamerule, children}) => {
	return (
	<Grid item xs={12} sm={8}>
	  <h1>{gameinfo.gameName}</h1>
	  <h2>{showgamestate1(gameState,UserData)}</h2>
	  {/* <Board
		Squares= {currentBoard.squares}
		className='board'
		change={(rowskey, columnskey) => mainchange(rowskey, columnskey)}
	  /> */}
    {
      children
    }
	  <h2>本遊戲的說明</h2>
	  <ol>{gamerule}</ol>
	</Grid>
	)
  }
export const showgamestate = (info,current,players) =>{
	if (info.gamestate === "Game End") {
	if (info.winner !== "No Winner") {
		return `Winner is ${players[info.winner]}, Loser is ${players[info.loser]}`
	}
	else {
		return `The Ｇame ended in a tie.`
	}
}
else {
	return `${players[current.nowplayer]} ,  Please push your Chess`
}}
export const showgamestate1 = (gameState,players) =>{
  if (gameState.gameState !== "end") {
    // `${players[current.nowplayer]} ,  Please push your Chess`
    return `${players[gameState.player]},  請下棋`
  }
  if (gameState.winner !== "" && gameState.loser !== "") {
    // return `Winner is ${players[gameState.winner]}, Loser is ${players[gameState.loser]}`
    return `${players[gameState.winner]}勝利了, ${players[gameState.loser]}失敗了`
  } else {
    return `遊戲平局.`
  }
}
