
import {ChessInfo } from '@my-app-game/chess/chess/type'
import { getChessName } from '@my-app-game/chess/chess/basic'

export function getCatchedChesses<Type extends Record<string, unknown>>(chesses: Array<ChessInfo<Type>>, centerChess: ChessInfo<Type>): Array<ChessInfo<Type>> {
  const resultArray:Array<ChessInfo<Type>> = []
  if (chesses.length === 0) {
    return []
  }
  const centerName = getChessName(centerChess)
  for (const chess of chesses) {
    const currentName = getChessName(chess)
    if (currentName === centerName) {
      return resultArray
    } else if (currentName === '') {
      return []
    } else {
      resultArray.push(chess)
    }
  }
  return []
}
export function hasCatchedChesses<Type extends Record<string, unknown> = Record<string, never>>(chesses: Array<ChessInfo<Type>>, centerChess: ChessInfo<Type>): boolean {
  if (chesses.length === 0) {
    return false
  }
  const centerName = getChessName(centerChess)
  if (centerName === getChessName(chesses[0])) {
    return false
  }
  for (const chess of chesses) {
    const currentName = getChessName(chess)
    if (currentName === centerName) {
      return true
    } else if (currentName === '') {
      return false
    }
  }
  return false
}
