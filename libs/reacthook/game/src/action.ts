import type { GameState } from '@my-app-game/chess/information'
import type { ChessSet, Squares } from '@my-app-game/chess/chess'

export type PassAction<Player extends string> = {
  type: 'pass',
  payload: {
    player: Player,
    state: GameState<Player>,
  }
}
export type UpdateChessesAction<Player extends string> = {
  type: 'updateChesses',
  payload: {
    chessesMap: Squares,
    chesses: Array<ChessSet>,
  }
}
export function updateChessesAction<Player extends string>(chessesMap: Squares,chesses: Array<ChessSet>): UpdateChessesAction<Player> {
  return {
    type: 'updateChesses',
    payload: {
      chessesMap,
      chesses,
    }
  }
}
export function passAction<Player extends string>(state: GameState<Player>, nextPlayer: Player): PassAction<Player> {
  return {
    type: 'pass',
    payload: {
      state,
      player: nextPlayer,
    }
  }
}

export type EndTurnAtion<Player extends string> = {
  type: 'endTurn',
  payload: {
    state: GameState<Player>,
    chessSets: Array<ChessSet>,
    isGameEnd: boolean,
    winner: Player | '',
    loser: Player | '',
    player: Player,
  }
}

export function endTurnAction<Player extends string>(state: GameState<Player>, chessSets: Array<ChessSet>,isGameEnd: boolean, winner: Player | '', loser: Player | '', nextPlayer: Player): EndTurnAtion<Player> {
  return {
    type: 'endTurn',
    payload: {
      state,
      chessSets,
      isGameEnd,
      winner,
      loser,
      player: nextPlayer,
    }
  }
}
export type JumpHistoryAction<GameHistory> = {
  type: 'jumpHistory',
  payload: {
    history: GameHistory[],
    step: number,
  }
}
export function jumpHistoryAction<GameHistory extends Record<string, unknown>>(history: GameHistory[], step: number): JumpHistoryAction<GameHistory> {
  return {
    type: 'jumpHistory',
    payload: {
      history,
      step,
    }
  }
}
