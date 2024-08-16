import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import Loading from "../../components/Loading";
import { ActivityIndicator } from "react-native";

const feature = loadFeature("./src/__tests__/features/Loading.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;

  //   Scenario 1
  test("Render Loading Component with default props", ({ given, then }) => {
    given("the loading spinner is rendered", () => {
      wrapper = shallow(<Loading />);
    });

    then("it should display an ActivityIndicator with default props", () => {
      const activityIndicator = wrapper.find(ActivityIndicator);
      expect(activityIndicator).toBeTruthy();
      expect(activityIndicator.props().color).toBeUndefined();
      expect(activityIndicator.props().size).toBe("small");
    });
  });

  // Scenario 2
  test("render Loading Component with custom props", ({ given, then }) => {
    given(
      "the loading spinner is rendered with a custom color of red and size large",
      () => {
        wrapper = shallow(<Loading color="red" size="large" />);
      }
    );

    then(
      "it should display an ActivityIndicator with color red and size large",
      () => {
        const activityIndicator = wrapper.find(ActivityIndicator);
        expect(activityIndicator).toBeTruthy();
        expect(activityIndicator.props().color).toBe("red");
        expect(activityIndicator.props().size).toBe("large");
      }
    );
  });
});
