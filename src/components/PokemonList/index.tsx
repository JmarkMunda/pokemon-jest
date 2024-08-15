import { StyleSheet, FlatList, Text, View } from "react-native";
import { Component } from "react";
import { Props } from "./types";
import PokemonCard from "../PokemonCard";

export default class PokemonList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { data, navigation } = this.props;

    if (data?.length === 0)
      return (
        <View style={styles.empty}>
          <Text style={{ fontWeight: "bold" }}>No pokemon found</Text>
        </View>
      );

    return (
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard item={item} navigation={navigation} />
        )}
        contentContainerStyle={styles.list}
      />
    );
  }
}

const styles = StyleSheet.create({
  empty: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  list: {
    justifyContent: "center",
    alignItems: "center",
  },
});
