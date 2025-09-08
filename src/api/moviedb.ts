import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

// Interface unificada para Movie e TvShow
export interface Content {
  id: number;
  title?: string;      // To Movies
  name?: string;       // To Tv Shows
  poster_path: string | null;
  [key: string]: any;
}

export interface ContentApiResponse {
  page: number;
  results: Content[];
  total_pages: number;
  total_results: number;
  [key: string]: any;
}

interface ApiCallOptions {
  endpoint: string;
  params?: Record<string, any>;
}

// Endpoints base
const apiBaseUrl = "https://api.themoviedb.org/3";
const trendingMoviesEndpoint = `${apiBaseUrl}/trending/movie/day?language=pt-BR&page=1`;
const popularMoviesEndpoint = `${apiBaseUrl}/movie/popular?language=pt-BR&page=1`;
const nowPlayingMoviesEndpoint = `${apiBaseUrl}/movie/now_playing?language=pt-BR&page=1`;
const topRatedMoviesEndpoint = `${apiBaseUrl}/movie/top_rated?language=pt-BR&page=1`;
const upcomingMoviesEndpoint = `${apiBaseUrl}/movie/upcoming?language=pt-BR&page=1`;
const searchMoviesEndpoint = `${apiBaseUrl}/search/movie`;
const trendingAllEndpoint = `${apiBaseUrl}/trending/all/day?language=pt-BR&page=1`;

// Endpoints dinâmicos
const movieDetailsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}?language=pt-BR`;
const movieCreditsEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/credits?language=pt-BR`;
const movieVideosEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/videos?language=pt-BR`;
const similarMoviesEndpoint = (id: number) => `${apiBaseUrl}/movie/${id}/similar?language=pt-BR`;


const personDetailsEndpoint = (id: number) => `${apiBaseUrl}/person/${id}`;
const personDetailsTranslateEndpoint = (id: number) => `${apiBaseUrl}/person/${id}?language=pt-BR`;
const personMoviesEndpoint = (id: number) => `${apiBaseUrl}/person/${id}/movie_credits?language=pt-BR`;

// Funções para imagens
export const image500 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w500${path}` : null;
export const image342 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w342${path}` : null;
export const image185 = (path: string | null) => path ? `https://image.tmdb.org/t/p/w185${path}` : null;


const apiCall = async <T = any>({ endpoint, params = {} }: ApiCallOptions): Promise<T> => {
  const apiKey = process.env.EXPO_PUBLIC_API_KEY || ""; // Ajuste conforme seu ambiente
  const options: AxiosRequestConfig = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${apiKey}`
    },
    url: endpoint,
    params: { ...params, language: 'pt-BR', api_key: apiKey }
  };

  try {
    const response: AxiosResponse<T> = await axios.request(options);
    return response.data;
  } catch (err) {
    console.error('API call error:', err);
    throw new Error('Failed to fetch data from API');
  }
};

// Funções de chamada à API com tipagem explícita para filmes
export const fetchTrendingMovies = () => apiCall<ContentApiResponse>({ endpoint: trendingMoviesEndpoint });
export const fetchPopularMovies = () => apiCall<ContentApiResponse>({ endpoint: popularMoviesEndpoint });
export const fetchNowPlayingMovies = () => apiCall<ContentApiResponse>({ endpoint: nowPlayingMoviesEndpoint });
export const fetchTopRatedMovies = () => apiCall<ContentApiResponse>({ endpoint: topRatedMoviesEndpoint });
export const fetchUpcomingMovies = () => apiCall<ContentApiResponse>({ endpoint: upcomingMoviesEndpoint });
export const fetchTrendingAll = () => apiCall<ContentApiResponse>({ endpoint: trendingAllEndpoint });
export const searchMovies = (params: Record<string, any>) => apiCall<ContentApiResponse>({ endpoint: searchMoviesEndpoint, params });
export const fetchMovieDetails = (id: number) => apiCall<Content>({ endpoint: movieDetailsEndpoint(id) });
export const fetchMovieCredits = (id: number) => apiCall<any>({ endpoint: movieCreditsEndpoint(id) });
export const fetchSimilarMovies = (id: number) => apiCall<ContentApiResponse>({ endpoint: similarMoviesEndpoint(id) });
export const fetchMovieVideos = (id: number) => apiCall<any>({ endpoint: movieVideosEndpoint(id) });
export const fetchPersonDetails = (id: number) => apiCall<any>({ endpoint: personDetailsEndpoint(id) });
export const fetchPersonDetailsTranslate = (id: number) => apiCall<any>({ endpoint: personDetailsTranslateEndpoint(id) });
export const fetchPersonMovies = (id: number) => apiCall<any>({ endpoint: personMoviesEndpoint(id) });



// Endpoints base para TV Shows
const trendingTvEndpoint = `${apiBaseUrl}/trending/tv/day?language=pt-BR&page=1`;
const popularTvEndpoint = `${apiBaseUrl}/tv/popular?language=pt-BR&page=1`;
const topRatedTvEndpoint = `${apiBaseUrl}/tv/top_rated?language=pt-BR&page=1`;
const upcomingTvEndpoint = `${apiBaseUrl}/tv/on_the_air?language=pt-BR&page=1`; // "on_the_air" para séries em exibição
const airingTodayTvEndpoint = `${apiBaseUrl}/tv/airing_today?language=pt-BR&page=1`;
const searchTvEndpoint = `${apiBaseUrl}/search/tv`;

// Endpoints dinâmicos para TV Shows
const tvDetailsEndpoint = (id: number) => `${apiBaseUrl}/tv/${id}?language=pt-BR`;
const tvCreditsEndpoint = (id: number) => `${apiBaseUrl}/tv/${id}/credits?language=pt-BR`;
const tvSimilarEndpoint = (id: number) => `${apiBaseUrl}/tv/${id}/similar?language=pt-BR`;
const tvVideosEndpoint = (id: number) => `${apiBaseUrl}/tv/${id}/videos?language=pt-BR`;

// Funções para buscar dados de TV Shows usando Content
export const fetchTrendingTv = () => apiCall<ContentApiResponse>({ endpoint: trendingTvEndpoint });
export const fetchPopularTv = () => apiCall<ContentApiResponse>({ endpoint: popularTvEndpoint });
export const fetchTopRatedTv = () => apiCall<ContentApiResponse>({ endpoint: topRatedTvEndpoint });
export const fetchUpcomingTv = () => apiCall<ContentApiResponse>({ endpoint: upcomingTvEndpoint });
export const fetchAiringTodayTv = () => apiCall<ContentApiResponse>({ endpoint: airingTodayTvEndpoint });
export const searchTv = (params: Record<string, any>) => apiCall<ContentApiResponse>({ endpoint: searchTvEndpoint, params });
export const fetchTvDetails = (id: number) => apiCall<Content>({ endpoint: tvDetailsEndpoint(id) });
export const fetchTvCredits = (id: number) => apiCall<any>({ endpoint: tvCreditsEndpoint(id) });
export const fetchSimilarTv = (id: number) => apiCall<ContentApiResponse>({ endpoint: tvSimilarEndpoint(id) });
export const fetchTvVideos = (id: number) => apiCall<any>({ endpoint: tvVideosEndpoint(id) });