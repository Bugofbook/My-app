import type { ChessSet } from '@my-app-game/chess/chess'
import { getChessName } from '@my-app-game/chess/chess'

export function getVectorConnectLength<Type = undefined>(chessesArray: Array<Array<ChessSet | ChessSet<Type>>>, centerChess: ChessSet<Type>): number {
  const [leftChesses, rightChesses] = chessesArray
  return caculateOneVectorConnectLength(leftChesses, centerChess) + caculateOneVectorConnectLength(rightChesses, centerChess) + 1
}

function caculateOneVectorConnectLength<Type = undefined>(chesses: Array<ChessSet | ChessSet<Type>>, centerChess: ChessSet<Type>): number {
  if (chesses.length === 0) {
    return 0
  }
  const centerName = getChessName(centerChess)
  const index = chesses.findIndex((chess) => getChessName(chess) !== centerName)
  return index === -1 ? chesses.length : index
}
export function getVectorWillConnectLength<Type = undefined>(chessesArray: Array<Array<ChessSet | ChessSet<Type>>>, centerChess: ChessSet<Type>, maxEmptylength: number): Array<[number, number, Array<ChessSet>]> {
  const [leftChesses, rightChesses] = chessesArray
  const [leftWillArray, rightWillArray] = [caculateOneVectorWillConnectLength(leftChesses, centerChess, maxEmptylength), caculateOneVectorWillConnectLength(rightChesses, centerChess, maxEmptylength)]
  if (leftWillArray.length === 0 && rightWillArray.length === 0) {
    return []
  }
  if (leftWillArray.length === 0) {
    return rightWillArray.map(([emptyCount, length, chesses]) => [emptyCount, length, chesses])
  }
  if (rightWillArray.length === 0) {
    return leftWillArray.map(([emptyCount, length, chesses]) => [emptyCount, length, chesses])
  }
  const resultArray:Array<[number, number, Array<ChessSet>]> = []
  for (const [leftEmptyCount, leftMaxlength, leftChesses] of leftWillArray) {
    const lastInTarget = [...rightWillArray].reverse().find(([rightEmptyCount]) => (rightEmptyCount + leftEmptyCount) <= maxEmptylength)
    if (lastInTarget) {
      const [rightEmptyCount, rightMaxlength, rightChesses] = lastInTarget
      resultArray.push([leftEmptyCount + rightEmptyCount ,leftMaxlength + rightMaxlength + 1, [...leftChesses, ...rightChesses]])
    }
  }
  return resultArray
}
function caculateOneVectorWillConnectLength<Type = undefined>(chesses: Array<ChessSet | ChessSet<Type>>, centerChess: ChessSet<Type>, maxEmptylength: number): Array<[number, number, Array<ChessSet>]> {
  if (chesses.length === 0) {
    return []
  }
  const centerName = getChessName(centerChess)
  let emptyCount = 0
  let currentIndex = 0
  const emptyChesses:Array<ChessSet> = []
  const resultArray:Array<[number, number, Array<ChessSet>]> = []
  while (currentIndex <= chesses.length - 1) {
    const currentChess = chesses[currentIndex]
    const currentName = getChessName(currentChess)
    currentIndex += 1
    if (currentName === centerName) {
      // same chess, check next chess
      continue
    }
    // not same chess, need record
    resultArray.push([emptyCount, currentIndex - 1, [...emptyChesses]])
    if (currentName === '') {
      if (emptyCount < maxEmptylength) {
        emptyChesses.push(currentChess as ChessSet)
        emptyCount += 1
      } else {
        return resultArray
      }
    } else {
      return resultArray
    }
  }
  resultArray.push([emptyCount, currentIndex, [...emptyChesses]])
  return resultArray
}
