/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Board from './Board'
// import { Box } from '@mui/system';
import Grid from '@mui/material/Grid'

 const GameMain = ({currentBoard, gameinfo, players, gamerule, mainchange=f=>f}) => {
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
export default GameMain
const showgamestate = (info,current,players) =>{
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
