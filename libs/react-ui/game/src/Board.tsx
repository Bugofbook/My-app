/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import Square from './Square'
import { Box } from '@mui/system';

const Row = ({rows=[] , rowclass='board-row' , change=f=>f}) => {
  const columnlength = rows.length;
  return (
    <Box sx={{ width: `${30 * columnlength}px`, height: '30px', display: 'flex'}}>
      {rows.map((columns , columnkey ) =>
        <Square 
          className={columns.classname}
          value={columns.value}
          key={columnkey}
          onClick={() => change(columnkey)}
        />
        )}
    </Box>
  )
}

const Board = ({ Squares=[] , change=f=>f}) => {
  const rowlength = Squares.length;
  const columnlength = Squares[0].length;
  return (
    <Box sx={{ width: `${30 * columnlength}px`, height: `${30 * rowlength}px`, border: '1px solid black', margin: '0 auto'}}>
      {Squares.map((rows, rowskey) =>
        <Row rows={rows} key={rowskey} change={(columnkey) => change(rowskey, columnkey)} />
      )}
    </Box>
  )
}

export default Board
