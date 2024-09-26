import { render } from '@testing-library/react';
import Home from 'page';
import { describe, expect, it } from 'vitest';

describe('Home', () => {
  it('should render homepage unchanged', () => {
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
