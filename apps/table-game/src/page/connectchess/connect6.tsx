import { useState } from 'react';
import { Stage } from 'react-konva';
import { GameMain1, GameInFo1 } from "@my-app-game/react-ui/game";
import type { UserData } from "@my-app-game/chess/information"
import type { ChessSet } from "@my-app-game/chess/chess/type"
import { getConnectLengthFromSquares } from '@my-app-game/chess/connect'
import { usePutChessGame, putGameActions } from '@my-app-game/reacthook/game'
import { Connect6Board } from '@my-app-game/react-ui/board'
import { createChessSet } from '@my-app-game/chess/chess'


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
const STARTCHESSES1 = new Map(Array(19).fill(0).flatMap((_, index) => {
  return Array(19).fill(0).map((_, index2) => {
    return [`${index},${index2}`, null]
  })
}))
const STARTCHESSES2: Map<string, ChessSet | null> = new Map([
  ['9,9', {id: '99', name: 'blackChess', to: [9,9], owner: 'player1', from: null}],
])

const SATRTCHESSES = new Map([...STARTCHESSES1, ...STARTCHESSES2])
const SATRTCHESSESSTRING = JSON.stringify([...SATRTCHESSES])

const GANEINFO = {
  gameName: '六子棋',
}
export const Connect6Page = () => {
  const players = {
    player1: "黑方",
    player2: "白方",
  }
  const gamerule = GameRule
  const [{gameState,chessesMap, gameHistory}, dispatch] = usePutChessGame<'player1' | 'player2'>(SATRTCHESSESSTRING, 'player2')
  const [putCount, setputCount] = useState(0)
  const [putChesses, setputChesses] = useState<Array<ChessSet>>([])
  const putOneChess = (location: string) => {
    const currentPlayerData = USERDATA.get(gameState.player) as UserData<'player1' | 'player2'>
    const putChess = createChessSet({
      name: currentPlayerData.chessName,
      to: location.split(',').map((item) => parseInt(item, 10)),
      owner: currentPlayerData.player,
    })
    const connectLengthArray = getConnectLengthFromSquares(chessesMap,putChess)
    const isGameEnd = Math.max(...connectLengthArray) >= 6
    if (isGameEnd) {
      dispatch(putGameActions.updateChesses([...putChesses, putChess]))
      dispatch(putGameActions.endTurn(gameState, [...putChesses, putChess], isGameEnd, currentPlayerData.player, currentPlayerData.nextPlayer, currentPlayerData.nextPlayer))
    } else if (putCount === 1) {
      dispatch(putGameActions.updateChesses([putChess]))
      setputChesses([])
      setputCount(0)
      dispatch(putGameActions.endTurn(gameState, [...putChesses, putChess], isGameEnd, currentPlayerData.player, currentPlayerData.nextPlayer, currentPlayerData.nextPlayer))
    } else {
      dispatch(putGameActions.updateChesses([putChess]))
      setputChesses([putChess])
      setputCount(1)
    }
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
        <Stage width={30 * 19 + 100} height={30 * 19 + 100}>
          <Connect6Board
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

const GameRule =
	<>
		<li>雙方輪流放二顆棋子</li>
		<li>先連成一線者得勝</li>
		<li>當有一方連接四顆棋子時會有黃底色提醒</li>
		<li>當有一方連接五顆棋子時會有綠底色強制下棋</li>
	</>
