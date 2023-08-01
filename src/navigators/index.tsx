import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {
  SplashScreen,
  WelcomeScreen,
  SigninScreen,
  signUpScreen,
  ForgotPassword,
  RegisterPhoneScreen,
  verificationScreen,
  HomeScreen,
} from '../screens';
import {createStackNavigator} from '@react-navigation/stack';
import {useSelector, useDispatch} from 'react-redux'
import { GeneralAction } from '../actions';

const Stack = createStackNavigator();

const Navigators = () => {
  const{isAppLoading,token,isFirstTimeUse}= useSelector(
    state => state.generalState,
  );

  const dispatch = useDispatch();
  useEffect(()=>{
    dispatch(GeneralAction.appStart());

  },[])
  
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        {isAppLoading ? (
          <Stack.Screen name="Splash" component={SplashScreen} />
         ): !token ? (
          <>
          {isFirstTimeUse &&(
              <Stack.Screen name="Welcome" component={WelcomeScreen} />
          )}

            <Stack.Screen name="Signin" component={SigninScreen} />
            <Stack.Screen name="SignUp" component={signUpScreen} />
            <Stack.Screen name="Forgot" component={ForgotPassword} />
            <Stack.Screen
              name="RegisterPhone"
              component={RegisterPhoneScreen}
            />
            <Stack.Screen name="Verification" component={verificationScreen} />
          </>
        ) : (
          <Stack.Screen name="Home" component={HomeScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default Navigators;
