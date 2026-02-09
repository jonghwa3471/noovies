import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import Poster from "./Poster";

const Movie = styled.View``;

interface VMediaProps {
  posterPath: string;
  mediaTitle: string;
  voteAverage?: number;
}

export default function VMedia({
  posterPath,
  mediaTitle,
  voteAverage,
}: VMediaProps) {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation
      .getParent()
      ?.navigate("Stack", { screen: "Detail", params: { mediaTitle } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <Movie>
        <Poster path={posterPath} />
      </Movie>
    </TouchableOpacity>
  );
}
