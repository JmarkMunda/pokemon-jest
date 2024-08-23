import { defineFeature, loadFeature } from "jest-cucumber";
import { Props } from "../../screens/DetailsScreen/types";
import { getPokemonDetailsAsync } from "../../services/api";
import { shallow, ShallowWrapper } from "enzyme";
import DetailsScreen from "../../screens/DetailsScreen";
import { Image, ImageSourcePropType } from "react-native";

const feature = loadFeature("./src/__tests__/features/PokemonDetails.feature");

// Mock
jest.mock("../../services/api", () => ({ getPokemonDetailsAsync: jest.fn() }));

defineFeature(feature, (test) => {
  let props: Props;
  let wrapper: ShallowWrapper;
  let instance: DetailsScreen;

  beforeEach(async () => {
    jest.resetAllMocks();
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

  test("Render Details Screen with Pokemon Data", ({
    given,
    when,
    then,
    and,
  }) => {
    given("I am on the Pokemon Details screen", () => {
      wrapper = shallow(<DetailsScreen {...props} />);
    });

    when("I load the Pokemon Details", async () => {
      instance = wrapper.instance() as DetailsScreen;
      await instance.componentDidMount();
      wrapper.update();
    });

    then("I should see the pokemon's name", () => {
      const nameText = wrapper.find("[testID='name']").text();
      expect(nameText).toBe("Pikachu");
    });

    and("I should see the pokemon's image", () => {
      expect(wrapper.find("[testID='image']")).toBeTruthy();
    });

    and("I should see the pokemon's stats", () => {
      const stat = wrapper.find("[testID='stat']");
      expect(stat).toBeTruthy();
    });

    and("I should see the pokemon's types", () => {
      const type = wrapper.find("[testID='type']");
      expect(type).toBeTruthy();
    });
  });
});
