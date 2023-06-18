/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { compose } from 'redux';
import { GameInFo, GameMain } from "@my-app-game/react-ui/game";
import {OthelloInitialData} from "@my-app-game/chess/board/oldInitialstatedata";
import { oldSquaresDeepCopy, oldaddChessToLists, oldsetChessToSquares} from "@my-app-game/chess/chess/oldGameBasic";
import { calculationArrays, calculationPushableArrays } from "@my-app-game/chess/catch/oldCatchGame";
import useCenterHook from "@my-app-game/reacthook/chess/oldpush";


const getNextPlayerChesses = (chess, squares=[[]]) => {
  const resultArray = []
  for (let i = 0, ith = squares.length ; i < ith; i++) {
    const currentArray = squares[i]
    currentArray.forEach((item, index) => {
      if (item?.value && item.value !== chess.value) {
        resultArray.push(({...item, rowskey: i, columnskey: index}))
        // resultArray.push(({...item, rowskey: index, columnskey: i}))
      }
    })
  }
  return resultArray
}
// const tipConditionFn = () => (chess) => {

// }
const markEnforce = (currentBoard, gameinfo) => {
  const newCurrentBoard = JSON.parse(JSON.stringify(currentBoard))
  let lockChesskeys = []
  if (gameinfo.turns === 0) {
    lockChesskeys = ['4-2', '5-3', '2-4', '3-5']
  } else {
    const chess = gameinfo.actionlists[gameinfo.turns - 1]
    const nextPlayerChesses = getNextPlayerChesses(chess, newCurrentBoard.squares)
    const newLineArray = nextPlayerChesses.flatMap((currentChess) => {
      return calculationPushableArrays(currentChess, newCurrentBoard.squares).filter(array => array.length > 0)
    })
    const newArray = newLineArray.flatMap((array) => array.reverse()[0]).map(item => `${item.rowskey}-${item.columnskey}`)
    lockChesskeys = newArray
  }
  const newSquares = oldSquaresDeepCopy(newCurrentBoard.squares)
  if (lockChesskeys.length === 0) {
    const newplayer = newCurrentBoard.nowplayer === 'player1' ? 'player2' : 'player1'
    newCurrentBoard.nowplayer = newplayer
    console.log('aaa', newCurrentBoard.nowplayer)
    console.log('aaa')
  }
  for (let i1 = 0,i1th = newSquares.length; i1 < i1th; i1++) {
    for (let i2 = 0, i2th = newSquares[i1].length; i2 < i2th; i2++) {
      const element = newSquares[i1][i2];
      if (element?.value) {
        element.lock = true
        element.classname = ''
      } else if (lockChesskeys.includes(`${i1}-${i2}`)) {
        element.lock = false
        element.classname = 'backgroundcolorLightgreen'
      } else {
        element.lock = true
        element.classname = ''
      }
    }
  }
  newCurrentBoard.squares = newSquares
  return newCurrentBoard
}

// markup
export const OthelloPage = () => {
  const {history, gameinfo, jumpto, oneClick} = useCenterHook({initialstate: OthelloInitialData, canputJudge: canTicTacToePut, mainchange: tictactoeMainchange});
  const currentBoard = history[gameinfo.turns]
  const players = {
    player1: "Black",
    player2: "White",
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
        jumpto={(step) => jumpto(step)}
      />
    </>
  )
}

const TicTacToeRule =
	<>
		<li>是奧賽羅棋的”極簡化版“</li>
		<li>雙方輪流放子</li>
		<li>當棋盤上都放滿棋子時，棋子多的玩家得勝</li>
		<li>有一方沒有棋子時，另一方得勝</li>
		<li>標記綠色的格子是建議下棋子的地方</li>
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
    JudgeGame,
    organizeBoard,
    addNewChess,
    )({
      squares: newsquares,
      player1chess: current.player1chess,
      player2chess: current.player2chess,
      actionlists: gameinfo.actionlists.slice(),
      chess: newchess,
      gamestate: gameinfo.gamestate,
    })
}

const addNewChess = (ProcessObject = {}) => {
	const chess = ProcessObject.chess
	ProcessObject.actionlists = oldaddChessToLists(chess,ProcessObject.actionlists)
	ProcessObject.squares = oldsetChessToSquares(chess,ProcessObject.squares)
	return ProcessObject
}
const organizeBoard = (ProcessObject = {}) => {
	const chess = ProcessObject.chess
	const squares = ProcessObject.squares
	const player = chess.owner
	//caculate the array to change chess	and flatten 2-dimension-array to 1-dimension-array
	const changeArrays = calculationArrays(chess, squares).reduce((accumulator,currentValue)=> accumulator.concat(currentValue),[])
	const changenumber = changeArrays.length
	//change chess by array
	if (changenumber > 0){
		ProcessObject.squares = changeArrays.reduce((presquares,nowchess) => oldsetChessToSquares(nowchess,presquares),squares)
	}
	//re-caculate the number of player's chess
	if (player === "player1") {
		ProcessObject.player1chess += changenumber + 1
		ProcessObject.player2chess -= changenumber
	}
	else {
		ProcessObject.player1chess -= changenumber
		ProcessObject.player2chess += changenumber + 1
	}
	return ProcessObject
}

const JudgeGame = (ProcessObject = {}) => {
	const player1chess = ProcessObject.player1chess
	const player2chess = ProcessObject.player2chess
  if (player1chess ===0) {
    ProcessObject.gamestate = "Game End"
    ProcessObject.winner = "player2"
    ProcessObject.loser = "player1"
  }
  if (player2chess ===0) {
    ProcessObject.gamestate = "Game End"
    ProcessObject.winner = "player1"
    ProcessObject.loser = "player2"
  }
  if (player1chess + player2chess >= 64) {
    if (player1chess > player2chess) {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "player1"
      ProcessObject.loser = "player2"
    } else if (player2chess > player1chess) {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "player2"
      ProcessObject.loser = "player1"
    } else {
      ProcessObject.gamestate = "Game End"
      ProcessObject.winner = "No Winner"
      ProcessObject.loser = "No Loser"
    }
  } else {
    ProcessObject.gamestate = "Game Playing"
    ProcessObject.winner = ""
    ProcessObject.loser = ""
  }
	return ProcessObject
}
