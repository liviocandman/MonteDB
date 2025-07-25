import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { View, Text, Platform, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TrendingMovies } from '../components/TrendingMovies';
import { fetchPopularTv, fetchTopRatedTv, fetchTrendingTv, fetchUpcomingTv, Content } from '../api/moviedb';
import { ListContent } from '../components/ListContent';
import { Loading } from '../components/Loading';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import "../../global"
import { Header } from '../components/Header';

const ios = Platform.OS == "ios";

interface TvApiResponse {
  results: Content[];
  [key: string]: any;
}

export function TvShowsScreen() {
    const navigation = useNavigation<NavigationProp<any>>();
    const [trending, setTrending] = useState<Content[]>([]);
    const [popular, setPopular] = useState<Content[]>([]);
    const [topRated, setTopRated] = useState<Content[]>([]);
    const [upcoming, setUpcoming] = useState<Content[]>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        getTrendingTv();
        getPopularTv();
        getTopRatedTv();
        getUpcomingTv();
    }, []);

    const getTrendingTv = async () => {
        const data = await fetchTrendingTv() as TvApiResponse;
        if (data && data.results) setTrending(data.results);
        setLoading(false);
    };
    const getPopularTv = async () => {
        const data = await fetchPopularTv() as TvApiResponse;
        if (data && data.results) setPopular(data.results);
    };
    const getTopRatedTv = async () => {
        const data = await fetchTopRatedTv() as TvApiResponse;
        if (data && data.results) setTopRated(data.results);
    };
    const getUpcomingTv = async () => {
        const data = await fetchUpcomingTv() as TvApiResponse;
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
                            <TrendingMovies title='Séries em alta' data={trending} />

                            <ListContent title={"Séries populares"} data={popular} />

                            <ListContent title={"Melhores séries"} data={topRated} />

                            <ListContent title={"No ar"} data={upcoming} />
                        </ScrollView>
                    )
                }
            </SafeAreaView>
        </View>
    );
}