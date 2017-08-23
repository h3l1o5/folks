import React from 'react'
import { shallow } from 'enzyme'

import EntryPage from '../EntryPage'

describe('EntryPage', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallow(
      <EntryPage />
    )
  })

  it('should have the `h1` "Hello entry page"', () => {
    expect(wrapper.contains(<h1>Hello entry page</h1>)).toBe(true)
  })
})