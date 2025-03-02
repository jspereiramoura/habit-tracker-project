import { Decorator } from "@storybook/react";
import React from "react";
import { Provider } from "react-redux";
import { makeStore } from "../../src/redux/store";

const reduxWrapperDecorator: Decorator = (Story, context) => {
  const preloadedState = context.parameters?.preloadedState ?? {};

  return (
    <Provider store={makeStore(preloadedState)}>
      <Story />
    </Provider>
  );
};

export default reduxWrapperDecorator;
