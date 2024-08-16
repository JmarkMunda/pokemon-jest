import { configure } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import "react-native";

configure({ adapter: new Adapter() });
