import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { SignupComponent } from './';
import MockRouter from '../../../__mocks/mockRouter';


const mockStore = configureStore([]);

describe('SignupComponent', () => {
  let wrapper: any; // Change the type to any if necessary
  let store: any;

  beforeEach(() => {
    store = mockStore({
      // Provide initial state if needed
    });

    wrapper = mount(
      <Provider store={store}>
        <MockRouter>
          <SignupComponent />
        </MockRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should match snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
