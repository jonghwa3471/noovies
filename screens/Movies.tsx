import { Text, TouchableOpacity } from "react-native";

export default function Movies({ navigation: { navigate } }: any) {
  return (
    <TouchableOpacity
      onPress={() => navigate("Stack", { screen: "Three" })}
      style={{ flex: 1, alignItems: "center", justifyContent: "center" }}
    >
      <Text>Movies</Text>
    </TouchableOpacity>
  );
}
