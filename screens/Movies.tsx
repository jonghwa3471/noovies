import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";

const Btn = styled(TouchableOpacity)`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Title = styled.Text<{ $selected: boolean }>`
  color: ${(props) => (props.$selected ? "blue" : "red")};
`;

export default function Movies({ navigation: { navigate } }: any) {
  return (
    <Btn onPress={() => navigate("Stack", { screen: "Three" })}>
      <Title $selected={true}>Movies</Title>
    </Btn>
  );
}
