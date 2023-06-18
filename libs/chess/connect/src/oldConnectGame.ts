/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import  { oldCheckSquareValue, oldsetChessToSquares, oldaddChessToLists } from '@my-app-game/chess/chess/oldGameBasic'

//find max length for connect chesses by specil vextor
export const FindLength = (VectorX, VectorY) => connectlength => (CurrentPoint , NowSquares) => {
    let contilen = 1
    const CheckValue = oldCheckSquareValue(CurrentPoint.value)
    const lengthx = NowSquares.length
    for (let i = 1 ; i < connectlength ; i++) {
        const tapointx = CurrentPoint.rowskey - i * VectorX
        const tapointy = CurrentPoint.columnskey - i * VectorY
        if ( tapointx >= 0 && tapointx < lengthx && tapointy >= 0 && tapointy < NowSquares[tapointx].length){
          if (CheckValue(NowSquares[tapointx][tapointy]) === 1) {
            contilen += 1
          } else {
            break
          }
        }
        else{
            break
        }
    }
    for (let j = 1 ; j< connectlength ; j ++) {
        const tapointx = CurrentPoint.rowskey + j * VectorX
        const tapointy =  CurrentPoint.columnskey + j * VectorY
        if ( tapointx >= 0 && tapointx < lengthx && tapointy >= 0 && tapointy < NowSquares[tapointx].length){
          if (CheckValue(NowSquares[tapointx][tapointy]) === 1) {
            contilen += 1
          } else {
            break
          }
        }
        else{
            break
        }
    }
    return contilen
}
//find maxlength for row,Column ,Slash or BackSlash by Currying
export const Rowlength = FindLength(1,0)
export const Columnlength = FindLength(0,1)
export const Slashlength = FindLength(1,1)
export const BackSlashlength = FindLength(1,-1)
//judge length exist
export const JudgeWinner = length => (CurrentPoint , Squares) =>
{
    return  Rowlength(length)(CurrentPoint,Squares) >= length ||
    Columnlength(length)(CurrentPoint,Squares) >= length ||
    Slashlength(length)(CurrentPoint,Squares) >= length  ||
    BackSlashlength(length)(CurrentPoint,Squares) >= length
}
// willConnect

// export const willConnect = ([VectorX, VectorY] = [0,0], targetlength, CurrentPoint, NowSquares, emptylength) => {

// }
export const willConnectList = (CurrentPoint, Squares) => {
  const RowArray = oneVectorWillConnect(CurrentPoint, Squares, [1,0], 1)
  const ColumnArray = oneVectorWillConnect(CurrentPoint, Squares, [0,1], 1)
  const SlashArray = oneVectorWillConnect(CurrentPoint, Squares, [1,1], 1)
  const BackSlashArray = oneVectorWillConnect(CurrentPoint, Squares, [1,-1], 1)
  return [...RowArray, ...ColumnArray, ...SlashArray, ...BackSlashArray]
}
const oneVectorWillConnect = (CurrentPoint, Squares, [VectorX, VectorY] = [0,0], maxEmptylength = 1) => {
  const targetlength = Squares.length
  const originArray = []
  originArray.push(CurrentPoint)
  const leftSide = []
  for (let j = 1; j <= targetlength; j++) {
    const tapointx = CurrentPoint.rowskey - j * VectorY
    const tapointy =  CurrentPoint.columnskey - j * VectorX
    if ( tapointx >= 0 && tapointx < Squares.length && tapointy >= 0 && tapointy < Squares[tapointx].length){
      leftSide.push(({...Squares[tapointx][tapointy], rowskey: tapointx, columnskey: tapointy}))
    } else {
      break
    }
  }
  const left = onesideLengthArr(leftSide, CurrentPoint, 1)
  const rightSide = []
  for (let i = 1; i <= targetlength; i++) {
    const tapointx = CurrentPoint.rowskey + i * VectorY
    const tapointy = CurrentPoint.columnskey + i * VectorX
    if ( tapointx >= 0 && tapointx < Squares.length && tapointy >= 0 && tapointy < Squares[tapointx].length){
      rightSide.push({...Squares[tapointx][tapointy], rowskey: tapointx, columnskey: tapointy})
    } else {
      break
    }
  }
  const right = onesideLengthArr(rightSide, CurrentPoint, maxEmptylength)
  const resultArray = []
  if (left.length === 0 && right.length === 0) {
    return []
  }
  if (left.length === 0) {
    return right.map(item => [item[1] + 1, item[2]]).filter(item => item[0] > 1)
  }
  if (right.length === 0) {
    return left.map(item => [item[1] + 1, item[2]]).filter(item => item[0] > 1)
  }
  left.forEach((item, index) => {
    const targetRight = right.find(item => item[0] + index === 1)
    if (targetRight) {
      resultArray.push([item[1] + targetRight[1] + 1, [...item[2], ...targetRight[2]]])
    }
  })
  return resultArray
}
const onesideLengthArr = (originChesses, startChess, maxEmptylength = 1) => {
  if (originChesses.length === 0) {
    return []
  }
  const value = startChess.value
  const resultArray = []
  const emptyChessArray = []
  let templateEmptyItems = maxEmptylength
  let templateMaxLength = 0
  while (templateMaxLength <= originChesses.length - 1) {
    const currentChessValue = originChesses[templateMaxLength].value || ''
    if (!currentChessValue) { // ''
      if (templateEmptyItems !== 0) {
        resultArray.push([maxEmptylength - templateEmptyItems, templateMaxLength, [...emptyChessArray]])
        emptyChessArray.push(originChesses[templateMaxLength])
        templateEmptyItems -= 1
      } else {
        return [...resultArray, [maxEmptylength, templateMaxLength, [...emptyChessArray]]]
      }
    } else if (currentChessValue !== value) {
      return [...resultArray, [maxEmptylength - templateEmptyItems, templateMaxLength, [...emptyChessArray]]]
    }
    templateMaxLength += 1
  }
  return [...resultArray, [maxEmptylength, templateMaxLength, [...emptyChessArray]]]
}

// remove the most old chess
export const removeOldChess = (ProcessObject = {}) => {
    let squares = ProcessObject.squares
    let lists = ProcessObject.lists
    if (lists.length >= 6) {
        const oldchess = {
            rowskey: lists[0].rowskey,
            columnskey: lists[0].columnskey,
            value: "",
            owner: "",
            lock: false,
        }
        lists = lists.filter((_chess,index) => index !== 0)
        squares = oldsetChessToSquares(oldchess,squares)
    }
    ProcessObject.squares = squares
    ProcessObject.lists = lists
    return ProcessObject
}
export const addNewChess = (ProcessObject = {}) => {
    const chess = ProcessObject.chess
//    console.log(chess)
    ProcessObject.lists = oldaddChessToLists(chess,ProcessObject.lists)
	ProcessObject.actionlists = oldaddChessToLists(chess,ProcessObject.actionlists)
    ProcessObject.squares = oldsetChessToSquares(chess,ProcessObject.squares)
    return ProcessObject
}

export const ConeectJudge = (length) => (ProcessObject = {}) => {
    ProcessObject.gamestate =  (JudgeWinner(length)(ProcessObject.chess,ProcessObject.squares)) ? "Game End" : "Game Playing"
    if (ProcessObject.gamestate === "Game End") {
        ProcessObject.winner = ProcessObject.chess.owner
        ProcessObject.loser = (ProcessObject.chess.owner === "player1") ? "player2" : "player1"
    } else {
        ProcessObject.winner = ''
        ProcessObject.loser = ''
    }
    return ProcessObject
}
