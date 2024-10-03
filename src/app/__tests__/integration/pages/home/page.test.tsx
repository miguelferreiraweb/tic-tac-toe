import { render } from '@testing-library/react';
import { NextIntlClientProvider } from 'next-intl';
import { describe, expect, it } from 'vitest';

import Home from '[lang]/page';
import { GameProvider } from '@/store/Game/GameProvider';

describe('Home', () => {
  it('should render homepage unchanged', () => {
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
