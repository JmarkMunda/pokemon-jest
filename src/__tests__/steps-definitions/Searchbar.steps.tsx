import { shallow, ShallowWrapper } from "enzyme";
import { defineFeature, loadFeature } from "jest-cucumber";
import { Props } from "../../components/Searchbar/types";
import { TextInput } from "react-native";
import Searchbar from "../../components/Searchbar";

const feature = loadFeature("./src/__tests__/features/Searchbar.feature");

defineFeature(feature, (test) => {
  let wrapper: ShallowWrapper;
  let props: Props;
  const inputValue = "hello";

  beforeEach(() => {
    props = {
      value: "",
      onChangeText: jest.fn(),
    };
  });

  test("Render Searchbar", ({ given, when, then }) => {
    given("the searchbar is rendered", () => {
      wrapper = shallow(<Searchbar {...props} />);
    });

    when('the user types "hello" into the search bar', () => {
      const textInput = wrapper.find(TextInput);
      textInput.simulate("changeText", inputValue);
    });

    then('the search value should display "hello"', () => {
      wrapper.setProps({ value: inputValue });
      const textInput = wrapper.find(TextInput);
      expect(textInput.props().value).toBe(inputValue);
    });
  });
});
