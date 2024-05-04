import { useCallback, useReducer, useEffect, useState } from 'react';
import type { UserData, GameState } from "@my-app-game/reacthook/chess"
import { useGameState, gameStateActions } from "@my-app-game/reacthook/chess"
import type { ChessesState } from "@my-app-game/reacthook/chess"
import type { ChessLocation } from "@my-app-game/chess/chess"
import { chessesStateReducer, chessesStateAction } from "@my-app-game/reacthook/chess"
import type { ChessSet } from '@my-app-game/chess/chess'
import { updateSquaresFromChessSets } from '@my-app-game/chess/chess'
import { getConnectLengthFromSquares } from '@my-app-game/chess/connect'
import { useGameHistory } from '@my-app-game/reacthook/chess'
const SATRTCHESSES = new Map([
  ['0,0', null],
  ['0,1', null],
  ['0,2', null],
  ['1,0', null],
  ['1,1', null],
  ['1,2', null],
  ['2,0', null],
  ['2,1', null],
  ['2,2', null]
])

type composeData= {
  putChess: ChessSet & {to: ChessLocation},
  chessesMap: ChessesState,
  userData: UserData<'player1' | 'player2'>,
}
function caculateIsEndGame(props: composeData): UpdateStateProps {
  const resultArray = getConnectLengthFromSquares(props.chessesMap,props.putChess)
  return ({
    isGameEnd: Math.max(...resultArray) >= 3,
    winner: props.userData.player,
    loser: props.userData.nextPlayer,
    nextPlayer: props.userData.nextPlayer,
    putChess: props.putChess
  })
}
type UpdateStateProps = {
  isGameEnd: boolean,
  winner: string,
  loser: string,
  nextPlayer: 'player1' | 'player2',
  putChess: ChessSet
}
type GameHistory = {
  gameState: GameState<"player1" | "player2">,
  chessSet: ChessSet | null,
}
export function putChessAction(chessesMap: ChessesState, putChess: ChessSet & {to: ChessLocation}, userData: UserData<'player1' | 'player2'>): {type: 'putChess', payload: composeData} {
  return {
    type: 'putChess',
    payload: {
      chessesMap,
      putChess,
      userData,
    }
  }
}
export function jumpHistoryAction(history: GameHistory[], step: number): {type: 'jumpHistory', payload: {history: GameHistory[], step: number}} {
  return {
    type: 'jumpHistory',
    payload: {
      history,
      step,
    }
  }
}
export function useTictactoeGame() {
  const [action, setaction] = useState<'' | 'putChess'>('')
  const [gameState, dispatchGameState] = useGameState<'player1' | 'player2'>('player1')
  const [chessSet, setchessSet] = useState<ChessSet | null>(null)
  const [chessesMap, dispatchChessesMap] = useReducer(chessesStateReducer<undefined>, SATRTCHESSES)
  const [gameHistory, {saveHistory, jumpHistory}] = useGameHistory<GameHistory>({gameState, chessSet: null})
  const updateState = useCallback(({isGameEnd,winner,loser,nextPlayer, putChess}: UpdateStateProps) => {
    dispatchChessesMap(chessesStateAction.putChess(putChess))
    if (isGameEnd) {
      dispatchGameState(gameStateActions.setResult({winner,loser}))
    } else {
      dispatchGameState(gameStateActions.nextTurn(nextPlayer))
    }
  }, [])
  const setAllState = useCallback(({gameState, chessesMap}: {gameState: GameState<'player1' | 'player2'>, chessesMap: ChessesState}) => {
    dispatchGameState(gameStateActions.setState(gameState))
    dispatchChessesMap(chessesStateAction.setChessesState(chessesMap))
  },[])
  useEffect(() => {
    if (action === 'putChess') {
      saveHistory({
        gameState,
        chessSet,
      })
      setchessSet(null)
      setaction('')
    }
  }, [chessesMap, gameState, saveHistory])

  const dispatch = useCallback((action: ReturnType<typeof putChessAction> | ReturnType<typeof jumpHistoryAction>) => {
    switch (action.type) {
      case 'putChess': {
        const result = caculateIsEndGame(action.payload)
        updateState(result)
        setchessSet(action.payload.putChess)
        setaction('putChess')
        break
      }
      case 'jumpHistory': {
        const {history, step} = action.payload
        const ChessSets = history.slice(0, step + 1).map(({chessSet}) => chessSet).filter((chessSet) => chessSet !== null) as Array<ChessSet>
        const currentChessesMap = updateSquaresFromChessSets(SATRTCHESSES, ChessSets)
        const currentGameState = history[step].gameState
        setAllState({gameState: currentGameState, chessesMap: currentChessesMap})
        jumpHistory(step)
        break
      }
      default: {
        break
      }
    }
  }, [])
  return [
    {
      gameState,
      chessesMap,
      gameHistory,
    },dispatch
  ] as const
}
export const tictactoeGameAction = {
  putChess: putChessAction,
  jumpHistory: jumpHistoryAction
}
