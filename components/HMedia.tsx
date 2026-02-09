import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import { styled } from "styled-components/native";
import Poster from "./Poster";

const HMovie = styled.View`
  padding: 0 20px;
  flex-direction: row;
  gap: 15px;
`;

const HColumn = styled.View`
  width: 80%;
`;

const OverView = styled.Text`
  color: rgba(255, 255, 255, 0.8);
  width: 80%;
`;

const Release = styled.Text`
  color: white;
  font-size: 12px;
  margin: 10px 0;
`;

const Title = styled.Text`
  color: white;
  font-weight: 600;
`;

interface HMediaProps {
  posterPath: string;
  mediaTitle: string;
  overview: string;
  releaseDate?: string;
  voteAverage?: number;
}

export default function HMedia({
  posterPath,
  mediaTitle,
  overview,
  releaseDate,
  voteAverage,
}: HMediaProps) {
  const navigation = useNavigation();
  const goToDetail = () => {
    navigation
      .getParent()
      ?.navigate("Stack", { screen: "Detail", params: { mediaTitle } });
  };
  return (
    <TouchableOpacity onPress={goToDetail}>
      <HMovie>
        <Poster path={posterPath} />
        <HColumn>
          <Title>{mediaTitle}</Title>
          {releaseDate ? (
            <Release>
              {new Date(releaseDate).toLocaleDateString("ko", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </Release>
          ) : null}
          <OverView>{overview.slice(0, 140)}...</OverView>
        </HColumn>
      </HMovie>
    </TouchableOpacity>
  );
}
