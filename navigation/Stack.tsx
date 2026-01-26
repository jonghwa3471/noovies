import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, TouchableOpacity } from "react-native";

const NativeStack = createNativeStackNavigator();

const ScreenOne = ({ navigation: { navigate } }: any) => (
  <TouchableOpacity onPress={() => navigate("Two")}>
    <Text>Go to Two</Text>
  </TouchableOpacity>
);
const ScreenTwo = ({ navigation: { navigate } }: any) => (
  <TouchableOpacity onPress={() => navigate("Three")}>
    <Text>Go to Three</Text>
  </TouchableOpacity>
);
const ScreenThree = ({ navigation }: any) => (
  <TouchableOpacity
    onPress={() => {
      const parent = navigation.getParent();
      parent.goBack();
      requestAnimationFrame(() => {
        parent.navigate("Tabs", { screen: "Search" });
      });
    }}
  >
    <Text>Go to Search</Text>
  </TouchableOpacity>
);

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <NativeStack.Screen name="One" component={ScreenOne} />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
}
