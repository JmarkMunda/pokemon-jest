import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { getPokemonsAsync } from "../../services/api";
import { Pokelist } from "../../utils/types";
import { Props } from "../../screens/ListScreen/types";
import { Props as PokemonListProps } from "../../components/PokemonList/types";
import PokemonCard from "../../components/PokemonCard";
import Searchbar from "../../components/Searchbar";
import ListScreen from "../../screens/ListScreen";
import PokemonList from "../../components/PokemonList";

const feature = loadFeature("./src/__tests__/features/PokemonList.feature");

jest.mock("../../services/api", () => ({ getPokemonsAsync: jest.fn() }));

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let pokemonListWrapper: ShallowWrapper;
  let props: Props;
  let mockData: Pokelist["results"];
  let mockLoadPokemons = jest.fn();

  beforeEach(() => {
    jest.useFakeTimers();
    jest.resetAllMocks();
    jest.resetModules();

    props = {
      navigation: { navigate: jest.fn() },
    } as unknown as Props;

    mockData = [
      {
        name: "bulbasaur",
        url: "https://pokeapi.co/api/v2/pokemon/1/",
      },
      {
        name: "ivysaur",
        url: "https://pokeapi.co/api/v2/pokemon/2/",
      },
    ];
    (getPokemonsAsync as jest.Mock).mockResolvedValue(mockData);
  });

  test("Render List Screen", ({ given, when, then }) => {
    given("I am on the list screen", () => {
      wrapper = shallow(<ListScreen {...props} />);
    });

    when("I rendered the List Screen", async () => {
      const instance = wrapper.instance() as ListScreen;
      await instance.componentDidMount();
      wrapper.update();
    });

    then("I should see the Search Bar", () => {
      expect(wrapper.find("[testID='search-bar']")).toBeTruthy();
    });

    then("I should see the Pokemon List", () => {
      expect(wrapper.find("[testID='pokemon-list']")).toBeTruthy();
    });

    when("I successfully loaded the data", async () => {
      wrapper.update();
    });

    then("I should see the list of pokemon cards", () => {
      expect(wrapper.find(PokemonCard)).toBeTruthy();
    });

    when("I scroll down to the bottom end of the list", () => {
      const props = {
        data: mockData,
        navigation: { navigate: jest.fn() },
        loadPokemons: mockLoadPokemons,
      } as unknown as PokemonListProps;
      pokemonListWrapper = shallow(<PokemonList {...props} />);
      pokemonListWrapper.simulate("endReached");
    });

    then("it should load more data until there is no more", async () => {
      expect(mockLoadPokemons).toHaveBeenCalled();
    });

    when("I type a name of pokemon in the searchbar", () => {
      const searchTerm = "pikachu";
      const searchBar = wrapper.find(Searchbar);
      searchBar.props().onChangeText(searchTerm);
      wrapper.update();
    });

    then("I should update the search query state", () => {
      expect(wrapper.state("searchQuery")).toBe("pikachu");
    });

    then("I should trigger the search", async () => {
      await (wrapper.instance() as ListScreen).fetchPokemons("pikachu");
      wrapper.update();
      expect(getPokemonsAsync).toHaveBeenCalled();
    });
  });
});
