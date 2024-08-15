import { ActivityIndicatorProps, StyleProp, ViewStyle } from "react-native";

export interface Props extends ActivityIndicatorProps {
  size?: "large" | "small";
  color?: string;
  containerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
}
