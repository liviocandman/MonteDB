
import { createStackNavigator } from '@react-navigation/stack';
import { TabNavigator } from './tab.routes';


import { ContentScreen } from '../screens/ContentScreen';
import { CastMemberScreen } from '../screens/CastMemberScreen';
import { SearchScreen } from '../screens/SearchScreen';


const Stack = createStackNavigator();

export function StackNavigator() {
  
    return (
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="Tab" component={TabNavigator}/>
        <Stack.Screen name="Search" component={SearchScreen}/>
        <Stack.Screen name="Content" component={ContentScreen}/>
        <Stack.Screen name="CastMember" component={CastMemberScreen}/>
      </Stack.Navigator>
    );
}