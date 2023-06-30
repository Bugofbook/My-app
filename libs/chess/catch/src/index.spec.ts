import { getCatchedChesses, hasCatchedChesses} from './basic'
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

const chesses1 = [createWhite('1', [0, 0]), createWhite('2', [0, 1]), createWhite('3', [0, 2]), createBlack('4', [0, 3])]
const chesses2 = [createWhite('1', [0, 0]), createBlack('2', [0, 1]), createWhite('3', [0, 2]), createBlack('4', [0, 3])]
const chesses3 = [createBlack('1', [0, 0]), createBlack('2', [0, 1]), createBlack('3', [0, 2]), createBlack('4', [0, 3])]
const chesses4 = [createWhite('1', [0, 0]), createWhite('2', [0, 1]), createWhite('3', [0, 2]), createWhite('4', [0, 3])]
const chesses5 = [createWhite('1', [0, 0]), createEmptyChessInfo([0,1]), createWhite('3', [0, 2]), createWhite('4', [0, 3])]
const centerChess = createBlack('0', [4, 4])
describe('basic', () => {
  it('getCatchedChesses-simple', () => {
    expect(getCatchedChesses(chesses1, centerChess)).toEqual([createWhite('1', [0, 0]), createWhite('2', [0, 1]), createWhite('3', [0, 2])])
  })
  it('getCatchedChesses-case1', () => {
    expect(getCatchedChesses(chesses2, centerChess)).toEqual([createWhite('1', [0, 0])])
  })
  it('getCatchedChesses-case2', () => {
    expect(getCatchedChesses(chesses3, centerChess)).toEqual([])
  })
  it('getCatchedChesses-case3', () => {
    expect(getCatchedChesses(chesses4, centerChess)).toEqual([])
  })
  it('getCatchedChesses-case4', () => {
    expect(getCatchedChesses(chesses5, centerChess)).toEqual([])
  })
  it('hasCatchedChesses-simple', () => {
    expect(hasCatchedChesses(chesses1, centerChess)).toEqual(true)
  })
  it('hasCatchedChesses-case1', () => {
    expect(hasCatchedChesses(chesses2, centerChess)).toEqual(true)
  })
  it('hasCatchedChesses-case2', () => {
    expect(hasCatchedChesses(chesses3, centerChess)).toEqual(false)
  })
  it('hasCatchedChesses-case3', () => {
    expect(hasCatchedChesses(chesses4, centerChess)).toEqual(false)
  })
  it('hasCatchedChesses-case3', () => {
    expect(hasCatchedChesses(chesses5, centerChess)).toEqual(false)
  })
})
