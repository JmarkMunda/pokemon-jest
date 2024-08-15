export type RootStackParamList = {
  List: undefined
  Details: { id: string } | undefined
}

export type Pokelist = {
  count: number
  next: string | null
  previous: string | null
  results: { name: string; url: string }[]
}
