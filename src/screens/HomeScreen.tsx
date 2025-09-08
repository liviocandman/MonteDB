import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingMovies } from '../components/TrendingMovies';
import {
  fetchTrendingMovies, fetchTrendingTv,
  fetchPopularMovies, fetchPopularTv,
  fetchTopRatedMovies, fetchTopRatedTv,
  Content,
  fetchTrendingAll
} from '../api/moviedb';
import { ListContent } from '../components/ListContent';
import { Loading } from '../components/Loading';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { Header } from '../components/Header';

const ios = Platform.OS == "ios";

export function HomeScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [trendingAll, setTrendingAll] = useState<Content[]>([]);
  const [popularMovies, setPopularMovies] = useState<Content[]>([]);
  const [popularTv, setPopularTv] = useState<Content[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Content[]>([]);
  const [topRatedTv, setTopRatedTv] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getTrendingAll();
    getPopularMovies();
    getPopularTv();
    getTopRatedMovies();
    getTopRatedTv();
  }, []);

  const getTrendingAll = async () => {
    const data = await fetchTrendingAll();
    if (data && data.results) setTrendingAll(data.results);
    setLoading(false);
  };
  const getPopularMovies = async () => {
    const data = await fetchPopularMovies();
    if (data && data.results) setPopularMovies(data.results);
  };
  const getPopularTv = async () => {
    const data = await fetchPopularTv();
    if (data && data.results) setPopularTv(data.results);
  };
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies();
    if (data && data.results) setTopRatedMovies(data.results);
  };
  const getTopRatedTv = async () => {
    const data = await fetchTopRatedTv();
    if (data && data.results) setTopRatedTv(data.results);
  };

  return (
    <View className="flex-1 bg-neutral-900">
      <SafeAreaView className={ios ? "-mb-2" : "mb-3"}>
        <StatusBar style='light' />
        <Header />
      {
        loading ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 50, paddingTop: 10 }}
          >
            <TrendingMovies title='Destaques da semana' data={trendingAll} />

            <ListContent title={"Filmes Populares"} data={popularMovies} />

            <ListContent title={"Séries Populares"} data={popularTv} />

            <ListContent title={"Melhores Filmes"} data={topRatedMovies} />

            <ListContent title={"Melhores Séries"} data={topRatedTv} />
          </ScrollView>
        )
      }
      </SafeAreaView>
    </View>
  );
}