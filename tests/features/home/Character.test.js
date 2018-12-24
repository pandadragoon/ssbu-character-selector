import React from 'react';
import { shallow } from 'enzyme';
import { Character } from '../../../src/features/home/Character';

describe('home/Character', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <Character {...props} />
    );

    expect(
      renderedComponent.find('.home-character').length
    ).toBe(1);
  });
});
