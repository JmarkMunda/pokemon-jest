import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Pokelist, RootStackParamList } from "../../utils/types";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "List">;

export interface Props extends NavigationProps {}

export interface State {
  searchQuery: string;
  pokemons: Pokelist["results"];
  isLoading: boolean;
}
