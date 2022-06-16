import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ReactUiGameProps {}

const StyledReactUiGame = styled.div`
  color: pink;
`;

export function ReactUiGame(props: ReactUiGameProps) {
  return (
    <StyledReactUiGame>
      <h1>Welcome to ReactUiGame!</h1>
    </StyledReactUiGame>
  );
}

export default ReactUiGame;
