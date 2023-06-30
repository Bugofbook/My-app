import {Vector, ChessSet, ChessLocation, Squares } from './type'
import {getChessSetTo, getChessSetID, createEmptyChessSet, getChessSetFrom} from './basic'
export const leftUpVector:Vector = [-1,1]
export const upVector:Vector = [0,1]
export const rightUpVector:Vector = [1,1]
export const leftVector:Vector = [-1,0]
export const rightVector:Vector = [1,0]
export const leftDownVector:Vector = [-1,-1]
export const downVector:Vector = [0,-1]
export const rightDownVector:Vector = [1,-1]
export const vectorArray = [leftUpVector, upVector, rightUpVector, leftVector, rightVector, leftDownVector, downVector, rightDownVector]

// export function createSquaresFromMap<Type = undefined>(map: Array<Array<unknown>>): Squares<Type> {
//   const squares = new Map()
//   map.forEach((row, i) => {
//     row.forEach((col, j) => {
//       squares.set(`${i},${j}`, null)
//     })
//   })
//   return squares
// }
export function createSquaresFromChesses(chesses: Array<ChessSet>): Squares
export function createSquaresFromChesses<Type>(chesses: Array<ChessSet<Type>>): Squares<Type>
export function createSquaresFromChesses<Type>(chesses: Array<ChessSet<Type>>): Squares<Type> {
  const squares = new Map()
  chesses.forEach((chess) => {
    if (chess.to !== null) {
      squares.set(getChessSetTo(chess), chess)
    }
  })
  return squares
}
// export function getOneChessFromSquares<Type = undefined>(squares: Squares<Type>, location: ChessLocation) {
//   return squares.get(location.join(','))
// }

// export function getChessesFromSquares<Type = undefined>(squares: Squares<Type>, locations: Array<ChessLocation>) {
//   return locations.map(location => squares.get(location.join(',')))
// }

// export function mergeSquares<Type = undefined>(oldSquare: Squares<Type>, newSquare: Squares<Type>) {
//   return new Map([...oldSquare, ...newSquare])
// }

export function putChessesToSquares(squares: Squares, chesses: Array<ChessSet>): Squares
export function putChessesToSquares<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>): Squares<Type>
export function putChessesToSquares<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>) {
  const newSquares = new Map(squares)
  chesses.forEach((chess) => {
    newSquares.set(getChessSetTo(chess), chess)
  })
  return newSquares
}

export function deleteChessesFromSquares(squares: Squares, chesses: Array<ChessSet>): Squares
export function deleteChessesFromSquares<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>): Squares<Type>
export function deleteChessesFromSquares<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>) {
  const newSquares = new Map(squares)
  chesses.forEach((chess) => {
    newSquares.set(getChessSetTo(chess), null)
  })
  return newSquares
}

export function updateSquaresFromChessSets(squares: Squares, chesses: Array<ChessSet>): Squares
export function updateSquaresFromChessSets<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>): Squares<Type>
export function updateSquaresFromChessSets<Type>(squares: Squares<Type>, chesses: Array<ChessSet<Type>>) {
  const newSquares = new Map(squares)
  const updateChessMap: Map<string, ChessSet<Type>> = new Map()
  chesses.forEach((chess) => {
    updateChessMap.set(getChessSetID(chess), chess)
  })
  updateChessMap.forEach((chess) => {
    if (chess.to !== null) {
      newSquares.set(getChessSetTo(chess), chess)
    } else {
      newSquares.delete(getChessSetFrom(chess))
    }
  })
  return newSquares
}


type Option = {
  limitLength: number,
  maxEmpty: number,
}
type CenterChess<Type = undefined> = ChessSet<Type> & {to: ChessLocation}

export function getChessesByOneVector(squares: Squares, centerChess: CenterChess, option: Option): ([VectorRow, VectorCol]: Vector) => Array<ChessSet>
export function getChessesByOneVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>, option: Option): ([VectorRow, VectorCol]: Vector) => Array<ChessSet | ChessSet<Type>>
export function getChessesByOneVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>, option: Option) {
  return ([VectorRow, VectorCol]: Vector): Array<ChessSet | ChessSet<Type>> => {
    const [row, col] = centerChess.to
    const chesses: Array<ChessSet | ChessSet<Type>> = []
    let [i, j] = [row + VectorRow, col + VectorCol]
    let limitCount = 0
    let emptyCount = 0
    while (squares.get(`${i},${j}`)) {
      if (limitCount >= option.limitLength || emptyCount > option.maxEmpty) {
        break
      } else if (squares.has(`${i},${j}`)) {
        const currentChess = squares.get(`${i},${j}`)  as ChessSet<Type> | null
        if (currentChess !== null) {
          chesses.push(currentChess)
          i += VectorRow
          j += VectorCol
        } else {
          chesses.push(createEmptyChessSet([i, j]))
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

export function getChessByTwoVector(squares: Squares, centerChess: CenterChess, option: Option): ([VectorRow, VectorCol]: Vector) => [Array<ChessSet>, Array<ChessSet>]
export function getChessByTwoVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>, option: Option): ([VectorRow, VectorCol]: Vector) => [Array<ChessSet | ChessSet<Type>>, Array<ChessSet | ChessSet<Type>>]
export function getChessByTwoVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>, option: Option) {
  const createChesses = getChessesByOneVector(squares, centerChess, option)
  return ([VectorRow, VectorCol]: Vector) => {
    const chessesPlus = createChesses([VectorRow, VectorCol])
    const chessesMinus = createChesses([-VectorRow, -VectorCol])
    return [chessesMinus, chessesPlus]
  }
}

export function getChessesByEightVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>): Array<Array<ChessSet<Type>>>
export function getChessesByEightVector(squares: Squares, centerChess: CenterChess): Array<Array<ChessSet>>
export function getChessesByEightVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>){
  const getChessesFromOneVector = getChessesByOneVector<Type>(squares, centerChess, {limitLength: 5000, maxEmpty: 5000})
  return vectorArray.map((vector) => getChessesFromOneVector(vector))
}
export function getChessByFourVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>): Array<[Array<ChessSet<Type>>,Array<ChessSet<Type>>]>
export function getChessByFourVector(squares: Squares, centerChess: CenterChess): Array<[Array<ChessSet>,Array<ChessSet>]>
export function getChessByFourVector<Type>(squares: Squares<Type>, centerChess: CenterChess<Type>) {
  const getChessesFromTwoVector = getChessByTwoVector<Type>(squares, centerChess, {limitLength: 5000, maxEmpty: 5000})
  return [rightVector, upVector, rightDownVector, rightUpVector].map((vector) => getChessesFromTwoVector(vector))
}
