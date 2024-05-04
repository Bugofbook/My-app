import type Konva from 'konva';
import { Circle } from 'react-konva';
import type { ChessSet } from '@my-app-game/chess/chess'
import { getChessName } from '@my-app-game/chess/chess'

type KonvaCircleProps = {
  width: number,
  onClick: (location: string) => void
}
function circleHitFunc(width: number): Konva.CircleConfig["hitFunc"] {
  return (ctx, shape) => {
    ctx.beginPath();
    ctx.rect(-width / 2, -width / 2, width, width);
    ctx.closePath();
    ctx.fillStrokeShape(shape);
  }
}
export function BlackCircle({to, width, onClick }: ChessSet & KonvaCircleProps) {
  if (to === null) {
    return null
  }
  return (
      <Circle
        x={(to[0] * 2 + 1) * width / 2}
        y={(to[1] * 2 + 1) * width / 2}
        radius={width / 3}
        fill={'black'}
        strokeWidth={1}
        stroke={'black'}
        hitFunc={circleHitFunc(width)}
      onClick={() => onClick(to.join(','))}
    />
  )
}
export function WhiteCircle({to, width, onClick }: ChessSet & KonvaCircleProps) {
  if (to === null) {
    return null
  }
  return (
      <Circle
        x={(to[0] * 2 + 1) * width / 2}
        y={(to[1] * 2 + 1) * width / 2}
        radius={width / 3}
        fill={'white'}
        strokeWidth={1}
        stroke={'black'}
        hitFunc={circleHitFunc(width)}
      onClick={() => onClick(to.join(','))}
    />
  )
}

export function StandardChesses(prop: ChessSet) {
  const chessName = getChessName(prop)
  if (chessName === '') {
    return null
  }
  if (chessName === 'blackChess') {
    return (
      <BlackCircle
        width={30}
        onClick={f=>f}
        {...prop}
      />
      )

  }
  if (chessName === 'whiteChess') {
    return (
      <WhiteCircle
        width={30}
        onClick={f=>f}
        {...prop}
      />
    )
  }
  return null
}
