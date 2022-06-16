import { render } from '@testing-library/react';

import ReactUiGame from './ReactUiGame';

describe('ReactUiGame', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<ReactUiGame />);
    expect(baseElement).toBeTruthy();
  });
});
