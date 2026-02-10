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
import { Dimensions, Platform, Share, StyleSheet } from "react-native";
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
  align-self: flex-end;
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

const ShareButton = styled.TouchableOpacity``;

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
    const shareMedia = async () => {
      const isAndroid = Platform.OS === "android";
      const homepage = isMovie
        ? `https://www.imdb.com/title/${data.imdb_id}`
        : data.hompage;
      if (isAndroid) {
        await Share.share({
          message: homepage,
          title: isMovie ? params.title : params.name,
        });
      } else {
        await Share.share({
          url: homepage,
          message: params.overview,
        });
      }
    };
    setOptions({
      title: "title" in params ? "영화" : "TV 시리즈",
      headerRight: () => (
        <ShareButton onPress={shareMedia}>
          <Ionicons name="share-outline" color="white" size={24} />
        </ShareButton>
      ),
    });
  }, [params, setOptions, data, isMovie]);
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
        {data?.videos?.results?.map((video: any) => (
          <VideoBtn key={video.key} onPress={() => openYTLink(video.key)}>
            <Ionicons name="logo-youtube" color="#FF0034" size={24} />
            <BtnText>{video.name}</BtnText>
          </VideoBtn>
        ))}
      </Data>
    </Container>
  );
}
