import { Text, StyleSheet, Image, View } from "react-native";
import { Component } from "react";
import { Props, State } from "./types";
import { getPokemonDetailsAsync } from "../../services/api";
import { SCREEN_WIDTH } from "../../utils/constants";
import Card from "../Card";

const CARD_WIDTH = SCREEN_WIDTH / 2 - 32;

export default class PokemonCard extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      id: "",
      name: "" || this.props.item.name,
      image: "",
      types: [],
    };
  }

  async componentDidMount() {
    const { url } = this.props.item;
    const urlParts = url?.split("/");
    const id = urlParts[urlParts?.length - 2];
    const data = await getPokemonDetailsAsync(id);
    this.setState({
      id,
      name: data?.name,
      image: data?.sprites?.front_default ?? "",
      types: data?.types,
    });
  }

  handleCardPress() {
    const { navigation } = this.props;
    const { id } = this.state;
    navigation?.navigate("Details", { id });
  }

  render() {
    const { name, image, types } = this.state;

    return (
      <Card
        testID="card"
        style={styles.container}
        onPress={() => this.handleCardPress()}>
        <Text testID="pokemon-name" style={styles.title}>
          {name.toUpperCase()}
        </Text>
        <Image
          testID="pokemon-image"
          source={{ uri: image! }}
          style={styles.image}
        />
        <View style={styles.badgeContainer}>
          {types?.map(({ type }) => (
            <View key={type?.name} style={styles.badge}>
              <Text>{type?.name}</Text>
            </View>
          ))}
        </View>
      </Card>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    minWidth: CARD_WIDTH,
    justifyContent: "center",
    alignItems: "center",
    margin: 8,
  },
  title: {
    fontWeight: "bold",
  },
  image: {
    width: 100,
    height: 100,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
  },
  badge: {
    borderRadius: 99,
    backgroundColor: "#d3d3d3",
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignSelf: "flex-start",
  },
});
