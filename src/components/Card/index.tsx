import { StyleSheet, TouchableOpacity } from "react-native";
import { Component } from "react";
import { Props } from "./types";

export default class Card extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { children, style } = this.props;

    return (
      <TouchableOpacity
        testID="card"
        {...this.props}
        style={[styles.container, style]}>
        {children}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d6d6d68b",
    padding: 16,
    borderRadius: 8,
  },
});
