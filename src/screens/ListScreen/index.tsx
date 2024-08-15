import { StyleSheet, View } from "react-native";
import { Component } from "react";
import { Props, State } from "./types";
import { getPokemonsAsync } from "../../services/api";
import Searchbar from "../../components/Searchbar";
import PokemonList from "../../components/PokemonList";
import Loading from "../../components/Loading";
import { debounceAsync } from "../../utils/helpers";

export default class ListScreen extends Component<Props, State> {
  private debouncedFetchPokemons: (query: string) => Promise<void>;

  constructor(props: Props) {
    super(props);
    this.state = {
      searchQuery: "",
      pokemons: [],
      isLoading: false,
    };

    this.debouncedFetchPokemons = debounceAsync(
      this.fetchPokemons.bind(this),
      2000
    );
  }

  async componentDidMount() {
    this.fetchPokemons();
  }

  async componentDidUpdate(
    prevProps: Readonly<Props>,
    prevState: Readonly<State>
  ) {
    const { searchQuery } = this.state;
    if (prevState.searchQuery !== searchQuery) {
      if (!searchQuery) return;
      this.setState({ isLoading: true });

      await this.debouncedFetchPokemons(searchQuery);
      console.log("Searching for pokemon");
    } else {
      console.log("Unchanged search query");
    }
  }

  async fetchPokemons(search: string = "") {
    this.setState({ isLoading: true });
    const data = await getPokemonsAsync(search.toLowerCase());
    // if use for searching then go to details screen
    if (!!data.id) {
      this.props.navigation.navigate("Details", { id: data.id });
      this.setState({ searchQuery: "", isLoading: false });
      return;
    }
    // else fetch the list of all pokemons
    this.setState({ pokemons: data.results ?? [], isLoading: false });
  }

  handleSearchChange(text: string) {
    this.setState({ searchQuery: text });
  }

  render() {
    const { isLoading, pokemons, searchQuery } = this.state;
    const { navigation } = this.props;

    return (
      <View style={styles.container}>
        <Searchbar
          value={searchQuery}
          onChangeText={(text) => this.handleSearchChange(text)}
          placeholder="Search a pokemon"
        />
        {isLoading ? (
          <Loading size="large" color="red" />
        ) : (
          <PokemonList data={pokemons} navigation={navigation} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
  },
  cards: {
    marginVertical: 16,
    gap: 8,
    flexWrap: "wrap",
  },
});
