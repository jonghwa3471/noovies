import Detail from "@/screens/Detail";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const NativeStack = createNativeStackNavigator();

export default function Stack() {
  return (
    <NativeStack.Navigator
      screenOptions={{
        headerTitleAlign: "center",
        headerBackButtonDisplayMode: "minimal",
      }}
    >
      <NativeStack.Screen name="Detail" component={Detail} />
    </NativeStack.Navigator>
  );
}
