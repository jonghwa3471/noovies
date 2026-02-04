import { Movie, MovieResponse, moviesApi } from "@/api";
import { YELLOW_COLOR } from "@/colors";
import HMedia from "@/components/HMedia";
import Loader from "@/components/Loader";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Dimensions, FlatList, ListRenderItemInfo } from "react-native";
import Swiper from "react-native-swiper";
import { styled } from "styled-components/native";

const Container = styled(FlatList<Movie>)`
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

const TrendingScroll = styled(FlatList<Movie>)``;

const VSeperator = styled.View`
  width: 20px;
`;

const HSeperator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movies({
  navigation,
}: NativeStackScreenProps<any, "영화">) {
  const queryClient = useQueryClient();
  const [swiperKey, setSwiperKey] = useState(0);
  const {
    isLoading: nowPlayingLoading,
    data: nowPlayingData,
    isRefetching: isRefetchingNowPlaying,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "nowPlaying"],
    queryFn: moviesApi.nowPlaying,
  });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    isRefetching: isRefetchingUpcoming,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.upcoming,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<MovieResponse>({
    queryKey: ["movies", "trending"],
    queryFn: moviesApi.trending,
  });
  const onRefresh = async () => {
    queryClient.refetchQueries({ queryKey: ["movies"] });
    setSwiperKey((prev) => prev + 1);
  };
  const renderVMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <VMedia posterPath={item.poster_path || ""} />
  );
  const renderHMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <HMedia
      posterPath={item.poster_path || ""}
      movieTitle={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const movieKeyExtractor = (item: Movie) => item.id.toString();
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const refreshing =
    isRefetchingNowPlaying || isRefetchingUpcoming || isRefetchingTrending;
  return loading ? (
    <Loader />
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcomingData?.results}
      ListHeaderComponent={
        <>
          <Swiper
            key={`now-playing-swiper-${swiperKey}`}
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
            {nowPlayingData?.results.map((movie) => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ""}
                posterPath={movie.poster_path || ""}
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
              data={trendingData?.results}
              keyExtractor={movieKeyExtractor}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              showsHorizontalScrollIndicator={true}
              renderItem={renderVMedia}
              ItemSeparatorComponent={VSeperator}
            />
          </ListContainer>
          <ListTitle>곧 개봉</ListTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
      ItemSeparatorComponent={HSeperator}
    />
  );
}
