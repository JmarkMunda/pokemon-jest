import { StyleSheet, TextInput } from "react-native"
import { Component } from "react"
import { Props } from "./types"

export default class Searchbar extends Component<Props> {
  constructor(props: Props) {
    super(props)
  }

  render() {
    return <TextInput {...this.props} style={styles.container} />
  }
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
  },
})
