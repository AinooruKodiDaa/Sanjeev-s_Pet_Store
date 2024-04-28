import React from "react";
import { shallow } from "enzyme";
import { Button } from "./button";

describe("Button Component", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Button>Test Button</Button>);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders children correctly", () => {
    const wrapper = shallow(<Button>Test Button</Button>);
    expect(wrapper.text()).toBe("Test Button");
  });


  // Add more test cases as needed
});
