import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';
import { useCallback, useState } from 'react';
import { Text, ScrollView, TextInput, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { debounce } from 'lodash';
import { Loading } from '../components/Loading';
import { image500, searchMovies, searchTv, Content } from '../api/moviedb';
import { fallbackImagePost } from '../constants';

const { width, height } = Dimensions.get("screen");

type SearchResult = Content & { media_type?: 'movie' | 'tv' };

export function SearchScreen() {
  const navigation = useNavigation<NavigationProp<any>>();
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (value: string) => {
    if (value && value.length > 2) {
      setLoading(true);

      // Busca filmes e séries em paralelo
      const [moviesData, tvData] = await Promise.all([
        searchMovies({
          query: value,
          include_adult: 'false',
          language: 'pt-BR',
          page: '1'
        }),
        searchTv({
          query: value,
          include_adult: 'false',
          language: 'pt-BR',
          page: '1'
        })
      ]);

      setLoading(false);

      // Adiciona media_type para diferenciar nos resultados
      const movies = (moviesData?.results || []).map((item: Content) => ({ ...item, media_type: 'movie' as 'movie' }));
      const tvshows = (tvData?.results || []).map((item: Content) => ({ ...item, media_type: 'tv' as 'tv' }));

      setResults([...movies, ...tvshows]);
    } else {
      setLoading(false);
      setResults([]);
    }
  };

  const handleTextDebounce = useCallback(debounce(handleSearch, 400), []);

  return (
    <SafeAreaView className='bg-neutral-900 flex-1'>
      <View className="mx-4 my-3 flex-row  items-center justify-between border border-neutral-500 rounded-full">
        <TextInput
          onChangeText={handleTextDebounce}
          placeholder='Encontre filmes e séries...'
          placeholderTextColor={'#9ca3af'}
          className="pb-1 pl-6 text-base font-semibold text-white w-72"
        />
        <TouchableOpacity className="rounded-full p-2 m-1 bg-cyan-500" onPress={() => navigation.navigate('Home')}>
          <Ionicons name='close' size={25} color={"white"} />
        </TouchableOpacity>
      </View>

      {/* Results */}
      {
        loading ? (
          <Loading />
        ) :
          results.length > 0 ? (
            <ScrollView
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 15 }}
              className="space-y-3"
            >
              <Text className="text-white font-semibold ml-1">Resultados ({results.length})</Text>

              <View className='flex-row justify-between flex-wrap'>
                {
                  results.map((item, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() =>
                        navigation.navigate(
                          "Content",
                          { id: item.id, type: item.media_type }
                        )
                      }
                    >
                      <View className="space-y-2 mb-4">
                        <Image
                          source={{ uri: image500(item.poster_path) || fallbackImagePost }}
                          style={{ width: width * 0.44, height: height * 0.3 }}
                          className="rounded-md"
                        />
                        <Text className="text-white text-xs text-center">
                          {(item.title || item.name || '').length > 18
                            ? (item.title || item.name || '').slice(0, 18) + "..."
                            : (item.title || item.name || '')}
                        </Text>
                        <Text className="text-neutral-400 text-xs text-center">
                          {item.media_type === 'movie' ? 'Filme' : 'Série'}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  ))
                }
              </View>
            </ScrollView>
          ) : (
            <View className="flex-row justify-center top-40">
              <Image
                source={{ uri: "https://imgtr.ee/images/2023/06/10/KWu01.png" }}
                style={{ width, height: height * 0.25 }}
              />
            </View>
          )
      }
    </SafeAreaView>
  );
}