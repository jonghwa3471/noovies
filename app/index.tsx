import { Ionicons } from "@expo/vector-icons";
import { useAssets } from "expo-asset";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { Image, Text } from "react-native";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [assets] = useAssets([require("../assets/images/Avicii_img.jpeg")]);
  const [loaded] = useFonts(Ionicons.font);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    async function prepare() {
      try {
        await Image.prefetch(
          "https://velog.velcdn.com/images/rjs8833/post/da7e04bc-5460-410a-9d3c-caa9f89ee49f/image.png",
        );
      } catch (e) {
        console.warn(e);
      } finally {
        setReady(true);
      }
    }
    prepare();
  }, []);
  useEffect(() => {
    if (assets && loaded && ready) {
      (async () => {
        await SplashScreen.hideAsync();
      })();
    }
  }, [ready, assets, loaded]);

  if (!ready || !assets || !loaded) return null;

  return <Text>we are done loading!!!</Text>;
}
