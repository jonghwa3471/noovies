import Movies from "@/screens/Movies";
import Search from "@/screens/Search";
import Tv from "@/screens/Tv";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

const Tab = createBottomTabNavigator();

export default function Tabs() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Movies" component={Movies}></Tab.Screen>
      <Tab.Screen name="Tv" component={Tv}></Tab.Screen>
      <Tab.Screen name="Search" component={Search}></Tab.Screen>
    </Tab.Navigator>
  );
}
