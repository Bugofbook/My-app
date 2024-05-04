import { Stage } from 'react-konva';
import { GameMain1, GameInFo1 } from "@my-app-game/react-ui/game";
import type { UserData } from "@my-app-game/chess/information"
import { getConnectLengthFromSquares } from '@my-app-game/chess/connect'
import { TictactoeBoard } from '@my-app-game/react-ui/board'
import { createChessSet, deleteChessesFromSquares } from '@my-app-game/chess/chess'
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

const SATRTCHESSES = JSON.stringify(Array(3).fill(0).flatMap((_,rowIndex) => {
  return Array(3).fill(0).map((_,columnIndex) => [`${rowIndex},${columnIndex}`, null])
}))

const GANEINFO = {
  gameName: '井字棋特殊版',
}

export const TicTacToeSpecialPage = () => {
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
    let newChessesMap = new Map(chessesMap)
    const deleteChess = gameHistory[gameHistory.length - 6]?.chessSets[0] || null
    if (deleteChess) {
      newChessesMap = deleteChessesFromSquares(newChessesMap, [deleteChess])
    }
    const connectLengthArray = getConnectLengthFromSquares(newChessesMap,putChess)
    const isGameEnd = Math.max(...connectLengthArray) >= 3
    const updateChesses = deleteChess ? [putChess, {...deleteChess, to: null, from: deleteChess.to}] :[putChess]
    dispatch(putGameActions.updateChesses(updateChesses))
    dispatch(putGameActions.endTurn(gameState, updateChesses, isGameEnd, currentPlayerData.player, currentPlayerData.nextPlayer, currentPlayerData.nextPlayer))
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
        <Stage width={30 * 3 + 100} height={30 * 3 + 100}>
          <TictactoeBoard
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
		<li>是井字棋的變化版</li>
		<li>雙方輪流放子</li>
		<li>先連成一線者得勝</li>
		<li>當現在盤面上有六顆棋子時。在第七個棋子落下前，會先移出最早放的棋子，再放下第七顆</li>
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
//     ConeectJudge(3),
//     addNewChess,
//     removeOldChess
//     )({
//       squares: newsquares,
//       lists: current.showlists.slice(),
//       actionlists: gameinfo.actionlists.slice(),
//       chess: newchess,
//       gamestate: gameinfo.gamestate,
//     })
// }
