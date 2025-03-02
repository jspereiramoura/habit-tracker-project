import { Decorator } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../../src/redux/store";


const reduxWrapperDecorator: Decorator = (Story) => (
  <Provider store={makeStore()}>
    <Story />
  </Provider>
);

export default reduxWrapperDecorator;
