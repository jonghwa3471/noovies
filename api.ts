import { QueryFunctionContext } from "@tanstack/react-query";

export interface Movie {
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface TV {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  original_language: string;
  genre_ids: object;
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: object;
}

interface BaseResponse {
  page: number;
  total_results: number;
  total_pages: number;
}

export interface MovieResponse extends BaseResponse {
  results: Movie[];
}

export interface TVResponse extends BaseResponse {
  results: TV[];
}

type SearchMoviesQueryKey = ["searchMovies", string];
type SearchTvQueryKey = ["searchTv", string];

export const moviesApi = {
  trending: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  upcoming: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  nowPlaying: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  search: async ({ queryKey }: QueryFunctionContext<SearchMoviesQueryKey>) => {
    const [, query] = queryKey;
    return fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/search/movie?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${query}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json());
  },
};

export const tvApi = {
  trending: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/trending/tv/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  airingToday: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/tv/airing_today?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  topRated: () =>
    fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/tv/top_rated?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json()),
  search: async ({ queryKey }: QueryFunctionContext<SearchTvQueryKey>) => {
    const [, query] = queryKey;
    return fetch(
      `${process.env.EXPO_PUBLIC_BASE_URL}/search/tv?api_key=${process.env.EXPO_PUBLIC_API_KEY}&query=${query}&language=ko-KR&page=1&region=KR`,
    ).then((res) => res.json());
  },
};
