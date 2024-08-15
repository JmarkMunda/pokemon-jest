import { StyleProp, TextInputProps } from "react-native";

export interface Props extends TextInputProps {
  value: string;
  onChangeText: (text: string) => void;
}
