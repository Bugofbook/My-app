import { getVectorConnectLength, getVectorWillConnectLength } from './basic'
import { createEmptyChessInfo } from '@my-app-game/chess/chess'

const createBlack = (id: string, location: [number, number]) => {
  return {
    id,
    name: 'black',
    location,
    owner: 'black',
  }
}
// const createBlackSet = (id: string, to: [number, number]) => {
//   return {
//     id,
//     name: 'black',
//     to,
//     owner: 'black',
//   }
// }
const createWhite = (id: string, location: [number, number]) => {
  return {
    id,
    name: 'white',
    location,
    owner: 'white',
  }
}
// const createWhiteSet = (id: string, to: [number, number]) => {
//   return {
//     id,
//     name: 'white',
//     to,
//     owner: 'white',
//   }
// }
const centerChess = createWhite('0', [100, 100])
const chesses1 = [
  [createWhite('1', [0, 0]), createWhite('2', [0, 1]), createWhite('3', [0, 2]), createBlack('4', [0, 3])],
  [createWhite('5', [1, 0]), createWhite('6', [1, 1]), createWhite('7', [1, 2]), createEmptyChessInfo([1, 3], {id: '8'})],
]
const chesses2 = [
  [createWhite('1', [0, 0]), createEmptyChessInfo([0, 1], {id: '2'}), createWhite('3', [0, 2]), createBlack('4', [0, 3])],
  [createWhite('5', [1, 0]), createWhite('6', [1, 1]), createWhite('7', [1, 2]), createEmptyChessInfo([1, 3], {id: '8'})],
]
const chesses3 = [
  [createWhite('1', [0, 0]), createWhite('2', [0, 1]), createEmptyChessInfo([0, 2], {id: '3'}), createBlack('4', [0, 3])],
  [createWhite('5', [1, 0]), createEmptyChessInfo([1, 1], {id: '6'}), createWhite('7', [1, 2]), createEmptyChessInfo([1, 3], {id: '8'})],
]
describe('basic', () => {
  it('getVectorConnectLength-simple', () => {
    expect(getVectorConnectLength(chesses1, centerChess)).toEqual(7)
  })
  it('getVectorWillConnectLength-simple', () => {
    expect(getVectorWillConnectLength(chesses1, centerChess, 1)).toEqual([[1, 8, [createEmptyChessInfo([1, 3], {id: '8'})]]])
  })
  it('getVectorConnectLength-1', () => {
    expect(getVectorConnectLength(chesses2, centerChess)).toEqual(5)
  })
  it('getVectorWillConnectLength-1', () => {
    expect(getVectorWillConnectLength(chesses2, centerChess, 1)).toEqual([[1, 6, [createEmptyChessInfo([1, 3], {id: '8'})]], [1, 7, [createEmptyChessInfo([0, 1], {id: '2'})]]])
  })
  it('getVectorConnectLength-2', () => {
    expect(getVectorConnectLength(chesses3, centerChess)).toEqual(4)
  })
  it('getVectorWillConnectLength-2', () => {
    expect(getVectorWillConnectLength(chesses3, centerChess, 1)).toEqual([
      [1, 6, [createEmptyChessInfo([1, 1], {id: '6'})]],
      [1, 5, [createEmptyChessInfo([0, 2], {id: '3'})]],
    ])
  })
})
