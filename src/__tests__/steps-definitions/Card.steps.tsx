import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Card from "../../components/Card";
import { Text } from "react-native";

const feature = loadFeature("./src/__tests__/features/Card.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;

  test("Render Card Component", ({ given, then }) => {
    given("the card is rendered", () => {
      wrapper = shallow(<Card />);
    });

    then("it should display a card component", () => {
      expect(wrapper.find("[testID='card']")).toBeTruthy();
    });
  });

  test("Render Card Component with Children", ({ given, then }) => {
    given("the card is rendered with children elements", () => {
      wrapper = shallow(
        <Card>
          <Text>Sample</Text>
        </Card>
      );
    });

    then("it should display the children inside the TouchableOpacity", () => {
      expect(wrapper.find(Text)).toBeTruthy();
      expect(wrapper.find("Text").text()).toBe("Sample");
    });
  });
});
