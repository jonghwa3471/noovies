import { Movie, TV } from "@/api";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import Poster from "./Poster";

const Container = styled.View``;

interface VMediaProps {
  posterPath: string;
  mediaTitle: string;
  voteAverage?: number;
  fullData: Movie | TV;
}

export default function VMedia({
  posterPath,
  mediaTitle,
  voteAverage,
  fullData,
}: VMediaProps) {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation
      .getParent()
      ?.navigate("Stack", { screen: "Detail", params: { ...fullData } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Container>
        <Poster path={posterPath} />
      </Container>
    </TouchableOpacity>
  );
}
