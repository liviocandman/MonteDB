import { Dimensions, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { image342, Content } from '../api/moviedb'; // Importa Content daqui!
import { fallbackImagePost } from '../constants';
import { useNavigation, NavigationProp } from '@react-navigation/native';

const { width, height } = Dimensions.get("screen");

interface listContentProps {
  title: string;
  data: Content[];
}

export function ListContent({ title, data }: listContentProps) {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View className="mb-8 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white font-semibold text-lg mb-2">
          {data.length > 0 && title}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 6 }}
      >
        {data.map((item: Content, index: number) => (
          <TouchableOpacity
            key={item.id}
            onPress={() => navigation.navigate('Content', { id: item.id, type: item.title ? 'movie' : 'tv' })}
          >
            <Image
              source={{ uri: image342(item.poster_path) || fallbackImagePost }}
              style={{ width: width * 0.45, height: height * 0.3 }}
              className="rounded-sm"
            />
          
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}