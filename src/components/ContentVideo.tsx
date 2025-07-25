import { Dimensions, ScrollView, Text, View } from 'react-native';
import YoutubeIframe from 'react-native-youtube-iframe';
const { width } = Dimensions.get("screen");

// Tipo para um vídeo do YouTube da API TMDB
export interface ContentVideoItem {
  key: string;
  name?: string;
  site?: string;
  type?: string;
  [key: string]: any;
}

interface ContentVideoProps {
  data: ContentVideoItem[];
  title: string;
}

export function ContentVideo({ data, title }: ContentVideoProps) {
  return (
    <View className="mb-3 space-y-4">
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-white font-bold text-xl">
          {data.length > 0 && title}
        </Text>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15 }}
      >
        {data
          .filter((item) => item.site === 'YouTube' && item.key)
          .slice(0, 1)
          .map((item, index) => (
            <View className="justify-center items-center" key={index}>
              <YoutubeIframe
                height={220}
                width={width * 0.92}
                videoId={item.key}
                play={false}
              />
            </View>
          ))}
      </ScrollView>
    </View>
  );
}