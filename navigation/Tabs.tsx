import Movies from "@/screens/Movies";
import Search from "@/screens/Search";
import Tv from "@/screens/Tv";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Text, View } from "react-native";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator
      initialRouteName="Movies"
      screenOptions={{
        tabBarLabelPosition: "beside-icon",
        tabBarActiveTintColor: "red",
        tabBarInactiveTintColor: "black",
        tabBarStyle: {
          backgroundColor: "teal",
        },
        headerTitleStyle: {
          color: "tomato",
        },
        headerTitleAlign: "center",
        headerRight: () => (
          <View>
            <Text>hi?!</Text>
          </View>
        ),
      }}
    >
      <Tab.Screen name="Movies" component={Movies}></Tab.Screen>
      <Tab.Screen
        name="Tv"
        component={Tv}
        options={{ tabBarBadge: 5 }}
      ></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
}
