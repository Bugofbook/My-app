/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
export const calculationArrays = (chess ={}, squares = []) =>
Array(9).fill(1).map((_k,i) => [Math.floor( i / 3) - 1 ,(i % 3) - 1])
.map( vec => takeLineChessFromSquares(vec)(8,1)(chess,squares))
.map(chessArray => getCatchedChessFormArray(chessArray,chess,[]))

//
export const calculationPushableArrays = (chess ={}, squares = []) =>
Array(9).fill(1).map((_k,i) => [Math.floor( i / 3) - 1 ,(i % 3) - 1])
.map( vec => takeLineChessFromSquares(vec)(8,1)(chess,squares))
.map(chessArray => canPushChessFromArray(chessArray, chess))

// take Array of chess from Square
export const takeLineChessFromSquares = (Vector = []) => (maxlength = 1 , interval = 1) => (CurrentPoint , NowSquares,resultarray = []) => {
	//if maxlength <= 0 ,return result
	if (maxlength <= 0) {
		return resultarray.reverse()
	}
  if (Vector[0] === 0 && Vector[1] === 0) {
    return []
  }
	// set new point
	const [chessx,chessy] = [CurrentPoint.rowskey + Vector[0] * maxlength * interval,CurrentPoint.columnskey + Vector[1] * maxlength * interval]
	// if new point exist, save square and return function with maxlength - 1
	if ( chessx >= 0 && chessx < NowSquares.length && chessy >= 0 && chessy < NowSquares[chessx].length)
	return takeLineChessFromSquares(Vector)( maxlength - 1 , interval)(CurrentPoint , NowSquares,resultarray.concat({
		...NowSquares[chessx][chessy], rowskey: chessx, columnskey: chessy
	}))
	// else function with maxlength - 1
	else {
		return takeLineChessFromSquares(Vector)( maxlength - 1 , interval)(CurrentPoint , NowSquares,resultarray)
	}
}
// take Array of chess from Square
export const takeLineChessFromSquares2 = (Vector = []) => (maxlength = 1 , interval = 1) => (CurrentPoint , NowSquares,resultarray = []) => {
	//if maxlength <= 0 ,return result
	if (maxlength <= 0) {
		return resultarray.reverse()
	}
	// set new point
	const [chessx,chessy] = [CurrentPoint.rowskey + Vector[0] * maxlength * interval,CurrentPoint.columnskey + Vector[1] * maxlength * interval]
	// if new point exist, save square and return function with maxlength - 1
	if ( chessx >= 0 && chessx < NowSquares.length && chessy >= 0 && chessy < NowSquares[chessx].length)
	return takeLineChessFromSquares2(Vector)( maxlength - 1 , interval)(CurrentPoint , NowSquares,resultarray.concat({
		...NowSquares[chessx][chessy], rowskey: chessx, columnskey: chessy
	}))
	// else function with maxlength - 1
	else {
		return takeLineChessFromSquares2(Vector)( maxlength - 1 , interval)(CurrentPoint , NowSquares,resultarray)
	}
}

//find result of catch-game from Array of chess
const getCatchedChessFormArray = (checkarray,startchess,resultarray = []) => {
	if ( checkarray.length === 0) {  // No square need check , return empty result
		return []
	}
	const [oldchess, ...otherchess] = checkarray
	if (oldchess.value === startchess.value ) {  // find same chess , return result
		return resultarray
	}
	else if (oldchess.value === "" ) { //find empty chess , return empty result
		return []
	}
	else if (oldchess.value !==  startchess.value  ) { //No find same chess. continus find
		return getCatchedChessFormArray(otherchess,startchess,resultarray.concat({...startchess, rowskey: oldchess.rowskey, columnskey: oldchess.columnskey}))
	}
}

export const canPushChessFromArray = (checkarray,startchess) => {
	if (checkarray.length <= 1) {  // No square need check , return empty result
		return []
	}
  const [firstchess, ...othersArray] = checkarray
  if (firstchess?.value === "") {
    return []
  }
  if (firstchess?.value === startchess.value) {
    return []
  }
  const result = [firstchess]
  while (othersArray.length > 0) {
    const currentChess = othersArray.shift()
    if (!currentChess?.value) {
      return result.concat(currentChess)
    } else if (currentChess.value === startchess.value) {
      return []
    } else {
      result.push(currentChess)
    }
  }
  return []
  // if (templatearray.length !== )
	// const [oldchess, ...otherchess] = checkarray
	// if (oldchess.value === startchess.value ) {  // find same chess , return empty result
	// 	return []
	// }
	// else if (oldchess.value === "" ) { //find empty chess , return result
	// 	return resultarray
	// }
	// else if (oldchess.value !==  startchess.value  ) { //No find same chess. continus find
	// 	return getPushableChessFromArray(otherchess,startchess,resultarray.concat({...startchess, rowskey: oldchess.rowskey, columnskey: oldchess.columnskey}))
	// }
}
