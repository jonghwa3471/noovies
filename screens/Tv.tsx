import { tvApi, TVResponse } from "@/api";
import HList from "@/components/HList";
import Loader from "@/components/Loader";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { RefreshControl, ScrollView } from "react-native";
import { styled } from "styled-components/native";

const Container = styled(ScrollView)`
  background-color: ${(props) => props.theme.mainBgColor};
`;

export default function Tv({
  navigation,
}: NativeStackScreenProps<any, "시리즈">) {
  const queryClient = useQueryClient();
  const {
    isLoading: airingTodayLoading,
    data: airingTodayData,
    isRefetching: isRefetchingAiringToday,
  } = useQuery<TVResponse>({
    queryKey: ["tv", "airing-today"],
    queryFn: tvApi.airingToday,
  });
  const {
    isLoading: topRatedLoading,
    data: topRatedData,
    isRefetching: isRefetchingTopRated,
  } = useQuery<TVResponse>({
    queryKey: ["tv", "top-rated"],
    queryFn: tvApi.topRated,
  });
  const {
    isLoading: trendingLoading,
    data: trendingData,
    isRefetching: isRefetchingTrending,
  } = useQuery<TVResponse>({
    queryKey: ["tv", "trending"],
    queryFn: tvApi.trending,
  });
  const loading = airingTodayLoading || topRatedLoading || trendingLoading;
  const refreshing =
    isRefetchingAiringToday || isRefetchingTopRated || isRefetchingTrending;
  const onRefresh = () => {
    queryClient.refetchQueries({ queryKey: ["tv"] });
  };
  if (loading) {
    return <Loader />;
  }
  return (
    <Container
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={{ paddingVertical: 20 }}
    >
      <HList title="요즘 뜨는 TV 시리즈" data={trendingData?.results} />
      <HList title="오늘 방영되는 TV 시리즈" data={airingTodayData?.results} />
      <HList title="평점 높은 TV 시리즈" data={topRatedData?.results} />
    </Container>
  );
}
