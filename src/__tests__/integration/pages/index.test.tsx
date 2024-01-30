import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Home from '@/pages/index';

describe('Home', () => {
  it('should render homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
