import { render } from '@testing-library/react';

import ReacthookGame from './reacthook-game';

describe('ReacthookGame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReacthookGame />);
    expect(baseElement).toBeTruthy();
  });
});
