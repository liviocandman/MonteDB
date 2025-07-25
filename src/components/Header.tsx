import { View, Text, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, NavigationProp } from '@react-navigation/native';

export function Header() {
  const navigation = useNavigation<NavigationProp<any>>();

  return (
    <View className="flex-row justify-between items-center mx-4">
      <Text className="text-cyan-500 text-3xl font-bold">
        Monte
        <Text className="text-red-500">
          DB
        </Text>
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate('Search')}>
        <Ionicons name='search-outline' size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}
