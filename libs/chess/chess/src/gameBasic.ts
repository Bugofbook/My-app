/**
 * name of chess
 * @typedef {String} ChessName
 */
export type ChessName = string
/**
 * location of chess
 * @typedef {Array<number>} ChessLocation
 */
export type ChessLocation = Array<number>
/**
 * setting of Chess for Squares
 * @typedef {Object} ChessSet
 * @property {ChessName} name name of chess
 * @property {ChessLocation} location location of chess
 */
export type ChessSet<T = Record<string, unknown>> = T & {
  name: string,
  location: ChessLocation,
}

/**
 * record of chess
 * @typedef {Object} ChessRecord
 * @property {ChessName} name name of chess
 * @property {ChessLocation} from location of chess
 * @property {ChessLocation} to location of chess
 * @property {String} action action of chess
 */
export type ChessRecord<Action = 'move' | 'remove' | 'add'> = {
  name: string,
  from?: ChessLocation,
  to: ChessLocation,
  action?: Action,
}
/**
 * info of chess
 * @typedef {Object} ChessInfo
 * @property {ChessName} name name of chess
 * @property {String} owner owner of chess
 */
export type ChessInfo<T =Record<string, unknown>> = T & {
  name: string,
  owner: string,
}

// type Squares2D = Array<Array<ChessName>>
// type Squares3D = Array<Array<Array<ChessName>>>
// type Squares = Squares2D | Squares3D
/**
 * Squares of chess
 * @typedef {Array<Array<ChessName>>} Squares
 */
export type Squares = Array<Array<ChessName>>

/**
 * deep copy Squares
 * @param {Squares} Squares
 * @returns {Squares}
 */
export function SquaresDeepCopy(Squares: Squares): Squares{
  return JSON.parse(JSON.stringify(Squares))
}
// set chess to squares
/**
 * set chesses to squares
 * @param {Squares} squares
 * @param {Array<ChessSet>} chesses
 * @returns {Squares}
 */
export function setChessToSquares(squares: Squares, ...chesses: Array<ChessSet>):Squares {
	const newSquares = SquaresDeepCopy(squares)
  chesses.forEach(chess => {
    newSquares[chess.location[0]][chess.location[1]] = chess.name
  })
	return newSquares
}
// add chess to list
/**
 * add chessRecords to lists
 * @param {Array<ChessInfo>} lists
 * @param {Array<ChessInfo>} chessRecord
 * @returns
 */
export function addChessRecordToLists(lists: Array<ChessSet>, ...chessRecord: Array<ChessSet>) {
  return lists.concat(chessRecord)
}

//take one square form Squares ex:TakeSquare(nowsquares)(1,1)
/**
 *
 * @param {Squares} Squares
 * @returns {(rowskey: number, columnkey: number) => ChessName}
 */
export function getOneFromSquare(squares: Squares): (rowskey: number, columnkey: number) => ChessName {
  return (rowskey, columnkey) => squares[rowskey][columnkey]
}
export type Vector = [-1,-1]|[-1,0]|[-1,1]|[0,-1]|[0,1]|[1,-1]|[1,0]|[1,1]
export type RowVector = [1,0]
export const RowVector:RowVector = [1,0]
export type ColumnVector = [0,1]
export const ColumnVector:ColumnVector = [0,1]
export type SlashVector = [1,1]
export const SlashVector:SlashVector = [1,1]
export type BackSlashVector = [1,-1]
export const BackSlashVector:BackSlashVector = [1,-1]

export function getChessByVector(squares: Squares, centerLocation: ChessLocation) {
  return ([VectorX,VectorY]: Vector): [Array<ChessLocation>, Array<ChessName>] => {
    const locationArray = []
    const valueArray = []
    let index = 1
    let condition = true
    while (condition) {
      const rowLocation = centerLocation[0] + VectorX * index
      const columnLocation = centerLocation[1] + VectorY * index
      const targetRow = squares[rowLocation]
      if (targetRow === undefined) {
        index = 1
        condition = false
        break
      }
      const target = targetRow[columnLocation]
      if (target === undefined) {
        index = 1
        condition = false
        break
      }
      index+=1
      locationArray.push([rowLocation, columnLocation])
      valueArray.push(target)
      if (index > 50000) {
        console.log('error')
        break
      }
    }
    return [locationArray, valueArray]
  }
}
export function getChessByTwoVector(squares: Squares, centerLocation: ChessLocation) {
  return ([VectorX,VectorY]: RowVector|ColumnVector|SlashVector|BackSlashVector): [[Array<ChessLocation>, Array<ChessName>], [Array<ChessLocation>, Array<ChessName>]] => {
    const leftlocationArray = []
    const rightlocationArray = []
    const leftValue = []
    const rightValue = []
    let index = 1
    let condition = true
    while (condition) {
      const targetRow = squares[centerLocation[0] - VectorX * index]
      if (targetRow === undefined) {
        index = 1
        condition = false
        break
      }
      const target = targetRow[centerLocation[1] - VectorY * index]
      if (target === undefined) {
        index = 1
        condition = false
        break
      }
      index+=1
      leftlocationArray.push([centerLocation[0] - VectorX * index, centerLocation[1] - VectorY * index])
      leftValue.push(target)
      if (index > 50000) {
        console.log('error')
        break
      }
    }
    condition = true
    while (condition) {
      const targetRow = squares[centerLocation[0] + VectorX * index]
      if (targetRow === undefined) {
        index = 1
        condition = false
        break
      }
      const target = targetRow[centerLocation[1] + VectorY * index]
      if (target === undefined) {
        index = 1
        condition = false
        break
      }
      index+=1
      rightlocationArray.push([centerLocation[0] + VectorX * index,centerLocation[1] + VectorY * index])
      rightValue.push(target)
      if (index > 50000) {
        console.log('error')
        break
      }
    }
    return [
      [leftlocationArray, leftValue],
      [rightlocationArray, rightValue],
    ]
  }
}
