import { YELLOW_COLOR } from "@/colors";
import HMedia from "@/components/HMedia";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useCallback, useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, RefreshControl } from "react-native";
import Swiper from "react-native-swiper";
import { styled } from "styled-components/native";

const API_KEY = "0e7caaa451bd63724c4d4ff302137c3e";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${(props) => props.theme.mainBgColor};
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 10px;
`;

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const TrendingScroll = styled.ScrollView``;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movies({
  navigation,
}: NativeStackScreenProps<any, "영화">) {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [trending, setTrending] = useState([]);
  const getTrending = useCallback(async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`,
      )
    ).json();
    setTrending(results);
  }, []);
  const getUpcoming = useCallback(async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`,
      )
    ).json();
    setUpcoming(results);
  }, []);

  const getNowPlaying = useCallback(async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`,
      )
    ).json();
    setNowPlaying(results);
  }, []);

  const getData = useCallback(async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  }, [getTrending, getUpcoming, getNowPlaying]);

  useEffect(() => {
    getData();
  }, [getData]);

  const onRefresh = async () => {
    setRefreshing(true);
    await getData();
    setRefreshing(false);
  };
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Swiper
        loop
        autoplay
        autoplayTimeout={3.5}
        containerStyle={{
          width: "100%",
          height: SCREEN_HEIGHT / 4,
          marginBottom: 30,
        }}
        paginationStyle={{
          bottom: 10,
        }}
        dotStyle={{
          width: 5,
          height: 5,
          backgroundColor: "white",
        }}
        activeDotColor={YELLOW_COLOR}
      >
        {nowPlaying.map((movie) => (
          <Slide
            key={movie.id}
            backdropPath={movie.backdrop_path}
            posterPath={movie.poster_path}
            movieTitle={movie.title}
            voteAverage={movie.vote_average}
            overview={movie.overview}
          />
        ))}
      </Swiper>
      <ListTitle>지금 뜨는 영화</ListTitle>
      <ListContainer>
        <TrendingScroll
          horizontal
          showsHorizontalScrollIndicator={true}
          contentContainerStyle={{ paddingLeft: 20 }}
        >
          {trending.map((movie) => (
            <VMedia key={movie.id} posterPath={movie.poster_path} />
          ))}
        </TrendingScroll>
      </ListContainer>
      <ListTitle>곧 개봉</ListTitle>
      {upcoming.map((movie) => (
        <HMedia
          key={movie.id}
          posterPath={movie.poster_path}
          movieTitle={movie.title}
          overview={movie.overview}
          releaseDate={movie.release_date}
        />
      ))}
    </Container>
  );
}
