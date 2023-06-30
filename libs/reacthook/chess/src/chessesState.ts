import { Reducer } from 'react';
import type { ChessSet } from '@my-app-game/chess/chess'
import { putChessesToSquares, deleteChessesFromSquares, updateSquaresFromChessSets } from '@my-app-game/chess/chess'

export type ChessesState<ChessOtherType = undefined> = Map<string, ChessSet<ChessOtherType> | null>

type PutChessAction<ChessOtherType = undefined> = {
  type: 'putChess',
  payload: ChessSet<ChessOtherType>
}
function putChessAction<Type>(chess: ChessSet<Type>): PutChessAction<Type> {
  return {
    type: 'putChess',
    payload: chess
  }
}
type PutChessesAction<ChessOtherType = undefined> = {
  type: 'putChesses',
  payload: Array<ChessSet<ChessOtherType>>
}
function putChessesAction<Type>(chesses: Array<ChessSet<Type>>): PutChessesAction<Type> {
  return {
    type: 'putChesses',
    payload: chesses
  }
}
type DeleteChessAction<ChessOtherType = undefined> = {
  type: 'deleteChess',
  payload: ChessSet<ChessOtherType>
}
function deleteChessAction<Type>(chess: ChessSet<Type>): DeleteChessAction<Type> {
  return {
    type: 'deleteChess',
    payload: chess
  }
}
type DeleteChessesAction<ChessOtherType = undefined> = {
  type: 'deleteChesses',
  payload: Array<ChessSet<ChessOtherType>>
}
function deleteChessesAction<Type>(chesses: Array<ChessSet<Type>>): DeleteChessesAction<Type> {
  return {
    type: 'deleteChesses',
    payload: chesses
  }
}
type InitChessesStateAction<ChessOtherType = undefined> = {
  type: 'initChesses',
  payload: ChessesState<ChessOtherType>
}
function initChessesStateAction<Type>(chesses: ChessesState<Type>): InitChessesStateAction<Type> {
  return {
    type: 'initChesses',
    payload: chesses
  }
}
type SetChessesStateAction<ChessOtherType = undefined> = {
  type: 'setChesses',
  payload: ChessesState<ChessOtherType>
}
function setChessesStateAction<Type>(chesses: ChessesState<Type>): SetChessesStateAction<Type> {
  return {
    type: 'setChesses',
    payload: chesses
  }
}
type UpdateChessesAction<ChessOtherType = undefined> = {
  type: 'updateChesses',
  payload: Array<ChessSet<ChessOtherType>>
}
function updateChessesAction<Type>(chesses: Array<ChessSet<Type>>): UpdateChessesAction<Type> {
  return {
    type: 'updateChesses',
    payload: chesses
  }
}
type ChessesActions<ChessOtherType = undefined> = PutChessAction<ChessOtherType> | PutChessesAction<ChessOtherType> | DeleteChessAction<ChessOtherType> | DeleteChessesAction<ChessOtherType> | InitChessesStateAction<ChessOtherType> | SetChessesStateAction<ChessOtherType> | UpdateChessesAction<ChessOtherType>
export type ChessesStateReducer<ChessOtherType = undefined> = Reducer<ChessesState<ChessOtherType>, ChessesActions<ChessOtherType>>
export function chessesStateReducer(state: ChessesState, action: ChessesActions): ChessesState<undefined>
export function chessesStateReducer<ChessOtherType>(state: ChessesState<ChessOtherType>, action: ChessesActions<ChessOtherType>): ChessesState<ChessOtherType>
export function chessesStateReducer<ChessOtherType>(state: ChessesState<ChessOtherType>, action: ChessesActions<ChessOtherType>) {
  switch (action.type) {
    case 'putChess':
      return putChessesToSquares(state, [action.payload])
    case 'putChesses':
      return putChessesToSquares(state, action.payload)
    case 'deleteChess':
      return deleteChessesFromSquares(state, [action.payload])
    case 'deleteChesses':
      return deleteChessesFromSquares(state, action.payload)
    case 'updateChesses':
      return updateSquaresFromChessSets(state, action.payload)
    case 'initChesses':
      return new Map(action.payload)
    case 'setChesses':
      return new Map(action.payload)
    default:
      return state
  }
}
export const chessesStateAction = {
  putChess: putChessAction,
  putChesses: putChessesAction,
  deleteChess: deleteChessAction,
  deleteChesses: deleteChessesAction,
  updateChesses: updateChessesAction,
  initChessesState: initChessesStateAction,
  setChessesState: setChessesStateAction,
}
