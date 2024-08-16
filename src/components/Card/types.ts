import { StyleProp, TouchableOpacityProps, ViewStyle } from "react-native";

export interface Props extends TouchableOpacityProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}
