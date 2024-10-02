import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it, vi } from 'vitest';

import Home from '[lang]/page';
import { GameProvider } from '@/store/Game/GameProvider';
import { BoardSymbolEnum } from '@/utils/entities/board';
import * as calculateRoundResultUtils from '@/utils/functions/calculateRoundResult';

describe('Home', () => {
  it('should render homepage unchanged', () => {
    vi.spyOn(calculateRoundResultUtils, 'getRandomStartingPlayer').mockReturnValue(
      'X' as BoardSymbolEnum
    );
    const { container } = render(
      <NextIntlClientProvider locale='en' messages={{}}>
        <GameProvider>
          <Home />
        </GameProvider>
      </NextIntlClientProvider>
    );
    expect(container).toMatchSnapshot();
  });
});
