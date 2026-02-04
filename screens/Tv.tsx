import { tvApi } from "@/api";
import Loader from "@/components/Loader";
import VMedia from "@/components/VMedia";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery } from "@tanstack/react-query";
import { FlatList, ScrollView } from "react-native";
import { styled } from "styled-components/native";

const Container = styled(ScrollView)`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default function Tv({
  navigation,
}: NativeStackScreenProps<any, "시리즈">) {
  const { isLoading: airingTodayLoading, data: airingTodayData } = useQuery({
    queryKey: ["tv", "airing-today"],
    queryFn: tvApi.airingToday,
  });
  const { isLoading: topRatedLoading, data: topRatedData } = useQuery({
    queryKey: ["tv", "top-rated"],
    queryFn: tvApi.topRated,
  });
  const { isLoading: trendingLoading, data: trendingData } = useQuery({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
  });
  const loading = airingTodayLoading || topRatedLoading || trendingLoading;
  if (loading) {
    return <Loader />;
  }
  return (
    <Container>
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 20,
        }}
        horizontal
        data={trendingData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            movieTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 20,
        }}
        horizontal
        data={airingTodayData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            movieTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
      <FlatList
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 20,
        }}
        horizontal
        data={topRatedData.results}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            movieTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </Container>
  );
}
