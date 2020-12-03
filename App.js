import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import ItemLocation from './components/ItemLocation';

const Stack = createStackNavigator();

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Item Location"
          component={ItemLocation}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;

