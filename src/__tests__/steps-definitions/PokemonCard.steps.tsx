import { defineFeature, loadFeature } from "jest-cucumber";
import PokemonCard from "../../components/PokemonCard";
import { shallow, ShallowWrapper } from "enzyme";
import { Props } from "../../components/PokemonCard/types";
import { getPokemonDetailsAsync } from "../../services/api";

const feature = loadFeature("./src/__tests__/features/PokemonCard.feature");

jest.mock("../../services/api", () => ({
  getPokemonDetailsAsync: jest.fn(),
}));

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let props: Props;

  beforeEach(() => {
    jest.resetAllMocks();
    props = {
      navigation: { navigate: jest.fn() },
      route: { params: { id: 1 } },
      item: { name: "pikachu", url: "http://pokemon/pikachu" },
    } as unknown as Props;

    (getPokemonDetailsAsync as jest.Mock).mockResolvedValue({
      name: "pikachu",
      sprites: {
        front_default: "https://example/pikachu.png",
      },
      types: [{ type: { name: "grass" } }],
    });
  });

  test("Render Pokemon Card", ({ given, when, then, and }) => {
    given("the card components is rendered", () => {
      wrapper = shallow(<PokemonCard {...props} />);
    });

    when(
      "the card component is rendered with specific Pokemon data",
      async () => {
        const instance = wrapper.instance() as PokemonCard;
        await instance.componentDidMount();
        wrapper.update();
      }
    );

    then("the pokemon's name should be visible on the card", () => {
      expect(wrapper.find('[testID="pokemon-name"]').text()).toBe("PIKACHU");
    });

    and("the pokemon's image should be displayed on the card", () => {
      const imageSource = wrapper
        .find('[testID="pokemon-image"]')
        .prop("source");
      expect(imageSource).toEqual({ uri: "https://example/pikachu.png" });
    });

    when("the card component is pressed", () => {
      wrapper.find('[testID="card"]').simulate("press");
    });

    then("navigate to the details screen", () => {
      expect(props.navigation?.navigate).toHaveBeenCalled();
    });
  });
});
