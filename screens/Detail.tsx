import Poster from "@/components/Poster";
import { RootStackParamList } from "@/navigation/Stack";
import { makeImgPath } from "@/utils";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect } from "react";
import { styled } from "styled-components/native";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

type DetailScreenProps = NativeStackScreenProps<RootStackParamList, "Detail">;

export default function Detail({
  navigation: { setOptions },
  route: { params },
}: DetailScreenProps) {
  useEffect(() => {
    setOptions({
      title: "title" in params ? params.title : params.name,
    });
  }, [params, setOptions]);
  return (
    <Container>
      <Poster path={makeImgPath(params.poster_path) || ""} />
    </Container>
  );
}
