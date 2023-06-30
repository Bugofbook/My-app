
import type {ChessSet } from '@my-app-game/chess/chess'
import { getChessName } from '@my-app-game/chess/chess'

export function getCatchedChesses<Type>(chesses: Array<ChessSet<Type>>, centerChess: ChessSet<Type>): Array<ChessSet<Type>> {
  const resultArray:Array<ChessSet<Type>> = []
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
export function hasCatchedChesses<Type = undefined>(chesses: Array<ChessSet<Type>>, centerChess: ChessSet<Type>): boolean {
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
