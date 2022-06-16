/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { Box } from '@mui/system';

const Square = ({ value='none', className='square', onClick}) => {
  return (
    <Box sx={{ width: '30px', height: '30px', display: 'flex', border: '1px solid black' , alignItems: 'center', justifyContent: 'center'}} className={className} onClick={onClick}>
      <Box component='button' sx={{}} style={showChess(value)}>
      </Box>
    </Box>
  )
}

export default Square

const showChess = (value) => {
  switch (value) {
    case "BlackChess":
      return {
        width: "20px",
        height: "20px",
        borderRadius:"10px",
        backgroundColor: "Black",
        border: "1px solid #4d4d4d",
      }
      case "WhiteChess":
        return {
          width: "20px",
          height: "20px",
          borderRadius:"10px",
          backgroundColor: "white",  
          border: "1px solid #4d4d4d",
        }
      default:
        return {
          width: "20px",
          height: "20px",
          backgroundColor: "transparent",  
          borderRadius:"10px",
          cursor: 'pointer',
          border: "0px solid transparent",
        }
  }
}

/*
const selectedStyle = {
    backgroundColor: "white",
    color: "slategray"
}
*/