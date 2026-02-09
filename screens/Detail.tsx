import { BLACK_COLOR } from "@/colors";
import Poster from "@/components/Poster";
import { RootStackParamList } from "@/navigation/Stack";
import { makeImgPath } from "@/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect } from "react";
import { Dimensions, StyleSheet } from "react-native";
import { styled } from "styled-components/native";

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Header = styled.View`
  height: ${SCREEN_HEIGHT / 4}px;
  justify-content: flex-end;
  padding: 0 20px;
`;

const Background = styled.Image``;

const Column = styled.View`
  flex-direction: row;
  gap: 15px;
`;

const Title = styled.Text`
  color: white;
  font-size: 32px;
  align-self: center;
  font-weight: 500;
  flex-shrink: 1;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin-top: 20px;
  padding: 0 20px;
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  useEffect(() => {
    setOptions({
      title: "title" in params ? "영화" : "TV 시리즈",
    });
  }, [params, setOptions]);
  return (
    <Container>
      <Header>
        <Background
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(params.backdrop_path || "") }}
        />
        <LinearGradient
          // Background Linear Gradient
          colors={["transparent", BLACK_COLOR]}
          style={StyleSheet.absoluteFill}
        />
        <Column>
          <Poster path={params.poster_path || ""} />
          <Title>{"title" in params ? params.title : params.name}</Title>
        </Column>
      </Header>
      <Overview>{params.overview}</Overview>
    </Container>
  );
}
