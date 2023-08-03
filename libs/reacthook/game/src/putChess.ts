import { useCallback, useState, Reducer } from 'react';
import type { GameState } from '@my-app-game/chess/information'
import type { ChessesState } from "@my-app-game/reacthook/chess"
import { initGameState, nextTurn, setResult } from '@my-app-game/chess/information'
import type { ChessSet } from '@my-app-game/chess/chess'
import { updateSquaresFromChessSets } from '@my-app-game/chess/chess'
import { chessesStateAction, useChessesState } from "@my-app-game/reacthook/chess"
import { useGameHistory } from '@my-app-game/reacthook/chess'

import type { JumpHistoryAction, EndTurnAtion, PassAction, UpdateChessesAction } from './action';
import { jumpHistoryAction, endTurnAction, passAction, updateChessesAction } from './action';
import { throws } from 'assert';

type GameHistory<Player extends string> = {
  gameState: GameState<Player>,
  chessSets: Array<ChessSet>,
}
type Dispatch<Player extends string> = {
  (action: JumpHistoryAction<GameHistory<Player>>): GameHistory<Player>[];
  (action: EndTurnAtion<Player>): GameState<Player>;
  (action: PassAction<Player>): GameState<Player>;
  (action: UpdateChessesAction<Player>): ChessesState;
}

type Action<Player extends string> = JumpHistoryAction<GameHistory<Player>> | EndTurnAtion<Player> | PassAction<Player> | UpdateChessesAction<Player>

export function usePutChessGame<Player extends string>(StartChessesString: string, startPlayer: Player) {
  const [gameState, setGamestate] = useState<GameState<Player>>(initGameState({player: startPlayer}))
  const [chessesMap, dispatchChessesMap] = useChessesState(new Map(JSON.parse(StartChessesString)) as ChessesState)
  const [gameHistory, {saveHistory, jumpHistory}] = useGameHistory<GameHistory<Player>>({gameState, chessSets: []})
  const dispatch = useCallback((action: Action<Player>) => {
    switch (action.type) {
      case 'updateChesses': {
        return dispatchChessesMap(chessesStateAction.updateChesses(action.payload.chessesMap, action.payload.chesses)) as ChessesState
      }
      case 'endTurn': {
        const {state, chessSets, isGameEnd, winner,loser, player} = action.payload
        const newState = isGameEnd ? setResult(state, {winner,loser}) : nextTurn(state, {player})
        setGamestate(newState)
        saveHistory({
          gameState: newState,
          chessSets: chessSets,
        })
        return newState as GameState<Player>
      }
      case 'pass': {
        const newState = nextTurn(action.payload.state, {player: action.payload.player})
        setGamestate(newState)
        saveHistory({
          gameState: newState,
          chessSets: [],
        })
        return newState as GameState<Player>
      }
      case 'jumpHistory': {
        const {history, step} = action.payload
        const ChessSets = history.slice(0, step + 1).flatMap(({chessSets}) => chessSets).filter((chessSet) => chessSet !== null) as Array<ChessSet>
        const currentChessesMap = updateSquaresFromChessSets(new Map(JSON.parse(StartChessesString)) as ChessesState, ChessSets)
        const currentGameState = history[step].gameState
        setGamestate(currentGameState)
        dispatchChessesMap(chessesStateAction.setChessesState(currentChessesMap))
        jumpHistory(step)
        return history.slice(0, step + 1) as GameHistory<Player>[]
      }
      default: {
        throw new Error("usePutChessGame Error");
      }
    }
  }, [StartChessesString, dispatchChessesMap, jumpHistory, saveHistory]) as Dispatch<Player>
  return [
    {
      gameState,
      chessesMap,
      gameHistory,
    },dispatch
  ] as const
}
export const putGameActions = {
  updateChesses: updateChessesAction,
  endTurn: endTurnAction,
  passAction: passAction,
  jumpHistory: jumpHistoryAction
}
