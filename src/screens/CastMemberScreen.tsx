import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useRoute, RouteProp, NavigationProp } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, Dimensions, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { fetchPersonDetails, fetchPersonDetailsTranslate, fetchPersonMovies, image500 } from '../api/moviedb';
import { fallbackImagePerson } from '../constants';
import { Loading } from '../components/Loading';
import { ListContent } from '../components/ListContent';

const { width, height } = Dimensions.get("screen");

type RootStackParamList = {
  CastMember: { id: number };
  [key: string]: any;
};

interface Person {
  id: number;
  name: string;
  profile_path: string | null;
  popularity?: number;
  biography?: string;
  [key: string]: any;
}

interface PersonTranslate {
  place_of_birth?: string;
  gender?: number;
  birthday?: string;
  known_for_department?: string;
  biography?: string;
  [key: string]: any;
}

interface Content {
  id: number;
  title: string;
  poster_path: string | null;
  [key: string]: any;
}

export function CastMemberScreen() {
  const route = useRoute<RouteProp<RootStackParamList, 'CastMember'>>();
  const navigation = useNavigation<NavigationProp<any>>();
  const item = route.params;

  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [person, setPerson] = useState<Person | null>(null);
  const [personTranslate, setPersonTranslate] = useState<PersonTranslate | null>(null);
  const [personMovies, setPersonMovies] = useState<Content[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    getPersonDetails(item.id);
    getPersonDetailsTranslate(item.id);
    getPersonMovies(item.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [item]);

  const getPersonDetails = async (id: number) => {
    const data = await fetchPersonDetails(id);
    if (data) setPerson(data);
    setLoading(false);
  };
  const getPersonDetailsTranslate = async (id: number) => {
    const data = await fetchPersonDetailsTranslate(id);
    if (data) setPersonTranslate(data);
  };
  const getPersonMovies = async (id: number) => {
    const data = await fetchPersonMovies(id);
    if (data && data.cast) setPersonMovies(data.cast);
  };

  return (
    <ScrollView className="flex-1 bg-neutral-900" contentContainerStyle={{ paddingBottom: 20 }}>
      <SafeAreaView className="z-20 w-full flex-row justify-between items-center px-4 my-3">
        <TouchableOpacity className="rounded-xl p-1 bg-cyan-500" onPress={() => navigation.goBack()}>
          <Ionicons name='chevron-back' size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
          <Ionicons name='heart' size={38} color={!isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </SafeAreaView>

      {/* Person Details */}
      {loading ? (
        <Loading />
      ) : (
        <View>
          <View className="flex-row justify-center">
            <View className="items-center rounded-full overflow-hidden h-64 w-64 border border-neutral-400">
              <Image
                source={{ uri: image500(person?.profile_path ?? null) || fallbackImagePerson }}
                style={{ width: width * 0.65, height: height * 0.32 }}
              />
            </View>
          </View>

          <View className="mt-6">
            <Text className="text-3xl text-white font-bold text-center">{person?.name}</Text>
            <Text className="text-base text-neutral-500 text-center">{personTranslate?.place_of_birth}</Text>
          </View>

          <View className="mx-3 p-4 mt-6 flex-row items-center bg-neutral-700 rounded-full justify-around space-x-5">
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold ">Gender</Text>
              <Text className="text-neutral-300 text-sm">
                {personTranslate?.gender === 1 ? 'Female' : 'Male'}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Birthday</Text>
              <Text className="text-neutral-300 text-sm">
                {personTranslate?.birthday}
              </Text>
            </View>
            <View className="border-r-2 border-r-neutral-400 px-2 items-center">
              <Text className="text-white font-semibold">Know for</Text>
              <Text className="text-neutral-300 text-sm">
                {personTranslate?.known_for_department}
              </Text>
            </View>
            <View className="px-2 items-center">
              <Text className="text-white font-semibold ">Popularity</Text>
              <Text className="text-neutral-300 text-sm">
                {person?.popularity?.toFixed(2)} %
              </Text>
            </View>
          </View>

          <View className="my-6 mx-4 space-y-2">
            <Text className="text-white text-lg font-medium">Biography</Text>
            <Text className="text-neutral-400 tracking-wide">
              {personTranslate?.biography || person?.biography || "N/A"}
            </Text>
          </View>

          <ListContent title={"Filmes"} data={personMovies} />
        </View>
      )}
    </ScrollView>
  );
}