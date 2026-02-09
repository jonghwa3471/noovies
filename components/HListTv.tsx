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
  mediaTitle: string;
  data?: TV[];
}

export default function HListTv({ mediaTitle, data }: HListProps) {
  return (
    <ListContainer>
      <ListTitle>{mediaTitle}</ListTitle>
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
            mediaTitle={item.name}
            voteAverage={item.vote_average}
            fullData={item}
          />
        )}
      />
    </ListContainer>
  );
}
