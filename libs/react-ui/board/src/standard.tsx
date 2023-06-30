import { Rect } from 'react-konva';

type KonvaSquareOption = {
  fill?: string
}

type StandardBoardProps<Type extends KonvaSquareOption> = {
  squareWeight: number;
  boardState: Map<string, Type>;
  onClickBoard: (locationString: string) => void;
  gameState: string;
}

type SquareProps = {
  squareWeight: number;
  rowIndex: number;
  columnIndex: number;
  fill?: string;
  onClickBoard: (locationString: string) => void;
}

function OneRect({squareWeight, rowIndex, columnIndex, fill, onClickBoard}: SquareProps) {
  return <Rect
    x={rowIndex * squareWeight}
    y={columnIndex * squareWeight}
    width={squareWeight}
    height={squareWeight}
    fill={fill}
    stroke="black"
    strokeWidth={1}
    onClick={() => onClickBoard(`${rowIndex},${columnIndex}`)}
  />
}
const BOARD33DATA = Array(3 * 3).fill(0).map((_, index) => ({
  rowIndex: Math.floor(index / 3),
  columnIndex: index % 3,
}))
const BOARD88DATA = Array(8 * 8).fill(0).map((_, index) => ({
  rowIndex: Math.floor(index / 8),
  columnIndex: index % 8,
}))
const BOARD1717DATA = Array(17 * 17).fill(0).map((_, index) => ({
  rowIndex: Math.floor(index / 17),
  columnIndex: index % 17,
}))
const BOARD1919DATA = Array(19 * 19).fill(0).map((_, index) => ({
  rowIndex: Math.floor(index / 19),
  columnIndex: index % 19,
}))
export function Standard33Board<Type extends KonvaSquareOption = Record<string, never>>({squareWeight, boardState, onClickBoard, gameState}: StandardBoardProps<Type>) {
  const handleClickBoard = (locationString: string) => {
    if (gameState !== 'end') {
      onClickBoard(locationString)
    }
  }
  return (
    <>
      <Rect key='0' x={0} y={0} width={3 * squareWeight} height={3 * squareWeight} stroke={'black'} strokeWidth={1} />
      {
        BOARD33DATA.map(item => {
          const currentData = boardState.get(`${item.rowIndex},${item.columnIndex}`) || {} as Type
          return <OneRect
              key={`${item.rowIndex}-${item.columnIndex}`}
              squareWeight={squareWeight}
              rowIndex={item.rowIndex}
              columnIndex={item.columnIndex}
              fill={currentData?.fill}
              onClickBoard={(location) => handleClickBoard(location)}
            />
        })
      }
    </>
  )
}
export function Standard88Board<Type extends KonvaSquareOption = Record<string, never>>({squareWeight, boardState, onClickBoard, gameState}: StandardBoardProps<Type>) {
  const handleClickBoard = (locationString: string) => {
    if (gameState !== 'end') {
      onClickBoard(locationString)
    }
  }
  return (
    <>
      <Rect key='0' x={0} y={0} width={8 * squareWeight} height={8 * squareWeight} stroke={'black'} strokeWidth={1} />
      {
        BOARD88DATA.map(item => {
          const currentData = boardState.get(`${item.rowIndex},${item.columnIndex}`) || {} as Type
          return <OneRect
              key={`${item.rowIndex}-${item.columnIndex}`}
              squareWeight={squareWeight}
              rowIndex={item.rowIndex}
              columnIndex={item.columnIndex}
              fill={currentData?.fill}
              onClickBoard={(location) => handleClickBoard(location)}
            />
        })
      }
    </>
  )
}
export function Standard1717Board<Type extends KonvaSquareOption = Record<string, never>>({squareWeight, boardState, onClickBoard, gameState}: StandardBoardProps<Type>) {
  const handleClickBoard = (locationString: string) => {
    if (gameState !== 'end') {
      onClickBoard(locationString)
    }
  }
  return (
    <>
      <Rect key='0' x={0} y={0} width={17 * squareWeight} height={17 * squareWeight} stroke={'black'} strokeWidth={1} />
      {
        BOARD1717DATA.map(item => {
          const currentData = boardState.get(`${item.rowIndex},${item.columnIndex}`) || {} as Type
          return <OneRect
              key={`${item.rowIndex}-${item.columnIndex}`}
              squareWeight={squareWeight}
              rowIndex={item.rowIndex}
              columnIndex={item.columnIndex}
              fill={currentData?.fill}
              onClickBoard={(location) => handleClickBoard(location)}
            />
        })
      }
    </>
  )
}
export function Standard1919Board<Type extends KonvaSquareOption = Record<string, never>>({squareWeight, boardState, onClickBoard, gameState}: StandardBoardProps<Type>) {
  const handleClickBoard = (locationString: string) => {
    if (gameState !== 'end') {
      onClickBoard(locationString)
    }
  }
  return (
    <>
      <Rect key='0' x={0} y={0} width={19 * squareWeight} height={19 * squareWeight} stroke={'black'} strokeWidth={1} />
      {
        BOARD1919DATA.map(item => {
          const currentData = boardState.get(`${item.rowIndex},${item.columnIndex}`) || {} as Type
          return <OneRect
              key={`${item.rowIndex}-${item.columnIndex}`}
              squareWeight={squareWeight}
              rowIndex={item.rowIndex}
              columnIndex={item.columnIndex}
              fill={currentData?.fill}
              onClickBoard={(location) => handleClickBoard(location)}
            />
        })
      }
    </>
  )
}
