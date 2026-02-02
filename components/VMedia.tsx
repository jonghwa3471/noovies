import { styled } from "styled-components/native";
import Poster from "./Poster";

const Movie = styled.View`
  margin-right: 20px;
`;

interface VMediaProps {
  posterPath: string;
  movieTitle?: string;
  voteAverage?: number;
}

export default function VMedia({
  posterPath,
  movieTitle,
  voteAverage,
}: VMediaProps) {
  return (
    <Movie>
      <Poster path={posterPath} />
    </Movie>
  );
}
