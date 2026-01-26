import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { styled } from "styled-components/native";

const Btn = styled.TouchableOpacity`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Title = styled.Text`
  color: ${(props) => props.theme.textColor};
`;

export default function Movies({
  navigation,
}: NativeStackScreenProps<any, "Movies">) {
  return (
    <Btn onPress={() => navigation.navigate("Stack", { screen: "Three" })}>
      <Title>Movies</Title>
    </Btn>
  );
}
