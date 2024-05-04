import {getChessName, getChessSetFrom} from './basic'
import { createSquaresFromMap, createSquaresFromChesses, getOneChessFromSquares, getChessesFromSquares, mergeSquares, getChessesByOneVector, getChessByTwoVector, getChessesByEightVector, getChessByFourVector} from './squares'
describe('basic', () => {
  const chess = {
    name: 'testChess',
    location: [1, 2],
  }
    it('getChessName', () => {
    expect(getChessName(chess)).toEqual('testChess')
  })
  const chessSet = {
    id: '1',
    owner: 'test',
    name: 'testChess',
    from: [2, 3],
    to: [1, 2],
  }
    it('getChessLocation', () => {
    expect(getChessSetFrom(chessSet)).toEqual('2,3')
  })
})
describe('squares', () => {
  const chessInfo1 = {
    id: '1',
    name: 'testChess1',
    location: [0, 0],
    owner: 'test1',
  }
  const chessSet1 = {
    id: '1',
    name: 'testChess1',
    from: [2, 2],
    to: [0, 0],
    owner: 'test1',
  }
  const chessInfo2 = {
    id: '2',
    name: 'testChess2',
    location: [0, 1],
    owner: 'test2',
  }
  const chessSet2 = {
    id: '2',
    owner: 'test2',
    from: [0, 0],
    to: [0, 1],
    name: 'testChess2'
  }
  const chessInfo3 = {
    id: '3',
    name: 'testChess3',
    location: [0, 2],
    owner: 'test3',
  }
  const chessSet3 = {
    id: '3',
    owner: 'test3',
    from: [0, 1],
    to: [0, 2],
    name: 'testChess3'
  }
  const chessInfo4 = {
    id: '4',
    name: 'testChess4',
    location: [1, 0],
    owner: 'test4',
  }
  const chessSet4 = {
    id: '4',
    owner: 'test4',
    from: [0, 2],
    to: [1, 0],
    name: 'testChess4'
  }
  const chessInfo5 = {
    id: '5',
    name: 'testChess5',
    location: [1, 1],
    owner: 'test5',
  }
  const chessSet5 = {
    id: '5',
    owner: 'test5',
    from: [1, 0],
    to: [1, 1],
    name: 'testChess5'
  }
  const chessInfo6 = {
    id: '6',
    name: 'testChess6',
    location: [1, 2],
    owner: 'test6',
  }
  const chessSet6 = {
    id: '6',
    owner: 'test6',
    from: [1, 1],
    to: [1, 2],
    name: 'testChess6'
  }
  const chessInfo7 = {
    id: '7',
    name: 'testChess7',
    location: [2, 0],
    owner: 'test7',
  }
  const chessSet7 = {
    id: '7',
    owner: 'test7',
    from: [1, 2],
    to: [2, 0],
    name: 'testChess7'
  }
  const chessInfo8 = {
    id: '8',
    name: 'testChess8',
    location: [2, 1],
    owner: 'test8',
  }
  const chessSet8 = {
    id: '8',
    owner: 'test8',
    from: [2, 0],
    to: [2, 1],
    name: 'testChess8'
  }
  const chessInfo9 = {
    id: '9',
    name: 'testChess9',
    location: [2, 2],
    owner: 'test9',
  }
  const chessSet9 = {
    id: '9',
    owner: 'test9',
    from: [2, 1],
    to: [2, 2],
    name: 'testChess9'
  }
  const squares = new Map([
    ['0,0', chessInfo1],
    ['0,1', chessInfo2],
    ['0,2', chessInfo3],
    ['1,0', chessInfo4],
    ['1,1', chessInfo5],
    ['1,2', chessInfo6],
    ['2,0', chessInfo7],
    ['2,1', chessInfo8],
    ['2,2', chessInfo9],
  ])
  it('createSquaresFromMap', () => {
    expect(createSquaresFromMap([
      [1, 2, 3],
      [4, 5, 6],
    ])).toEqual(new Map([
      ['0,0', null],
      ['0,1', null],
      ['0,2', null],
      ['1,0', null],
      ['1,1', null],
      ['1,2', null]
    ]))
  })
  it('createSquaresFromChesses', () => {
    expect(createSquaresFromChesses([chessSet1,chessSet2,chessSet3,chessSet4, chessSet5, chessSet6, chessSet7, chessSet8, chessSet9])).toEqual(squares)
  })
  it('getOneChessFromSquares', () => {
    expect(getOneChessFromSquares(squares, [0, 0])).toEqual(chessInfo1)
  })
  it('getChessesFromSquares', () => {
    expect(getChessesFromSquares(squares, [
      [0, 0],
      [0, 1],
    ])).toEqual([
      chessInfo1,
      chessInfo2,
    ])
  })
  it('mergeSquares', () => {
    expect(mergeSquares(
      createSquaresFromChesses([chessSet5, chessSet6, chessSet7, chessSet8, chessSet9]),
      createSquaresFromChesses([chessSet1,chessSet2,chessSet3,chessSet4, chessSet5]),
    )).toEqual(squares)
  })
  it('getChessesByOneVector', () => {
    expect(getChessesByOneVector(squares,
      chessInfo1,
    )([1, 1])).toEqual([
      chessInfo5,
      chessInfo9,
    ])
  })
  it('getChessByTwoVector', () => {
    expect(getChessByTwoVector(
      squares,
      chessInfo5,
    )([1, 1])).toEqual([
      [
        chessInfo1,
      ],
      [
        chessInfo9
      ],
    ])
  })
  it('getChessesByEightVector', () => {
    expect(getChessesByEightVector(squares,chessInfo5)).toEqual([
      [chessInfo3],
      [chessInfo6],
      [chessInfo9],
      [chessInfo2],
      [chessInfo8],
      [chessInfo1],
      [chessInfo4],
      [chessInfo7],
    ])
  })
  it('getChessesByFourVector', () => {
    expect(getChessByFourVector(squares,chessInfo5)).toEqual([
      [[chessInfo2], [chessInfo8]],
      [[chessInfo4], [chessInfo6]],
      [[chessInfo3], [chessInfo7]],
      [[chessInfo1], [chessInfo9]],
    ])
  })
})
