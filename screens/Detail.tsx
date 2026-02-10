import { moviesApi, tvApi } from "@/api";
import { BLACK_COLOR } from "@/colors";
import Loader from "@/components/Loader";
import Poster from "@/components/Poster";
import { RootStackParamList } from "@/navigation/Stack";
import { makeImgPath } from "@/utils";
import { Ionicons } from "@expo/vector-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { LinearGradient } from "expo-linear-gradient";
import * as WebBrowser from "expo-web-browser";
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

const Data = styled.View`
  padding: 0 20px;
`;

const Overview = styled.Text`
  color: ${(props) => props.theme.textColor};
  margin: 20px 0;
`;

const VideoBtn = styled.TouchableOpacity`
  flex-direction: row;
  padding: 10px 0;
  width: 90%;
  align-items: center;
`;

const BtnText = styled.Text`
  color: white;
  font-weight: 600;
  margin-left: 10px;
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  const isMovie = "title" in params;
  const { isLoading, data } = useQuery({
    queryKey: [isMovie ? "movies" : "tv", params.id],
    queryFn: isMovie ? moviesApi.detail : tvApi.detail,
  });
  useEffect(() => {
    setOptions({
      title: "title" in params ? "영화" : "TV 시리즈",
    });
  }, [params, setOptions]);
  const openYTLink = async (videoId: string) => {
    const baseUrl = `https://m.youtube.com/watch?v=${videoId}`;
    // await Linking.openURL(baseUrl);
    await WebBrowser.openBrowserAsync(baseUrl);
  };
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
      <Data>
        <Overview>{params.overview}</Overview>
        {isLoading ? <Loader /> : null}
        {data?.videos?.results?.map((video) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="#FF0034" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
}
