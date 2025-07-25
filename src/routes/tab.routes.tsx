import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MoviesScreen }  from '../screens/MoviesScreen';
import { BlurView } from 'expo-blur';
import { MaterialCommunityIcons, MaterialIcons  } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';
import { TvShowsScreen } from '../screens/TvShowsScreen';
import { HomeScreen } from '../screens/HomeScreen';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  return (
    <Tab.Navigator 
      screenOptions={{
        headerShown: false,
        tabBarStyle: { position: 'absolute' },
        tabBarBackground: () => (
        <BlurView tint="dark" intensity={100} style={StyleSheet.absoluteFill} />
        ),
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialCommunityIcons name="home-outline" color={color} size={size} />
        ),
        }} 
      />
      <Tab.Screen 
        name="Movies" 
        component={MoviesScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="movie-open-outline" color={color} size={size} />
          ),
        }} 
      />
      <Tab.Screen 
      name="TvShows" 
      component={TvShowsScreen}
      options={{
        tabBarIcon: ({ color, size }) => (
          <MaterialIcons name="tv" color={color} size={size} />
        ),
        }} 
      />
    
    </Tab.Navigator>
  );
}