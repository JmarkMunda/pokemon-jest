import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./src/navigators/MainNavigator";

export default class App extends Component<{}, {}> {
  constructor(props: {}) {
    super(props);
  }

  render() {
    return (
      <NavigationContainer>
        <MainNavigator />
      </NavigationContainer>
    );
  }
}

