import { Stage } from 'react-konva';

import { OthelloBoard } from '@my-app-game/react-ui/board'

import type { UserData } from "@my-app-game/chess/information"
import type { ChessLocation, ChessSet } from "@my-app-game/chess/chess/type"
import { GameMain1, GameInFo1 } from "@my-app-game/react-ui/game";
import { createChessSet } from '@my-app-game/chess/chess'

import { getChageChessFromSquares } from '@my-app-game/chess/catch'
import { usePutChessGame, putGameActions } from '@my-app-game/reacthook/game'


const USERDATA = new Map([
  [
    'player1', {
    player: 'player1',
    nextPlayer: 'player2',
    chessName: 'blackChess',
  }],[
  'player2', {
    player: 'player2',
    nextPlayer: 'player1',
    chessName: 'whiteChess',
  }
  ]
]) as Map<'player1' | 'player2', UserData<'player1' | 'player2'>>

const STARTCHESSES1 = new Map(Array(8).fill(0).flatMap((_, index) => {
  return Array(8).fill(0).map((_, index2) => {
    return [`${index},${index2}`, null]
  })
}))
const STARTCHESSES2: Map<string, ChessSet | null> = new Map([
  ['3,3', {id: '33', name: 'blackChess', to: [3,3], owner: 'player1', from: null}],
  ['3,4', {id: '34', name: 'whiteChess', to: [3,4], owner: 'player2', from: null}],
  ['4,3', {id: '43', name: 'whiteChess', to: [4,3], owner: 'player2', from: null}],
  ['4,4', {id: '44', name: 'blackChess', to: [4,4], owner: 'player1', from: null}],
])
const SATRTEMPTYCHESSES = new Map([...STARTCHESSES1, ...STARTCHESSES2]) as Map<string, ChessSet | null>
const SATRTCHESSES = JSON.stringify([...SATRTEMPTYCHESSES.entries()])
const GANEINFO = {
  gameName: '奧賽羅棋',
}

// const getNextPlayerChesses = (chess, squares=[[]]) => {
//   const resultArray = []
//   for (let i = 0, ith = squares.length ; i < ith; i++) {
//     const currentArray = squares[i]
//     currentArray.forEach((item, index) => {
//       if (item?.value && item.value !== chess.value) {
//         resultArray.push(({...item, rowskey: i, columnskey: index}))
//         // resultArray.push(({...item, rowskey: index, columnskey: i}))
//       }
//     })
//   }
//   return resultArray
// }
// const tipConditionFn = () => (chess) => {

// }
// const markEnforce = (currentBoard, gameinfo) => {
//   const newCurrentBoard = JSON.parse(JSON.stringify(currentBoard))
//   let lockChesskeys = []
//   if (gameinfo.turns === 0) {
//     lockChesskeys = ['4-2', '5-3', '2-4', '3-5']
//   } else {
//     const chess = gameinfo.actionlists[gameinfo.turns - 1]
//     const nextPlayerChesses = getNextPlayerChesses(chess, newCurrentBoard.squares)
//     const newLineArray = nextPlayerChesses.flatMap((currentChess) => {
//       return calculationPushableArrays(currentChess, newCurrentBoard.squares).filter(array => array.length > 0)
//     })
//     const newArray = newLineArray.flatMap((array) => array.reverse()[0]).map(item => `${item.rowskey}-${item.columnskey}`)
//     lockChesskeys = newArray
//   }
//   const newSquares = oldSquaresDeepCopy(newCurrentBoard.squares)
//   if (lockChesskeys.length === 0) {
//     const newplayer = newCurrentBoard.nowplayer === 'player1' ? 'player2' : 'player1'
//     newCurrentBoard.nowplayer = newplayer
//     console.log('aaa', newCurrentBoard.nowplayer)
//     console.log('aaa')
//   }
//   for (let i1 = 0,i1th = newSquares.length; i1 < i1th; i1++) {
//     for (let i2 = 0, i2th = newSquares[i1].length; i2 < i2th; i2++) {
//       const element = newSquares[i1][i2];
//       if (element?.value) {
//         element.lock = true
//         element.classname = ''
//       } else if (lockChesskeys.includes(`${i1}-${i2}`)) {
//         element.lock = false
//         element.classname = 'backgroundcolorLightgreen'
//       } else {
//         element.lock = true
//         element.classname = ''
//       }
//     }
//   }
//   newCurrentBoard.squares = newSquares
//   return newCurrentBoard
// }

// markup
function caculateGameEnd(chessesMap: Map<string, ChessSet | null>, centerChess: ChessSet & {to: ChessLocation}, userData: UserData<'player1' | 'player2'>): {
  isGameEnd: boolean,
  winner: 'player1' | 'player2' | '',
  loser: 'player1' | 'player2' | '',
  changeChesses: ChessSet[],
} {
  const classifyChesses = [...chessesMap.values()].reduce((preChesses, chess) => {
    const {owner} = chess ||  {}
    if (owner === 'player1') {
      preChesses.player1 += 1
    } else if (owner === 'player2') {
      preChesses.player2 += 1
    } else {
      preChesses.empty += 1
    }
    return preChesses
  }, {player1: 0, player2: 0, empty: 0})
  const changeChesses = getChageChessFromSquares(chessesMap, centerChess)
  const emptyCount = classifyChesses.empty - 1
  let player1Count = classifyChesses.player1
  let player2Count = classifyChesses.player2
  if (centerChess.owner === 'player1') {
    player1Count += changeChesses.length + 1
    player2Count -= changeChesses.length
  } else {
    player1Count -= changeChesses.length
    player2Count += changeChesses.length + 1
  }
  if (player1Count === 0) {
    return ({
      isGameEnd: true,
      winner: 'player2',
      loser: 'player1',
      changeChesses,
    })
  }
  if (player2Count === 0) {
    return ({
      isGameEnd: true,
      winner: 'player1',
      loser: 'player2',
      changeChesses,
    })
  }
  return ({
    isGameEnd: emptyCount === 0,
    winner: player1Count === player2Count ? "" : userData.player,
    loser: player1Count === player2Count ? "" : userData.nextPlayer,
    changeChesses,
  })
}

export const OthelloPage = () => {
  const players = {
    player1: "黑方",
    player2: "白方",
  }
  const gamerule = TicTacToeRule
  const [{gameState,chessesMap, gameHistory}, dispatch] = usePutChessGame<'player1' | 'player2'>(SATRTCHESSES, 'player1')
  const putOneChess = (location: string) => {
    const currentPlayerData = USERDATA.get(gameState.player) as UserData<'player1' | 'player2'>
    const putChess = createChessSet({
      name: currentPlayerData.chessName,
      to: location.split(',').map((item) => parseInt(item, 10)),
      owner: currentPlayerData.player,
    })
    const result = caculateGameEnd(chessesMap, putChess, currentPlayerData)
    const updateChessesArray = [
      putChess,
      ...result.changeChesses.map((item) => ({...item, owner: putChess.owner, name: putChess.name, form: item.to, to: item.to}))
    ]
    dispatch(putGameActions.updateChesses(updateChessesArray))
    dispatch(putGameActions.endTurn(gameState, updateChessesArray, result.isGameEnd, result.winner, result.loser, currentPlayerData.nextPlayer))
  }
  const jumpHistory = (step: number) => {
    dispatch(putGameActions.jumpHistory(gameHistory, step))
  }

  return (
    <>
      <GameMain1
        gameState={gameState}
        gameinfo={GANEINFO}
        UserData={players}
        gamerule={gamerule}
      >
        <Stage width={30 * 8 + 100} height={30 * 8 + 100}>
          <OthelloBoard
            tableX={48}
            tableY={48}
            gameState={gameState.gameState}
            chessesList={chessesMap}
            onClickSquare={putOneChess}
            />
        </Stage>
      </GameMain1>
      <GameInFo1
        UserData={players}
        history={gameHistory}
        jumpto={jumpHistory}
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

// const canTicTacToePut = (gamehistory, gameinfo, rowskey, columnskey) => {
//   if (gameinfo.gamestate === "Game End") {
//     return false
//   }
//   const currentBoard = gamehistory[gamehistory.length - 1].squares
//   return !currentBoard[rowskey][columnskey].lock
// }
// const tictactoeMainchange = (gamehistory, gameinfo, rowskey, columnskey) => {
//   const history = gamehistory.slice(0, gameinfo.turns + 1);
//   const current = history[history.length - 1];
//   const player = current.nowplayer
//   const newsquares = oldSquaresDeepCopy(current.squares);
//   const  newchess = {
//     rowskey: rowskey,
//     columnskey: columnskey,
//     value: (player === "player1") ? "BlackChess" : "WhiteChess",
//     owner: player,
//     lock: true,
//   }
//   return compose(
//     JudgeGame,
//     organizeBoard,
//     addNewChess,
//     )({
//       squares: newsquares,
//       player1chess: current.player1chess,
//       player2chess: current.player2chess,
//       actionlists: gameinfo.actionlists.slice(),
//       chess: newchess,
//       gamestate: gameinfo.gamestate,
//     })
// }

// const addNewChess = (ProcessObject = {}) => {
// 	const chess = ProcessObject.chess
// 	ProcessObject.actionlists = oldaddChessToLists(chess,ProcessObject.actionlists)
// 	ProcessObject.squares = oldsetChessToSquares(chess,ProcessObject.squares)
// 	return ProcessObject
// }
// const organizeBoard = (ProcessObject = {}) => {
// 	const chess = ProcessObject.chess
// 	const squares = ProcessObject.squares
// 	const player = chess.owner
// 	//caculate the array to change chess	and flatten 2-dimension-array to 1-dimension-array
// 	const changeArrays = calculationArrays(chess, squares).reduce((accumulator,currentValue)=> accumulator.concat(currentValue),[])
// 	const changenumber = changeArrays.length
// 	//change chess by array
// 	if (changenumber > 0){
// 		ProcessObject.squares = changeArrays.reduce((presquares,nowchess) => oldsetChessToSquares(nowchess,presquares),squares)
// 	}
// 	//re-caculate the number of player's chess
// 	if (player === "player1") {
// 		ProcessObject.player1chess += changenumber + 1
// 		ProcessObject.player2chess -= changenumber
// 	}
// 	else {
// 		ProcessObject.player1chess -= changenumber
// 		ProcessObject.player2chess += changenumber + 1
// 	}
// 	return ProcessObject
// }

// const JudgeGame = (ProcessObject = {}) => {
// 	const player1chess = ProcessObject.player1chess
// 	const player2chess = ProcessObject.player2chess
//   if (player1chess ===0) {
//     ProcessObject.gamestate = "Game End"
//     ProcessObject.winner = "player2"
//     ProcessObject.loser = "player1"
//   }
//   if (player2chess ===0) {
//     ProcessObject.gamestate = "Game End"
//     ProcessObject.winner = "player1"
//     ProcessObject.loser = "player2"
//   }
//   if (player1chess + player2chess >= 64) {
//     if (player1chess > player2chess) {
//       ProcessObject.gamestate = "Game End"
//       ProcessObject.winner = "player1"
//       ProcessObject.loser = "player2"
//     } else if (player2chess > player1chess) {
//       ProcessObject.gamestate = "Game End"
//       ProcessObject.winner = "player2"
//       ProcessObject.loser = "player1"
//     } else {
//       ProcessObject.gamestate = "Game End"
//       ProcessObject.winner = "No Winner"
//       ProcessObject.loser = "No Loser"
//     }
//   } else {
//     ProcessObject.gamestate = "Game Playing"
//     ProcessObject.winner = ""
//     ProcessObject.loser = ""
//   }
// 	return ProcessObject
// }
