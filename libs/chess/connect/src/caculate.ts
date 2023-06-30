import { ChessSet, ChessLocation, Squares, getChessByTwoVector, RowVector, ColumnVector, SlashVector, BackSlashVector } from '@my-app-game/chess/chess'
// caculate cennectlength
type useEmptyChessCount = number
type connectLength = number
export function caculateConnectLength(squares: Squares, chess: ChessSet) {
  const caculateLengthFunction = caculateOneVectorConnectLength(squares, chess)
  const rowLength = caculateLengthFunction(RowVector)
  const columnLength = caculateLengthFunction(ColumnVector)
  const slashLength = caculateLengthFunction(SlashVector)
  const backSlashLength = caculateLengthFunction(BackSlashVector)
  return Math.max(rowLength, columnLength, slashLength, backSlashLength)
}
function caculateOneVectorConnectLength(squares: Squares, chess: ChessSet) {
  const chessName = chess.name
  const chessData = getChessByTwoVector(squares, chess.location)
  return (Vector: RowVector | ColumnVector | SlashVector | BackSlashVector): connectLength => {
    const leftValue = chessData(Vector)[0][1]
    let result = 1
    for (let i = 0, ith = leftValue.length; i < ith; i++) {
      if (leftValue[i] === chessName) {
        result += 1
      } else {
        break
      }
    }
    const rightValue = chessData(Vector)[1][1]
    for (let i = 0, ith = rightValue.length; i < ith; i++) {
      if (rightValue[i] === chessName) {
        result += 1
      } else {
        break
      }
    }
    return result
  }
}
export function caculateWillconnectlength(squares: Squares, chess: ChessSet) {
  const caculateLengthFunction = caculateOneVectorWillConnectLength(squares, chess)
  const rowData = caculateLengthFunction(RowVector, 1)
  const columnData = caculateLengthFunction(ColumnVector, 1)
  const slashData = caculateLengthFunction(SlashVector, 1)
  const backSlashData = caculateLengthFunction(BackSlashVector, 1)
  return [...rowData, ...columnData, ...slashData, ...backSlashData]
}

function caculateOneVectorWillConnectLength(squares: Squares, chess: ChessSet) {
  const chessName = chess.name
  const chessData = getChessByTwoVector(squares, chess.location)
  return (Vector: RowVector | ColumnVector | SlashVector | BackSlashVector, maxEmptylength: useEmptyChessCount): Array<[connectLength, Array<ChessLocation>]> => {
    const leftValue = chessData(Vector)[0][1]
    const leftLocation = chessData(Vector)[0][0]
    let emptyIndex = 0
    const emptyChess = []
    const leftResult = [] as Array<[number, number, Array<ChessLocation>]>
    const rightResult = [] as Array<[number, number, Array<ChessLocation>]>
    for (let i = 0, ith = leftValue.length; i < ith; i++) {
      if (leftValue[i] === '') {
        if (emptyIndex !== maxEmptylength) {
          leftResult.push([emptyIndex, i, [...emptyChess]])
          emptyChess.push(leftLocation[i])
          emptyIndex += 1
        } else {
          leftResult.push([emptyIndex, i, [...emptyChess, leftLocation[i]]])
          break
        }
      } else if (leftValue[i] !== chessName) {
        break
      }
    }
    emptyIndex = 0
    emptyChess.length = 0
    const rightValue = chessData(Vector)[1][1]
    const rightLocation = chessData(Vector)[1][0]
    for (let i = 0, ith = rightValue.length; i < ith; i++) {
      if (rightValue[i] === '') {
        if (emptyIndex !== maxEmptylength) {
          rightResult.push([emptyIndex, i, [...emptyChess]])
          emptyChess.push(rightLocation[i])
          emptyIndex += 1
        } else {
          rightResult.push([emptyIndex, i, [...emptyChess, rightLocation[i]]])
          break
        }
      } else if (rightValue[i] !== chessName) {
        break
      }
    }
    if (leftResult.length === 0 && rightResult.length === 0) {
      return []
    }
    if (leftResult.length === 0) {
      return rightResult.map(item => [item[1] + 1, item[2]] as [connectLength, Array<ChessLocation>]).filter(item => item[0] > 1)
    }
    if (rightResult.length === 0) {
      return leftResult.map(item => [item[1] + 1, item[2]] as [connectLength, Array<ChessLocation>]).filter(item => item[0] > 1)
    }
    const resultArray = [] as Array<[connectLength, Array<ChessLocation>]>
    leftResult.forEach(leftItem => {
      const targetRight = rightResult.find(rightItem => rightItem[1] === leftItem[1])
      if (targetRight) {
        resultArray.push([leftItem[1] + 1, [...leftItem[2], ...targetRight[2]]])
      }
    })
    return resultArray.filter(item => item[0] > 1)
  }
}
