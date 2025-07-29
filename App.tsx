/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import { StatusBar, StyleSheet, useColorScheme, View } from 'react-native';
import SimpleCounter from './src/SimpleCounter';
import AssignmentsList from './src/AssignmentsList';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
// import { enableScreens } from 'react-native-screens';
import GreetingCard from './src/greeting_card/GreetingCard';
import ToggleVisibility from './src/ToggleVisibility';
import Timer from './src/Timer';
import InputHandling from './src/InputHandling';
import Todo from './src/Todo';
import CardGrid from './src/CardGrid';
import MemoizedComp from './src/MemoizedComp';
import CustomHook from './src/CustomHook';
import DarkModeToggle from './src/DarkModeToggle';
// enableScreens(); // improves performance

export type RootStackParamList = {
  AssignmentsList: undefined;
  SimpleCounter: undefined;
  GreetingCard: undefined;
  ToggleVisibility: undefined;
  Timer: undefined;
  InputHandling: undefined;
  Todo: undefined;
  CardGrid: undefined;
  MemoizedComp: undefined;
  CustomHook: undefined;
  DarkModeToggle: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={styles.container}>
      {/* <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} /> */}
      {/* <NewAppScreen templateFileName="App.tsx" /> */}
      {/* <SimpleCounter /> */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="AssignmentsList">
          <Stack.Screen
            name="AssignmentsList"
            component={AssignmentsList}
            options={{ title: 'Assignments' }}
          />
          <Stack.Screen
            name="SimpleCounter"
            component={SimpleCounter}
            options={{ title: 'Simple Counter' }}
          />
          <Stack.Screen
            name="GreetingCard"
            component={GreetingCard}
            options={{ title: 'Greeting Card' }}
          />
          <Stack.Screen
            name="ToggleVisibility"
            component={ToggleVisibility}
            options={{ title: 'Toggle Visibility' }}
          />
          <Stack.Screen
            name="Timer"
            component={Timer}
            options={{ title: 'Timer' }}
          />
          <Stack.Screen
            name="InputHandling"
            component={InputHandling}
            options={{ title: 'Input Handling' }}
          />
          <Stack.Screen
            name="Todo"
            component={Todo}
            options={{ title: 'Todo' }}
          />
          <Stack.Screen
            name="CardGrid"
            component={CardGrid}
            options={{ title: 'CardGrid' }}
          />
          <Stack.Screen
            name="MemoizedComp"
            component={MemoizedComp}
            options={{ title: 'Memoized Component' }}
          />
          <Stack.Screen
            name="CustomHook"
            component={CustomHook}
            options={{ title: 'CustomHook Component' }}
          />
          <Stack.Screen
            name="DarkModeToggle"
            component={DarkModeToggle}
            options={{ title: 'Dark Mode Toggle' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
      {/* <AssignmentsList /> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default App;
