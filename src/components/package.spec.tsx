import { render } from '@testing-library/react';

import Package from './package';

describe('Package', () => {
  it('should render successfully', () => {
    const { baseElement } = render(
      <Package name="react" downloads={12_410_292} />
    );
    expect(baseElement).toBeTruthy();
  });
});
