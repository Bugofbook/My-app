/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import  { CheckSquareValue, setChessToSquares, addChessToLists } from '@my-app-game/chess/chess/oldGameBasic'

//find max length for connect chesses by specil vextor
export const FindLength = (VectorX, VectorY) => connectlength => (CurrentPoint , NowSquares) => {
    let contilen = 1
    const CheckValue = CheckSquareValue(CurrentPoint.value)
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
// export const willConnect = (CurrentPoint, Squares) => {
//   console.log('willConnect', CurrentPoint, Squares)
//   const targetlength = 5
//   const originArray = []
//   originArray.push(CurrentPoint)
//   for (let j = 1; j <= targetlength; j++) {
//     const tapointx = CurrentPoint.rowskey + j
//     const tapointy =  CurrentPoint.columnskey + j
//     if ( tapointx >= 0 && tapointx < Squares.length && tapointy >= 0 && tapointy < Squares[tapointx].length){
//       originArray.push(Squares[tapointx][tapointy])
//     } else {
//       break
//     }
//   }
//   const centerChess = originArray[0]
//   for (let i = 1; i <= targetlength; i++) {
//     const tapointx = CurrentPoint.rowskey - i
//     const tapointy = CurrentPoint.columnskey - i
//     if ( tapointx >= 0 && tapointx < Squares.length && tapointy >= 0 && tapointy < Squares[tapointx].length){
//       originArray.unshift(Squares[tapointx][tapointy])
//     } else {
//       break
//     }
//   }
//   // const result = getMaxConnectLength(originArray, CurrentPoint.value, targetlength, 1, 0, 0, [])
//   return result
// }
// const getMaxConnectLength2 = (originChesses, centerChess, connectlength, emptylength = 1, maxlength = 0, templateIndex = 0, templateEmptyItems = []) => {

// }
// export const getMaxConnectLength = (originChesses, targetValue, connectlength, emptylength = 1, maxlength = 0, templateIndex = 0, templateEmptyItems = []) => {
//   let maxConnect = maxlength
//   let currentIndex = templateIndex
//   let templateMaxLength = maxlength
//   const possibleArray = []
//   console.log('aaa',originChesses, targetValue, connectlength, emptylength, maxlength, templateIndex, templateEmptyItems)
//   while (currentIndex <= originChesses.length - 1) {
//     console.log('bbb',currentIndex,  originChesses.length - 1)
//     const currentChess = originChesses[templateIndex]
//     if (currentChess?.value === targetValue) {
//       currentIndex += 1
//       templateMaxLength += 1
//     } else if (currentChess?.value) {
//       currentIndex += 1
//       maxConnect = Math.max(maxConnect, templateMaxLength)
//       templateMaxLength = 0
//     } else {
//       if (emptylength !== 0) {
//         const newResult = getMaxConnectLength(originChesses, targetValue, connectlength, emptylength - 1, templateMaxLength + 1, currentIndex+1, [...templateEmptyItems, currentChess])
//         possibleArray.push(newResult)
//       }
//       currentIndex += 1
//       maxConnect = Math.max(maxConnect, templateMaxLength)
//       templateMaxLength = 0
//     }
//   }
//   return possibleArray.reduce((pre, cur) => {
//     if (cur[0] > pre[0][0]) {
//       return [cur]
//     } else if (cur[0] === pre[0][0]) {
//       return [...pre, cur]
//     } else {
//       return pre
//     }
//   }, [[maxConnect, templateEmptyItems]])
// }

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
        squares = setChessToSquares(oldchess,squares)
    }
    ProcessObject.squares = squares
    ProcessObject.lists = lists
    return ProcessObject
}
export const addNewChess = (ProcessObject = {}) => {
    const chess = ProcessObject.chess
//    console.log(chess)
    ProcessObject.lists = addChessToLists(chess,ProcessObject.lists)
	ProcessObject.actionlists = addChessToLists(chess,ProcessObject.actionlists)
    ProcessObject.squares = setChessToSquares(chess,ProcessObject.squares)
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
