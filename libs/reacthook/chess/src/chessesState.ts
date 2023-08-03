import { useState, useCallback } from 'react';
import type { ChessSet } from '@my-app-game/chess/chess'
import { updateSquaresFromChessSets } from '@my-app-game/chess/chess'

export type ChessesState<ChessOtherType = undefined> = Map<string, ChessSet<ChessOtherType> | null>

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
  payload: {
    chessesMap: ChessesState<ChessOtherType>,
    chesses: Array<ChessSet<ChessOtherType>>,
  }
}
function updateChessesAction<ChessOtherType>(chessesMap: ChessesState<ChessOtherType>, chesses: Array<ChessSet<ChessOtherType>>): UpdateChessesAction<ChessOtherType> {
  return {
    type: 'updateChesses',
    payload: {
      chessesMap,
      chesses
    }
  }
}
type ChessesActions<ChessOtherType = undefined> = SetChessesStateAction<ChessOtherType> | UpdateChessesAction<ChessOtherType>

export function useChessesState<ChessOtherType = undefined>(initState: ChessesState<ChessOtherType>): [ChessesState<ChessOtherType>, (action: ChessesActions<ChessOtherType>) => ChessesState<ChessOtherType>]
export function useChessesState(initState: ChessesState): [ChessesState, (action: ChessesActions) => ChessesState]
export function useChessesState<ChessOtherType = undefined>(initState: ChessesState<ChessOtherType> = new Map()) {
  const [chessesState, setChessesState] = useState<ChessesState<ChessOtherType>>(initState)
  const dispatch = useCallback((action: ChessesActions<ChessOtherType>) => {
    let newChessesState = new Map() as ChessesState<ChessOtherType>
    switch (action.type) {
      case 'updateChesses': {
        newChessesState = updateSquaresFromChessSets(action.payload.chessesMap, action.payload.chesses)
        break
      }
      case 'setChesses': {
        newChessesState = new Map(action.payload)
        break
      }
    }
    setChessesState(newChessesState)
    return newChessesState
  }, [])
  return [chessesState, dispatch]
}

export const chessesStateAction = {
  updateChesses: updateChessesAction,
  setChessesState: setChessesStateAction,
}
