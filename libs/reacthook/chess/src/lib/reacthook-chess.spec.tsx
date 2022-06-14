import { render } from '@testing-library/react';

import ReacthookChess from './reacthook-chess';

describe('ReacthookChess', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReacthookChess />);
    expect(baseElement).toBeTruthy();
  });
});
