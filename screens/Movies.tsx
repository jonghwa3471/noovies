import { YELLOW_COLOR } from "@/colors";
import HMedia from "@/components/HMedia";
import Slide from "@/components/Slide";
import VMedia from "@/components/VMedia";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { ActivityIndicator, Dimensions } from "react-native";
import Swiper from "react-native-swiper";
import { styled } from "styled-components/native";

const Container = styled.FlatList`
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

const TrendingScroll = styled.FlatList``;

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
  const [refreshing, setRefreshing] = useState(false);
  const [swiperKey, setSwiperKey] = useState(0);

  const onRefresh = async () => {
    setSwiperKey((prev) => prev + 1);
  };
  const renderVMedia = ({ item }) => <VMedia posterPath={item.poster_path} />;
  const renderHMedia = ({ item }) => (
    <HMedia
      posterPath={item.poster_path}
      movieTitle={item.title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const movieKeyExtractor = (item) => item.id.toString();
  return loading ? (
    <Loader>
      <ActivityIndicator />
    </Loader>
  ) : (
    <Container
      onRefresh={onRefresh}
      refreshing={refreshing}
      data={upcoming}
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
              data={trending}
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
