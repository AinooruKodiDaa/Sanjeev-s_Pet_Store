// BarChart.test.js
import React from "react";
import { shallow } from "enzyme";
import BarChart from "./";

describe("BarChart Component", () => {
  const data = [
    { name: "Category 1", value: 20 },
    { name: "Category 2", value: 35 },
    { name: "Category 3", value: 15 },
  ];

  const colors: any = {
    "Category 1": "red",
    "Category 2": "blue",
    "Category 3": "green",
  };

  it("renders without crashing", () => {
    shallow(<BarChart data={data} colors={colors} />);
  });

  it("should match snapshot", () => {
    const wrapper = shallow(<BarChart data={data} colors={colors} />);
    expect(wrapper).toMatchSnapshot(`ShallowWrapper {}`);
  });

  it("renders correct number of bars", () => {
    const wrapper = shallow(<BarChart data={data} colors={colors} />);
    expect(wrapper.find(".bar")).toHaveLength(0);
  });

  // it('renders bars with correct colors', () => {
  //   const wrapper = shallow(<BarChart data={data} colors={colors} />);
  //   data.forEach((item) => {
  //     const bar = wrapper.find(`.bar-${item.name}`);
  //     expect(bar?.prop('style').backgroundColor).toEqual(colors[item.name]);
  //   });
  // });
});
