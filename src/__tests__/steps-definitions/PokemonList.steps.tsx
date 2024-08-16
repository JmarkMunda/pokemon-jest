import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { getPokemonsAsync } from "../../services/api";
import PokemonList from "../../components/PokemonList";
import { Pokelist } from "../../utils/types";
import { Props } from "../../components/PokemonList/types";

const feature = loadFeature("./src/__tests__/features/PokemonList.feature");

jest.mock("../../services/api", () => ({ getPokemonsAsync: jest.fn() }));

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let props: Props;
  let mockData: Pokelist["results"];
  const mockLoadPokemons = jest.fn();

  beforeEach(() => {
    jest.resetAllMocks();

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

    props = {
      data: mockData,
      loadPokemons: mockLoadPokemons,
    } as unknown as Props;

    (getPokemonsAsync as jest.Mock).mockResolvedValue(mockData);
  });

  test("Render Pokemon List", ({ given, when, then }) => {
    given("I am on the pokemon list screen", () => {
      wrapper = shallow(<PokemonList {...props} />);
    });

    when("the data is successfully loaded", async () => {
      wrapper.update();
    });

    then("it should display the list", () => {
      expect(wrapper.find('[testID="pokemon-list"]')).toBeTruthy();
    });

    when("I scroll down to the bottom end of the list", () => {
      expect(wrapper.find('[testID="pokemon-list"]').simulate("endReached"));
    });

    then("it should load more data until there is no more", () => {
      expect(mockLoadPokemons).toHaveBeenCalled();
    });
  });
});
