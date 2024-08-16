import { StyleSheet, FlatList, Text, View } from "react-native";
import { Component } from "react";
import { Props } from "./types";
import { SCREEN_HEIGHT } from "../../utils/constants";
import PokemonCard from "../PokemonCard";

export default class PokemonList extends Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const { data, navigation, loadPokemons } = this.props;

    if (data?.length === 0)
      return (
        <View style={styles.empty}>
          <Text style={{ fontWeight: "bold" }}>No pokemon found</Text>
        </View>
      );

    return (
      <FlatList
        testID="pokemon-list"
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <PokemonCard item={item} navigation={navigation} />
        )}
        onEndReached={() => loadPokemons()}
        onEndReachedThreshold={0.2}
        contentContainerStyle={styles.list}
        style={{ height: SCREEN_HEIGHT }}
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
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
