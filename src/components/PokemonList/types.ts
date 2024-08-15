import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { Pokelist, RootStackParamList } from "../../utils/types"

type NavigationProps = NativeStackScreenProps<RootStackParamList, "List">

export interface Props extends Partial<NavigationProps> {
  data: Pokelist["results"]
}
