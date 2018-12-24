import React from 'react';
import { shallow } from 'enzyme';
import { AppContainer } from '../../../src/features/common/AppContainer';

describe('common/AppContainer', () => {
  it('renders node with correct class name', () => {
    const props = {
      common: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <AppContainer {...props} />
    );

    expect(
      renderedComponent.find('.common-app-container').length
    ).toBe(1);
  });
});
