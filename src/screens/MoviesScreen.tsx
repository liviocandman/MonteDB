import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Platform, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingMovies } from '../components/TrendingMovies';
import { fetchPopularMovies, fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies, Content } from '../api/moviedb';
import { ListContent } from '../components/ListContent';
import { Loading } from '../components/Loading';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import "../../global"
import { Header } from '../components/Header';

const ios = Platform.OS == "ios";

interface MovieApiResponse {
  results: Content[];
  [key: string]: any;
}
export function MoviesScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [trending, setTrending] = useState<Content[]>([]);
    const [popular, setPopular] = useState<Content[]>([]);
    const [topRated, setTopRated] = useState<Content[]>([]);
    const [upcoming, setUpcoming] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getTrendinMovies();
        getPopularMovies();
        getTopRatedMovies();
        getUpcomingMovies();
    }, []);

const getTrendinMovies = async () => {
    const data = await fetchTrendingMovies() as MovieApiResponse;
    if (data && data.results) setTrending(data.results);
    setLoading(false);
};
const getPopularMovies = async () => {
    const data = await fetchPopularMovies() as MovieApiResponse;
    if (data && data.results) setPopular(data.results);
};
const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies() as MovieApiResponse;
    if (data && data.results) setTopRated(data.results);
};
const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies() as MovieApiResponse;
    if (data && data.results) setUpcoming(data.results);
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
                            contentContainerStyle={{ paddingBottom: 50 }}
                        >
                            <TrendingMovies title='Filmes em alta' data={trending} />

                            <ListContent title={"Filmes populares"} data={popular} />

                            <ListContent title={"Melhores filmes"} data={topRated} />

                            <ListContent title={"Em Breve"} data={upcoming} />
                        </ScrollView>
                    )
                }
            </SafeAreaView>
        </View>
        
    );
}