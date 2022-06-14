import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ReacthookChessProps {}

const StyledReacthookChess = styled.div`
  color: pink;
`;

export function ReacthookChess(props: ReacthookChessProps) {
  return (
    <StyledReacthookChess>
      <h1>Welcome to ReacthookChess!</h1>
    </StyledReacthookChess>
  );
}

export default ReacthookChess;
