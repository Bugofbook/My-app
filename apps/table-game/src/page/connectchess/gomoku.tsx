/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { compose } from 'redux';
import { GameInFo, GameMain } from "@my-app-game/react-ui/game";
import {GomokuInitialData} from "@my-app-game/chess/board/oldInitialstatedata";
import { SquaresDeepCopy } from "@my-app-game/chess/chess/oldGameBasic";
// import { addNewChess, ConeectJudge } from '@my-app-game/chess/connect/oldConnectGame';
import { addNewChess, ConeectJudge, willConnectList } from '@my-app-game/chess/connect/oldConnectGame';
import useCenterHook from "@my-app-game/reacthook/chess/oldpush";
// markup


const markEnforce = (currentBoard, gameinfo) => {
  if (gameinfo.gamestate === "Game End") {
    return currentBoard
  }
  if (gameinfo.turns === 0) {
    return currentBoard
  }
  const chess = gameinfo.actionlists[gameinfo.turns - 1]
  const nextPlayerChesses = willConnectList(chess, currentBoard.squares)
  const willconnectArray = nextPlayerChesses.reduce((pre,cur) => {
    const length = cur[0]
    if (length > 5) {
      cur[1].forEach(item => {
        pre[5].push(`${cur[0]}-${item.rowskey}-${item.columnskey}`)
      })
    }
    if (Array.isArray(pre[cur[0] - 1])) {
      cur[1].forEach(item => {
        pre[cur[0] - 1].push(`${item.rowskey}-${item.columnskey}`)
      })
      return pre
    } else {
      pre[cur[0] - 1] = []
      cur[1].forEach(item => {
        pre[cur[0] - 1].push(`${item.rowskey}-${item.columnskey}`)
      })
    }
    return pre
  }, Array(6))
  let newSquare = SquaresDeepCopy(currentBoard.squares)
  newSquare = setTipToSquare([], newSquare, false, '')
  if (willconnectArray[3]?.length > 0) {
    newSquare = setTipToSquare(willconnectArray[3], newSquare, false, 'backgroundcolorYellow')
  } else if (willconnectArray[4]?.length > 0) {
    newSquare = setTipToSquare(willconnectArray[4], newSquare, true, 'backgroundcolorLightgreen')
  }
  currentBoard.squares = newSquare
  return currentBoard
}
const setTipToSquare = (lockChesskeys, squares, lock, className) => {
  const newSquares = SquaresDeepCopy(squares)
  for (let i1 = 0,i1th = newSquares.length; i1 < i1th; i1++) {
    for (let i2 = 0, i2th = newSquares[i1].length; i2 < i2th; i2++) {
      const element = newSquares[i1][i2];
      if (element?.value) {
        element.lock = true
        element.classname = ''
      } else if (lockChesskeys.includes(`${i1}-${i2}`)) {
        element.lock = false
        element.classname = className
      } else {
        element.lock = lock
        element.classname = ''
      }
    }
  }
  return newSquares
}
export const GomokuPage = () => {
  const {history, gameinfo, jumpto, oneClick} = useCenterHook({initialstate: GomokuInitialData, canputJudge: canTicTacToePut, mainchange: tictactoeMainchange});
  const currentBoard = history[gameinfo.turns]
  const players = {
    player1: "Tom",
    player2: "Jerry",
  }
  const gamerule = TicTacToeRule
  const board = markEnforce(currentBoard, gameinfo)
  return (
    <>
      <GameMain
        currentBoard={board}
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
    </>
  )
}

const TicTacToeRule =
	<>
		<li>雙方輪流放子</li>
		<li>先連成一線者得勝</li>
		<li>當有一方連接三顆棋子時會有黃底色提醒</li>
		<li>當有一方連接四顆棋子時會有綠底色強制下棋</li>
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
  const newsquares = SquaresDeepCopy(current.squares);
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
