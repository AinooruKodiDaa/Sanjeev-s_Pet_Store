import React from "react";
import { ReactWrapper, ShallowWrapper, mount, shallow } from "enzyme";
import { LoginComponent } from "./index";
import { BrowserRouter, Router } from "react-router-dom";
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
import { mockStore } from "../../../__mocks/redux";
jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useSelector: jest.fn(),
}));

// const mockStore = configureMockStore();
// const store = mockStore({});

describe("LoginComponent", () => {
  let wrapper: ReactWrapper | ShallowWrapper;
  const mockDispatch = jest.fn();
  jest.mock("react-redux", () => ({
    useDispatch: () => mockDispatch,
  }));

  beforeEach(() => {
    wrapper = shallow(
      <Provider store={mockStore}>
        <BrowserRouter>
          <LoginComponent />
        </BrowserRouter>
      </Provider>
    );
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("renders without crashing", () => {
    //console.log(wrapper.debug())
    expect(wrapper.exists()).toBeTruthy();
  });

  // it("ensure wrapper to match snapshot", () => {
  //   expect(wrapper).toMatchSnapshot();
  // });

  // it("Should have two input fields and two buttons", () => {
  //   const form = wrapper.find("#login-form");
  //   const usernameInput = wrapper.find(`#login-username input`); // Find the input element inside #login-username
  //   const passwordInput = wrapper.find(`#login-password input`); // Find the input element inside #login-password

  //   const loginButton = wrapper.find("#login-btn button");
  //   const registerButton = wrapper.find("#signup-btn button");
  //   expect(usernameInput).toHaveLength(1);
  //   expect(form).toHaveLength(1);
  //   expect(passwordInput).toHaveLength(1);
  //   expect(loginButton).toHaveLength(1);
  //   expect(registerButton).toHaveLength(1);
  // });

 

  // it("successful login", () => {
  //   const form = wrapper.find("#login-form");
  //   form.simulate("submit");
  //   expect(mockDispatch).not.toHaveBeenCalled();
  // });

  // it("handles login failure", () => {
  //   const form = wrapper.find("#login-form form");
  //   const usernameInput = wrapper.find(`#login-username input`); // Find the input element inside #login-username
  //   const passwordInput = wrapper.find(`#login-password input`); // Find the input element inside #login-password

  //   usernameInput.simulate("change", {
  //     target: { name: "username", value: "testuser" },
  //   });
  //   passwordInput.simulate("change", {
  //     target: { name: "password", value: "invalidpassword" },
  //   });

  //   form.simulate("submit");
  //   expect(mockDispatch).not.toHaveBeenCalled(); // Ensure dispatch is not called on failure
  // });
});
