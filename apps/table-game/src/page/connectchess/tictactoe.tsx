import { Stage } from 'react-konva';
import { GameMain1, GameInFo1 } from "@my-app-game/react-ui/game";
import type { UserData } from "@my-app-game/chess/information"
import { getConnectLengthFromSquares } from '@my-app-game/chess/connect'
import { TictactoeBoard } from '@my-app-game/react-ui/board'
import { createChessSet } from '@my-app-game/chess/chess'
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
  gameName: '井字棋',
}

export const TicTacToePage = () => {
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
    const connectLengthArray = getConnectLengthFromSquares(chessesMap,putChess)
    const isGameEnd = Math.max(...connectLengthArray) >= 3
    dispatch(putGameActions.updateChesses(chessesMap, [putChess]))
    dispatch(putGameActions.endTurn(gameState, [putChess], isGameEnd, currentPlayerData.player, currentPlayerData.nextPlayer, currentPlayerData.nextPlayer))
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
		<li>雙方輪流放子</li>
		<li>先連成一線者得勝</li>
	</>
