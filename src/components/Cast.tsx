import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { image185 } from '../api/moviedb';
import { fallbackImagePerson } from '../constants';
import { NavigationProp } from '@react-navigation/native';

// Tipo para um membro do elenco
export interface CastMember {
  id: number;
  character: string;
  original_name: string;
  profile_path: string | null;
  [key: string]: any;
}

interface CastProps {
  cast: CastMember[];
  navigation: NavigationProp<any>;
}

export function Cast({ cast, navigation }: CastProps) {
  return (
    <View className="my-6">
      <Text className="text-white font-semibold text-lg mx-4 mb-3">Elenco</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {cast && cast.map((item, index) => (
          <TouchableOpacity
            testID={`cast-member-${item.id}`}
            key={item.id ?? index}
            className="mr-3 items-center"
            onPress={() => navigation.navigate('CastMember', item)}
          >
            <View className="overflow-hidden rounded-full w-20 h-20 items-center border border-neutral-500">
              <Image
                source={{ uri: image185(item.profile_path) || fallbackImagePerson }}
                className="rounded-2xl h-24 w-20"
              />
            </View>
            <Text className="text-white text-xs mt-1">
              {item?.character?.length > 10 ? item.character.slice(0, 10) + "..." : item?.character}
            </Text>
            <Text className="text-neutral-400 text-xs mt-1">
              {item?.original_name?.length > 10 ? item.original_name.slice(0, 10) + "..." : item?.original_name}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}