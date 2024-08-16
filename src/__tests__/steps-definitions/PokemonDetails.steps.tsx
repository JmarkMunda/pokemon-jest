import { defineFeature, loadFeature } from "jest-cucumber";
import { Props } from "../../screens/DetailsScreen/types";
import { getPokemonDetailsAsync } from "../../services/api";
import { shallow, ShallowWrapper } from "enzyme";
import DetailsScreen from "../../screens/DetailsScreen";

const feature = loadFeature("./src/__tests__/features/PokemonDetails.feature");

// Mock
jest.mock("../../services/api", () => ({ getPokemonDetailsAsync: jest.fn() }));

defineFeature(feature, (test) => {
  let props: Props;
  let wrapper: ShallowWrapper;
  let instance: DetailsScreen;

  beforeEach(async () => {
    jest.resetModules();
    props = {
      navigation: { navigate: jest.fn() },
      route: { params: { id: 1 } },
    } as unknown as Props;

    (getPokemonDetailsAsync as jest.Mock).mockResolvedValue({
      name: "Pikachu",
      image: "https://example.com/pikachu.png",
      types: [{ type: { name: "electric" } }],
      stats: [
        { stat: { name: "speed" }, base_stat: 90 },
        { stat: { name: "attack" }, base_stat: 55 },
      ],
    });
  });

  test("Navigating to the Pokemon Details", ({ given, when, then, and }) => {
    given("I am on the Pokemon Details screen", () => {
      wrapper = shallow(<DetailsScreen {...props} />);
    });

    when("the Pokemon Details have finished loading", () => {
      instance = wrapper.instance() as DetailsScreen;
    });

    then("I should see the pokemon's name", () => {
      expect(wrapper.find("Text").at(0).text()).toBe("Pikachu");
    });

    and("I should see the pokemon's image", () => {
      expect(
        wrapper.find("Image").findWhere((el) => el.prop("testID") === "image")
      );
    });

    and("I should see the pokemon's types", () => {
      wrapper.find("Text").findWhere((el) => el.prop("textID") === "type");
    });
  });
});
