import { TV } from "@/api";
import { FlatList } from "react-native";
import { styled } from "styled-components/native";
import VMedia from "./VMedia";

const ListContainer = styled.View`
  margin-bottom: 30px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 20px;
  margin-bottom: 10px;
`;

interface HListProps {
  title: string;
  data?: TV[];
}

export default function HList({ title, data }: HListProps) {
  return (
    <ListContainer>
      <ListTitle>{title}</ListTitle>
      <FlatList
        horizontal
        contentContainerStyle={{
          paddingHorizontal: 20,
          gap: 20,
        }}
        data={data}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <VMedia
            posterPath={item.poster_path}
            movieTitle={item.original_name}
            voteAverage={item.vote_average}
          />
        )}
      />
    </ListContainer>
  );
}
