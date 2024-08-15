import { StyleSheet, View, ActivityIndicator } from "react-native";
import { Component } from "react";
import { Props } from "./types";

export default class Loading extends Component<Props> {
  render() {
    const { color, size = "small", containerStyle, style } = this.props;

    return (
      <View style={[styles.container, containerStyle]}>
        <ActivityIndicator
          {...this.props}
          size={size}
          color={color}
          style={style}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
