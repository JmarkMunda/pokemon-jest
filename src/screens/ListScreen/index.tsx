import { StyleSheet, View } from "react-native";
import { Component } from "react";
import { Props, State } from "./types";
import { getPokemonsAsync } from "../../services/api";
import { debounceAsync } from "../../utils/helpers";
import Searchbar from "../../components/Searchbar";
import PokemonList from "../../components/PokemonList";
import Loading from "../../components/Loading";

const LIMIT = 20;

export default class ListScreen extends Component<Props, State> {
  private debouncedFetchPokemons: (query: string) => Promise<void>;

  constructor(props: Props) {
    super(props);
    this.state = {
      pokemons: [],
      searchQuery: "",
      offset: 0,
      isLoading: false,
    };

    this.fetchPokemons = this.fetchPokemons.bind(this);
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
      this.setState({ isLoading: true });
      await this.debouncedFetchPokemons(searchQuery);
    }
  }

  async fetchPokemons(search: string = "") {
    this.setState({ isLoading: true });
    // Perform fetch request
    const data = await getPokemonsAsync(
      search.toLowerCase(),
      LIMIT,
      this.state.offset
    );

    // if use for searching then go to details screen
    if (!!data.id) {
      this.props.navigation.navigate("Details", { id: data.id });
      this.setState({ searchQuery: "", isLoading: false });
      return;
    }
    // else fetch the list of all pokemons
    this.setState((prev) => ({
      pokemons: data?.results ? [...prev.pokemons, ...data.results] : [],
      isLoading: false,
      offset: prev.offset + 20,
    }));
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
        {searchQuery && isLoading ? (
          <Loading />
        ) : (
          <PokemonList
            data={pokemons}
            navigation={navigation}
            loadPokemons={this.fetchPokemons}
          />
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
