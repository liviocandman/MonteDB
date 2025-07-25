import React from 'react';
import { View, Text, Dimensions, TouchableOpacity, Image, FlatList, ListRenderItem } from 'react-native';
import { image500, Content } from '../api/moviedb';
import { fallbackImagePost } from '../constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");

// Definição do tipo Movie


interface TrendingMoviesProps {
  title: string;
  data: Content[];
}

export function TrendingMovies({title, data }: TrendingMoviesProps) {
  const renderItem: ListRenderItem<Content> = ({ item }) => <MovieCard item={item} />;

  return (
    <View className="pt-3 mb-8">
      <Text className="text-white text-xl mx-4 mb-2 font-bold">{title}</Text>
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
      />
    </View>
  );
}

interface MovieCardProps {
  item: Content;
}

const MovieCard = ({ item }: MovieCardProps) => {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <TouchableOpacity 
      onPress={() =>
        navigation.navigate('Content', {
          id: item.id,
          type: item.title ? 'movie' : 'tv'
        })
      }
    >
      <Image
        source={{ uri: image500(item.poster_path) || fallbackImagePost }}
        style={{
          width: width * 0.6,
          height: height * 0.4
        }}
        className="rounded-lg"
      />
    </TouchableOpacity>
  );
};