import { makeImgPath } from "@/utils";
import { useNavigation } from "@react-navigation/native";
import { BlurView } from "expo-blur";
import {
  StyleSheet,
  TouchableWithoutFeedback,
  useColorScheme,
  View,
} from "react-native";
import { styled } from "styled-components/native";
import Poster from "./Poster";

const BgImg = styled.Image``;

const Title = styled.Text`
  font-size: 16px;
  font-weight: 600;
  color: white;
`;

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
  gap: 15px;
`;

const Column = styled.View`
  width: 60%;
`;

const OverView = styled.Text`
  margin-top: 10px;
  color: rgba(255, 255, 255, 0.8);
`;

const Votes = styled(OverView)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  mediaTitle: string;
  voteAverage: number;
  overview: string;
}

export default function Slide({
  backdropPath,
  posterPath,
  mediaTitle,
  voteAverage,
  overview,
}: SlideProps) {
  const isDark = useColorScheme() === "dark";
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation
      .getParent()
      ?.navigate("Stack", { screen: "Detail", params: { mediaTitle } });
  };
  return (
    <TouchableWithoutFeedback onPress={goToDetail}>
      <View style={{ flex: 1 }}>
        <BgImg
          style={StyleSheet.absoluteFill}
          source={{ uri: makeImgPath(backdropPath) }}
        />
        <BlurView
          tint={isDark ? "dark" : "light"}
          intensity={10}
          style={[
            StyleSheet.absoluteFill,
            { backgroundColor: "rgba(0,0,0,0.7)" },
          ]}
        >
          <Wrapper>
            <Poster path={posterPath} />
            <Column>
              <Title>{mediaTitle}</Title>
              <Votes>⭐ {voteAverage.toFixed()} / 10</Votes>
              <OverView>{overview.slice(0, 90)}...</OverView>
            </Column>
          </Wrapper>
        </BlurView>
      </View>
    </TouchableWithoutFeedback>
  );
}
