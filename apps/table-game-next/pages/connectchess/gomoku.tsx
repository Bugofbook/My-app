/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { compose } from 'redux';
import { GameInFo, GameMain } from "@my-app-game/react-ui/game";
import {GomokuInitialData} from "@my-app-game/chess/board/oldInitialstatedata";
import { oldSquaresDeepCopy } from "@my-app-game/chess/chess/oldGameBasic";
import { addNewChess, ConeectJudge } from '@my-app-game/chess/connect/oldConnectGame';
import useCenterHook from "@my-app-game/reacthook/chess/oldpush";
import Layout from '../../layout'

// markup
const GomokuPage = () => {
  const {history, gameinfo, jumpto, oneClick} = useCenterHook({initialstate: GomokuInitialData, canputJudge: canTicTacToePut, mainchange: tictactoeMainchange});
  const currentBoard = history[gameinfo.turns]
  const players = {
    player1: "Tom",
    player2: "Jerry",
  }
  const gamerule = TicTacToeRule
  return (
    <Layout>
      <GameMain
        currentBoard={currentBoard}
        gameinfo={gameinfo}
        players={players}
        gamerule={gamerule}
        mainchange={oneClick}
      />
      <GameInFo
        players={players}
        history={history}
        gameinfo={gameinfo}
        // adddata={()=>this.adddata(info.gamename,info.actionlists)}
        jumpto={(step) => jumpto(step)}
      />
    </Layout>
  )
}
export default GomokuPage
const TicTacToeRule =
	<>
		<li>雙方輪流放子</li>
		<li>先連成一線者得勝</li>
	</>

const canTicTacToePut = (gamehistory, gameinfo, rowskey, columnskey) => {
  if (gameinfo.gamestate === "Game End") {
    return false
  }
  const currentBoard = gamehistory[gamehistory.length - 1].squares
  return !currentBoard[rowskey][columnskey].lock
}
const tictactoeMainchange = (gamehistory, gameinfo, rowskey, columnskey) => {
  const history = gamehistory.slice(0, gameinfo.turns + 1);
  const current = history[history.length - 1];
  const player = current.nowplayer
  const newsquares = oldSquaresDeepCopy(current.squares);
  const  newchess = {
    rowskey: rowskey,
    columnskey: columnskey,
    value: (player === "player1") ? "BlackChess" : "WhiteChess",
    owner: player,
    lock: true,
  }
  return compose(
    ConeectJudge(5),
    addNewChess
    )({
      squares: newsquares,
      lists: current.showlists.slice(),
      actionlists: gameinfo.actionlists.slice(),
      chess: newchess,
      gamestate: gameinfo.gamestate,
    })
}
