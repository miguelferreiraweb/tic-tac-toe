import { render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';
import { describe, expect, it } from 'vitest';

import MyApp from '@/pages/_app';

describe('App', () => {
  const MockPage = () => <div>mock page</div>;
  it('should render app unchanged', () => {
    const { container } = render(
      <MyApp Component={MockPage} pageProps={{}} router={mockRouter as any} />
    );
    expect(screen.getByText('mock page')).toBeInTheDocument();
    expect(container).toMatchSnapshot();
  });
});
