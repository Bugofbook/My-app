import styled from '@emotion/styled';

/* eslint-disable-next-line */
export interface ReacthookGameProps {}

const StyledReacthookGame = styled.div`
  color: pink;
`;

export function ReacthookGame(props: ReacthookGameProps) {
  return (
    <StyledReacthookGame>
      <h1>Welcome to ReacthookGame!</h1>
    </StyledReacthookGame>
  );
}

export default ReacthookGame;
