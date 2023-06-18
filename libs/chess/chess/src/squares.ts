import {Vector, ChessSet, ChessName, ChessLocation, ChessInfo, Squares } from './type'
import {getChessSetTo, createEmptyChessInfo} from './basic'
export const leftUpVector:Vector = [-1,1]
export const upVector:Vector = [0,1]
export const rightUpVector:Vector = [1,1]
export const leftVector:Vector = [-1,0]
export const rightVector:Vector = [1,0]
export const leftDownVector:Vector = [-1,-1]
export const downVector:Vector = [0,-1]
export const rightDownVector:Vector = [1,-1]
export const vectorArray = [leftUpVector, upVector, rightUpVector, leftVector, rightVector, leftDownVector, downVector, rightDownVector]

export function createSquaresFromMap<Type extends Record<string, unknown>>(map: Array<Array<unknown>>): Squares<Type> {
  const squares = new Map()
  map.forEach((row, i) => {
    row.forEach((col, j) => {
      squares.set(`${i},${j}`, null)
    })
  })
  return squares
}
export function createSquaresFromChesses<Type extends Record<string, unknown>>(chesses: Array<ChessSet<Type>>): Squares<Type> {
  const squares = new Map()
  chesses.forEach((chess) => {
    const {to, from , ...others} = chess
    squares.set(getChessSetTo(chess), {...others, location: to})
  })
  return squares
}
export function getOneChessFromSquares<Type extends Record<string, unknown>>(squares: Squares<Type>, location: ChessLocation) {
  return squares.get(location.join(','))
}

export function getChessesFromSquares<Type extends Record<string, unknown>>(squares: Squares<Type>, locations: Array<ChessLocation>) {
  return locations.map(location => squares.get(location.join(',')))
}

export function mergeSquares<Type extends Record<string, unknown> = Record<string, never>>(oldSquare: Squares<Type>, newSquare: Squares<Type>) {
  return new Map([...oldSquare, ...newSquare])
}
type Option = {
  limitLength: number,
  maxEmpty: number,
}
export function getChessesByOneVector<Type extends Record<string, unknown>>(squares: Squares<Type>, centerChess: ChessInfo<Type>, option: Option={limitLength: 5000, maxEmpty: 5000}) {
  return ([VectorRow, VectorCol]: Vector): Array<ChessInfo<Type>> => {
    const [row, col] = centerChess.location
    const chesses: Array<ChessInfo<Type>> = []
    let [i, j] = [row + VectorRow, col + VectorCol]
    let limitCount = 0
    let emptyCount = 0
    while (squares.get(`${i},${j}`)) {
      if (limitCount >= option.limitLength || emptyCount > option.maxEmpty) {
        break
      } else if (squares.has(`${i},${j}`)) {
        const currentChess = squares.get(`${i},${j}`)  as ChessInfo<Type> | null
        if (currentChess !== null) {
          chesses.push(currentChess)
          i += VectorRow
          j += VectorCol
        } else {
          chesses.push(createEmptyChessInfo([i, j]))
          emptyCount += 1
          i += VectorRow
          j += VectorCol
        }
        limitCount += 1
      } else {
        break
      }
    }
    return chesses
  }
}

export function getChessByTwoVector<Type extends Record<string, unknown>>(squares: Squares<Type>, centerChess: ChessInfo<Type>, option: Option={limitLength: 5000, maxEmpty: 5000}) {
  const createChesses = getChessesByOneVector(squares, centerChess, option)
  return ([VectorRow, VectorCol]: Vector): [Array<ChessInfo<Type>>, Array<ChessInfo<Type>>] => {
    const chessesPlus = createChesses([VectorRow, VectorCol])
    const chessesMinus = createChesses([-VectorRow, -VectorCol])
    return [chessesMinus, chessesPlus]
  }
}

export function getChessesByEightVector<Type extends Record<string, unknown>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): Array<Array<ChessInfo<Type>>>{
  const getChessesFromOneVector = getChessesByOneVector(squares, centerChess)
  return vectorArray.map((vector) => getChessesFromOneVector(vector))
}
export function getChessByFourVector<Type extends Record<string, unknown>>(squares: Squares<Type>, centerChess: ChessInfo<Type>): Array<[Array<ChessInfo<Type>>,Array<ChessInfo<Type>>]>{
  const getChessesFromTwoVector = getChessByTwoVector(squares, centerChess)
  return [rightVector, upVector, rightDownVector, rightUpVector].map((vector) => getChessesFromTwoVector(vector))
}
