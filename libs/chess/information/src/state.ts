export type BasicState = 'start' | 'playing' | 'end'
export type UserData<Player extends string> = {
  player: Player,
  nextPlayer: Player,
  chessName: string,
}
export type GameState<Player extends string> = {
  gameState: BasicState,
  winner: string,
  loser: string,
  turn: number,
  player: Player,
}
export function initGameState<Player extends string>({player}: {player: Player}): GameState<Player> {
  return ({
    gameState: 'start',
    winner: '',
    loser: '',
    turn: 1,
    player,
  })
}
export function nextTurn<Player extends string>(state: GameState<Player>, {player}: {player: Player}): GameState<Player> {
  return ({
    ...state,
    gameState: 'playing',
    turn: state.turn + 1,
    player,
  })
}
export function setResult<Player extends string>(state: GameState<Player>, {winner,loser}: {winner: string, loser: string}): GameState<Player> {
  return ({
    ...state,
    gameState: 'end',
    winner,
    loser,
  })
}
