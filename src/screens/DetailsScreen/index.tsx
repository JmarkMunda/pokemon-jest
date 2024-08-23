import { Text, StyleSheet, View, Image, ScrollView } from "react-native";
import { Component } from "react";
import { Props, State } from "./types";
import { getPokemonDetailsAsync } from "../../services/api";

export default class DetailsScreen extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      name: "",
      image: "",
      stats: [],
      types: [],
    };
  }

  async componentDidMount() {
    const id = this.props.route.params?.id;
    if (!id) return;
    const data = await getPokemonDetailsAsync(id);
    this.setState({
      name: data.name,
      image: data.sprites?.front_default ?? "",
      types: data.types,
      stats: data.stats,
    });
  }

  render() {
    const { name, image, stats, types } = this.state;

    return (
      <ScrollView>
        <View style={styles.container}>
          {/* NAME */}
          <Text testID="name" style={styles.text}>
            {name}
          </Text>
          {/* IMAGE */}
          {image && (
            <Image
              testID="image"
              source={{ uri: image }}
              style={styles.image}
            />
          )}
          <View style={styles.card}>
            {/* TYPES */}
            <View style={styles.badgeContainer}>
              <Text style={{ fontWeight: "500" }}>Pokemon Types:</Text>
              {types.map((type, idx) => (
                <View key={idx} style={styles.badge}>
                  <Text testID="type">{type.type.name}</Text>
                </View>
              ))}
            </View>
            <View style={styles.card}>
              {/* STATS */}
              <View style={styles.statsContainer}>
                {stats.map((stat, idx) => (
                  <View key={idx} style={styles.stats}>
                    <Text>{stat.stat.name.toUpperCase()}</Text>
                    <Text testID="stat" style={{ fontWeight: "500" }}>
                      {stat.base_stat}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontWeight: "bold",
  },
  image: {
    width: 250,
    height: 200,
  },
  badgeContainer: {
    flexDirection: "row",
    gap: 8,
    marginVertical: 16,
  },
  badge: {
    borderRadius: 99,
    backgroundColor: "#d3d3d3",
    paddingVertical: 4,
    paddingHorizontal: 16,
    alignItems: "center",
    alignSelf: "flex-start",
  },
  card: {
    flex: 1,
    padding: 16,
    borderRadius: 16,
    backgroundColor: "rgba(255,255,255, .5)",
    marginVertical: 16,
  },
  statsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    gap: 8,
  },
  stats: {
    width: "40%",
  },
});
