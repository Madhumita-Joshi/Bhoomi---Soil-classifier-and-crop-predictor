import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';


import Welcome from "./Welcome";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import Home from './Home';
import Result from './Result';
import History from './History';
import CropCatalog from './Catalog';
import Blog from './CropInfo';
import Profile from './Profile';
import EditProfile from './EditProfile';

import BottomSheetComponent from "./BottomSheetComponent";


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigation = () => {
    return (
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerMode:false}}>
          <Stack.Screen name="Welcome"  component={Welcome} navigationKey='welcome' />
          <Stack.Screen name="SignUp" component={SignUp} navigationKey='signUp' />
          <Stack.Screen name="SignIn" component={SignIn} />
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="Result" component={Result} />
          <Stack.Screen name="History" component={History} />
          <Stack.Screen name="Catalog" component={CropCatalog} />
          <Stack.Screen name="Blog" component={Blog} />
          <Stack.Screen name="Profile" component={Profile} />
          <Stack.Screen name="EditProfile" component={EditProfile} />

          <Stack.Screen name="Bottom" component={BottomSheetComponent} />

        </Stack.Navigator>

      </NavigationContainer>

    );
}

export default StackNavigation;
