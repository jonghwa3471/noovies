import { DefaultTheme } from "styled-components/native";

declare module "styled-components/native" {
  export interface DefaultTheme {
    mainBgColor: string;
    textColor: string;
  }
}

export const lightTheme: DefaultTheme = {
  mainBgColor: "white",
  textColor: "#1e272e",
};

export const darkTheme: DefaultTheme = {
  mainBgColor: "#1e272e",
  textColor: "#d2dae2",
};
