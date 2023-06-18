import {ChessBasic, ChessSet, ChessLocation, ChessInfo } from './type'

// basic
/**
 *
 * @param {ChessBasic<Record<string, unknown>>} chess
 * @returns {string}
 */
export function getChessName<Type extends Record<string, unknown>>(chess: ChessBasic<Type>) {
  return chess.name
}
// ChessInfo
/**
 *
 * @param {ChessInfo<Record<string, unknown>>} chess
 * @returns {string}
 */
export function getChessInfoLocation(chess: ChessInfo<Record<string, unknown>>) {
  return chess.location.join(',')
}

export function createEmptyChessInfo<Type extends Record<string, unknown>>(location: ChessLocation, option: Record<string, unknown> = {}): ChessInfo<Type> {
  return ({
    location,
    name: '',
    owner: '',
    id: Date.now().toString(),
    ...option
  })
}

// ChessSet
/**
 *
 * @param {ChessSet<Record<string, unknown>>} chess
 * @returns {string}
 */
export function getChessSetFrom(chess: ChessSet<Record<string, unknown>>) {
  return chess.from?.join(',')
}
export function getChessSetTo(chess: ChessSet<Record<string, unknown>>) {
  return chess.to.join(',')
}
// export function createAddChessSet<Type extends Record<string, unknown>>(name: string, location: ChessLocation, owner: string, props: Type): ChessSet<Type> {
//   return {
//     id: Date.now().toString(),
//     owner,
//     name,
//     to: location,
//     action: 'add',
//     ...props,
//   }
// }
// export function createMoveChessSet<Type extends Record<string, unknown>>(chess:ChessInfo<Partial<Type>>, to: ChessLocation, props: Type): ChessSet<Type> {
//   const { name, location, ...others } = chess
//   return {
//     ...others,
//     name,
//     from: location,
//     to,
//     action: 'move',
//     ...props,
//   }
// }
