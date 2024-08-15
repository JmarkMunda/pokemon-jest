import { StyleSheet } from "react-native"
import { Component } from "react"
import ListScreen from "../screens/ListScreen"
import DetailsScreen from "../screens/DetailsScreen"
import { RootStackParamList } from "../utils/types"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator<RootStackParamList>()

export default class MainNavigator extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="List">
        <Stack.Screen name="List" component={ListScreen} options={{}} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    )
  }
}

const styles = StyleSheet.create({})
