import React from 'react';
import { shallow } from 'enzyme';

import LoginPage from '../LoginPage';
import LoginForm from '../LoginForm';

describe('LoginPage', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(
      <LoginPage />
    );
  });

  it('should render <LoginForm />"', () => {
    expect(wrapper.contains(<LoginForm />)).toBe(true);
  });
});