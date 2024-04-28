import React from "react";
import { screen } from "@testing-library/react";
import App from "./App";
import { render } from "enzyme";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
const mockStore = configureMockStore();
const store = mockStore({});

test("renders learn react link", () => {
  const wrapper = render(
    <Provider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </Provider>
  );
  expect(wrapper).toMatchSnapshot();
});
