import {ChessBasic, ChessSet, ChessLocation } from './type'

// basic
/**
 *
 * @param {ChessBasic<Record<string, unknown>>} chess
 * @returns {string}
 */
export function getChessName<Type extends ChessBasic>(chess: Type) {
  return chess.name
}

// ChessSet
/**
 *
 * @param {ChessSet<Record<string, unknown>>} chess
 * @returns {string}
 */
export function getChessSetFrom(chess: ChessSet): string
export function getChessSetFrom<Type>(chess: ChessSet<Type>): string
export function getChessSetFrom<Type>(chess: ChessSet<Type>) {
  return chess.from?.join(',')
}
export function getChessSetTo(chess: ChessSet): string
export function getChessSetTo<Type>(chess: ChessSet<Type>): string
export function getChessSetTo<Type = undefined>(chess: ChessSet<Type>) {
  return chess.to?.join(',')
}
export function getChessSetID(chess: ChessSet): string
export function getChessSetID<Type>(chess: ChessSet<Type>): string
export function getChessSetID<Type = undefined>(chess: ChessSet<Type>) {
  return chess.id
}
export function createChessSet({name, owner, to}: {name: string, owner: string, to: ChessLocation}): ChessSet & {to: ChessLocation}
export function createChessSet<Type>({name, owner, to}: {name: string, owner: string, to: ChessLocation}, option: Type): ChessSet<Type> & {to: ChessLocation}
export function createChessSet<Type>({name, owner, to}: {name: string, owner: string, to: ChessLocation}, option?: Type) {
  const chess = {
    id: Date.now().toString(),
    name,
    owner,
    to,
    from: null,
  }
  return option ? ({...chess,option}) : chess
}


export function createEmptyChessSet(location: ChessLocation): ChessSet & {to: ChessLocation}
export function createEmptyChessSet<Type>(location: ChessLocation, option: Type): ChessSet<Type> & {to: ChessLocation}
export function createEmptyChessSet<Type>(location: ChessLocation, option?: Type) {
  const newChessSet = {
    to: location,
    from: null,
    name: '',
    owner: '',
    id: Date.now().toString(),
  }
  return (option === undefined) ? ({
    ...newChessSet,
  }) : ({
    ...newChessSet,
    option,
  })
}
