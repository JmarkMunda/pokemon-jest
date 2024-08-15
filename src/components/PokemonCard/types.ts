import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../utils/types"

type NavigationProps = NativeStackScreenProps<RootStackParamList, "List">

export interface Props extends Partial<NavigationProps> {
  item: { name: string; url: string }
}

export interface State {
  id: string
  name: string
  image: string | null
  types: PokemonType[]
}

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}
