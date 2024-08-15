import type { NativeStackScreenProps } from "@react-navigation/native-stack"
import { RootStackParamList } from "../../utils/types"

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Details">

export interface Props extends NavigationProps {}

export interface State {
  name: string
  image: string | null
  types: PokemonType[]
  stats: PokemonStats[]
}

type PokemonType = {
  slot: number
  type: {
    name: string
    url: string
  }
}

type PokemonStats = {
  base_stat: string
  effort: string
  stat: {
    name: string
  }
}
