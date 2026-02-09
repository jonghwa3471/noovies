import { moviesApi, tvApi } from "@/api";
import HList from "@/components/HList";
import Loader from "@/components/Loader";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { styled } from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const SearchBar = styled.TextInput`
  background-color: white;
  padding: 10px 15px;
  border-radius: 15px;
  width: 90%;
  margin: 10px auto;
  margin-bottom: 40px;
`;

export default function Search() {
  const [query, setQuery] = useState("");
  const {
    isLoading: moviesLoading,
    data: moviesData,
    refetch: searchMovies,
  } = useQuery({
    queryKey: ["searchMovies", query],
    queryFn: moviesApi.search,
    enabled: false,
  });
  const {
    isLoading: tvLoading,
    data: tvData,
    refetch: searchTV,
  } = useQuery({
    queryKey: ["searchTv", query],
    queryFn: tvApi.search,
    enabled: false,
  });
  const onChangeText = (text: string) => setQuery(text);
  const onSubmit = () => {
    if (query === "") {
      return;
    } else {
      searchMovies();
      searchTV();
    }
  };
  return (
    <Container>
      <SearchBar
        placeholder="영화 또는 TV 시리즈 검색"
        placeholderTextColor="gray"
        returnKeyType="search"
        autoCapitalize="none"
        onChangeText={onChangeText}
        value={query}
        onSubmitEditing={onSubmit}
      />
      {moviesLoading || tvLoading ? <Loader /> : null}
      {moviesData ? (
        <HList title="Movie Results" data={moviesData.results} />
      ) : null}
      {tvData ? <HList title="TV Results" data={tvData.results} /> : null}
    </Container>
  );
}
