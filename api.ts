const trending = () =>
  fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/trending/movie/week?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
  ).then((res) => res.json());

const upcoming = () =>
  fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/movie/upcoming?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
  ).then((res) => res.json());

const nowPlaying = () =>
  fetch(
    `${process.env.EXPO_PUBLIC_BASE_URL}/movie/now_playing?api_key=${process.env.EXPO_PUBLIC_API_KEY}&language=ko-KR&page=1&region=KR`,
  ).then((res) => res.json());

export const moviesApi = {
  trending,
  upcoming,
  nowPlaying,
};
