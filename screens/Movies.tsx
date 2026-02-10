import { Movie, MovieResponse, moviesApi } from "@/api";
import { YELLOW_COLOR } from "@/colors";
import HMedia from "@/components/HMedia";
import Loader from "@/components/Loader";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import { TabsParamList } from "@/navigation/Tabs";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import {
  useInfiniteQuery,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
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

const VSeparator = styled.View`
  width: 20px;
`;

const HSeparator = styled.View`
  height: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movies({
  navigation,
}: BottomTabScreenProps<TabsParamList, "영화">) {
  const queryClient = useQueryClient();
  const [refreshing, setRefreshing] = useState(false);
  const [swiperKey, setSwiperKey] = useState(0);
  const { isLoading: nowPlayingLoading, data: nowPlayingData } =
    useQuery<MovieResponse>({
      queryKey: ["movies", "nowPlaying"],
      queryFn: moviesApi.nowPlaying,
    });
  const {
    isLoading: upcomingLoading,
    data: upcomingData,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MovieResponse>({
    queryKey: ["movies", "upcoming"],
    queryFn: moviesApi.upcoming,
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const nextPage = lastPage.page + 1;
      return nextPage > lastPage.total_pages ? undefined : nextPage;
    },
  });
  const { isLoading: trendingLoading, data: trendingData } =
    useQuery<MovieResponse>({
      queryKey: ["movies", "trending"],
      queryFn: moviesApi.trending,
    });
  const onRefresh = async () => {
    setRefreshing(true);
    setSwiperKey((prev) => prev + 1);
    await queryClient.refetchQueries({ queryKey: ["movies"] });
    setRefreshing(false);
  };
  const renderVMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <VMedia
      posterPath={item.poster_path || ""}
      mediaTitle={item.title}
      fullData={item}
    />
  );
  const renderHMedia = ({ item }: ListRenderItemInfo<Movie>) => (
    <HMedia
      posterPath={item.poster_path || ""}
      mediaTitle={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
      fullData={item}
    />
  );
  const movieKeyExtractor = (item: Movie) => item.id.toString();
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  const loadMore = () => {
    if (hasNextPage) {
      fetchNextPage();
    }
  };
  const renderFooterComponent = (isFetchingNextPage: boolean) =>
    isFetchingNextPage ? <Loader /> : null;
  return loading ? (
    <Loader />
  ) : (
    <Container
      ListFooterComponent={renderFooterComponent(isFetchingNextPage)}
      onEndReached={loadMore}
      onEndReachedThreshold={1}
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcomingData?.pages.map((page) => page.results).flat()}
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
                mediaTitle={movie.title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
                fullData={movie}
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
              ItemSeparatorComponent={VSeparator}
            />
          </ListContainer>
          <ListTitle>곧 개봉</ListTitle>
        </>
      }
      keyExtractor={movieKeyExtractor}
      renderItem={renderHMedia}
      ItemSeparatorComponent={HSeparator}
    />
  );
}
