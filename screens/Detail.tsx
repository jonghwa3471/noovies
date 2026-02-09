import { useEffect } from "react";
import { Text } from "react-native";
import { styled } from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default function Detail({
  navigation: { setOptions },
  route: {
    params: { mediaTitle },
  },
}) {
  useEffect(() => {
    setOptions({
      title: mediaTitle,
    });
  }, []);
  return (
    <Container>
      <Text>Detail</Text>
    </Container>
  );
}
