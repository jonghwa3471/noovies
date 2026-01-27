import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dimensions } from "react-native";
import Swiper from "react-native-web-swiper";
import { styled } from "styled-components/native";

const API_KEY = "0e7caaa451bd63724c4d4ff302137c3e";

const Container = styled.ScrollView`
  background-color: ${(props) => props.theme.mainBgColor};
`;

const View = styled.View`
  flex: 1;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

export default function Movies({
  navigation,
}: NativeStackScreenProps<any, "Movies">) {
  const getNowPlaying = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}language=en-US&page=1&region=KR`,
    );
  };
  return (
    <Container>
      <Swiper
        loop
        timeout={3.5}
        springConfig={{
          stiffness: 120,
          damping: 20,
          mass: 1,
        }}
        controlsProps={{
          dotsTouchable: true,
          prevPos: false,
          nextPos: false,
          dotActiveStyle: {
            backgroundColor: "black",
          },
        }}
        containerStyle={{ width: "100%", height: SCREEN_HEIGHT / 4 }}
      >
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
        <View style={{ backgroundColor: "red" }}></View>
        <View style={{ backgroundColor: "blue" }}></View>
      </Swiper>
    </Container>
  );
}
