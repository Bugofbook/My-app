/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import  {CheckSquareValue, setChessToSquares, addChessToLists} from './gamebasics'

//find max length for connect chesses by specil vextor
export const FindLength = (VectorX, VectorY) => connectlength => (CurrentPoint , NowSquares) => {
    let contilen = 1
    const CheckValue = CheckSquareValue(CurrentPoint.value)
    const lengthx = NowSquares.length
    for (let i = 1 ; i < connectlength ; i++) {
        const tapointx = CurrentPoint.rowskey - i * VectorX
        const tapointy = CurrentPoint.columnskey - i * VectorY
        if ( tapointx >= 0 && tapointx < lengthx && tapointy >= 0 && tapointy < NowSquares[tapointx].length){
            contilen += CheckValue(NowSquares[tapointx][tapointy])
        }
        else{
            break
        }
    }
    for (let j = 1 ; j< connectlength ; j ++) {
        const tapointx = CurrentPoint.rowskey + j * VectorX
        const tapointy =  CurrentPoint.columnskey + j * VectorY
        if ( tapointx >= 0 && tapointx < lengthx && tapointy >= 0 && tapointy < NowSquares[tapointx].length){
            contilen += CheckValue(NowSquares[tapointx][tapointy])
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
// ============

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