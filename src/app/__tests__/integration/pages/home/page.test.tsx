import { render } from '@testing-library/react';
import Home from 'page';
import { describe, expect, it, vi } from 'vitest';

import { BoardSymbolEnum } from '@/utils/entities/board';
import * as calculateRoundResultUtils from '@/utils/functions/calculateRoundResult';

describe('Home', () => {
  it('should render homepage unchanged', () => {
    vi.spyOn(calculateRoundResultUtils, 'getRandomStartingPlayer').mockReturnValue(
      'X' as BoardSymbolEnum
    );
    const { container } = render(<Home />);
    expect(container).toMatchSnapshot();
  });
});
