import { YELLOW_COLOR } from "@/colors";
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
const ScreenThree = ({ navigation: { setOptions } }: any) => (
  <TouchableOpacity
    onPress={() =>
      setOptions({
        title: "Hello!",
      })
    }
  >
    <Text>Change Title</Text>
  </TouchableOpacity>
);

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerTintColor: YELLOW_COLOR,
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <NativeStack.Screen
        name="One"
        component={ScreenOne}
        options={{ headerTitle: "1" }}
      />
      <NativeStack.Screen name="Two" component={ScreenTwo} />
      <NativeStack.Screen name="Three" component={ScreenThree} />
    </NativeStack.Navigator>
  );
}
