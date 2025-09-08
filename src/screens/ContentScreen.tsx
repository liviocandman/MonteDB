import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { Text, View, Image, Dimensions, ScrollView, TouchableOpacity } from 'react-native';
import {
  fetchMovieCredits, fetchMovieDetails, fetchMovieVideos, fetchSimilarMovies,
  fetchTvCredits, fetchTvDetails, fetchTvVideos, fetchSimilarTv,
  image500, Content
} from '../api/moviedb';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { ListContent } from '../components/ListContent';
import { Cast, CastMember } from '../components/Cast';
import { Loading } from '../components/Loading';
import { ContentVideo } from '../components/ContentVideo';


const { width, height } = Dimensions.get("screen");

type RootStackParamList = {
  Content: { id: number; type: 'movie' | 'tv' };
  [key: string]: any;
};

export function ContentScreen() {
  const [content, setContent] = useState<Content | null>(null);
  const [cast, setCast] = useState<CastMember[]>([]);
  const [similar, setSimilar] = useState<Content[]>([]);
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const route = useRoute<RouteProp<RootStackParamList, 'Content'>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const { id, type } = route.params;

  useEffect(() => {
    setLoading(true);
    if (type === 'movie') {
      getMovieDetails(id);
      getSimilarMovies(id);
      getMovieCredits(id);
      getMovieVideos(id);
    } else {
      getTvDetails(id);
      getSimilarTv(id);
      getTvCredits(id);
      getTvVideos(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, type]);

  // Funções para filmes
  const getMovieDetails = async (id: number) => {
    const data = await fetchMovieDetails(id);
    if (data) setContent(data);
    setLoading(false);
  };
  const getSimilarMovies = async (id: number) => {
    const data = await fetchSimilarMovies(id);
    if (data && data.results) setSimilar(data.results);
  };
  const getMovieCredits = async (id: number) => {
    const data = await fetchMovieCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  const getMovieVideos = async (id: number) => {
    const data = await fetchMovieVideos(id);
    if (data && data.results) setVideos(data.results);
  };

  // Funções para séries
  const getTvDetails = async (id: number) => {
    const data = await fetchTvDetails(id);
    if (data) setContent(data);
    setLoading(false);
  };
  const getSimilarTv = async (id: number) => {
    const data = await fetchSimilarTv(id);
    if (data && data.results) setSimilar(data.results);
  };
  const getTvCredits = async (id: number) => {
    const data = await fetchTvCredits(id);
    if (data && data.cast) setCast(data.cast);
  };
  const getTvVideos = async (id: number) => {
    const data = await fetchTvVideos(id);
    if (data && data.results) setVideos(data.results);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 mt-3">
        <TouchableOpacity className="rounded-xl p-1 bg-cyan-500 items-center" onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={25} color="white" />
        </TouchableOpacity>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <View>
          <Image
            source={{ uri: image500(content?.poster_path ?? null) ?? undefined }}
            style={{ width, height: height * 0.6 }}
          />
          <LinearGradient
            colors={['transparent', "rgba(23,23,23,0.8)", "rgba(23,23,23,1)" ]}
            start={{ x: 0.5, y: 0 }}
            end={{ x: 0.5, y: 1 }}
            style={{ width: width, height: height * 0.4 }}
            className="absolute bottom-0"
          />
        </View>
      )}

      {/* Detalhes */}
      <View style={{ marginTop: -(height * 0.1) }} className='space-y-3'>
        <Text className="text-white text-center text text-3xl font-bold tracking-wider">
          {content?.title || content?.name}
        </Text>

        {content?.id ? (
          <Text className="text-neutral-400 font-semibold text-base text-center">
            {/* Exemplo: para filmes e séries */}
            {type === 'movie'
              ? `${content?.release_date?.split('-')[0]} • ${content?.status} • ${content?.runtime} min`
              : `${content?.first_air_date?.split('-')[0]} • ${content?.status} • ${content?.episode_run_time?.[0] || ''} min`}
          </Text>
        ) : null}

        <View className="flex-row justify-center mx-4 ">
          {content?.genres?.map((genre: any, index: number) => {
            let showDot = index + 1 !== content?.genres?.length;
            return (
              <Text key={index} className="text-neutral-400 font-semibold text-base text-center">
                {genre?.name}{showDot ? " • " : null}
              </Text>
            );
          })}
        </View>
        <Text className="text-neutral-400 mx-4 tracking-wide mb-4">
          {content?.overview}
        </Text>
      </View>

      <Cast navigation={navigation} cast={cast} />

      {videos?.length > 0 && <ContentVideo title={"Trailer"} data={videos} />}

      <ListContent title={type === 'movie' ? "Filmes semelhantes" : "Séries semelhantes"} data={similar} />
    </ScrollView>
  );
}