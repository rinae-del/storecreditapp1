import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/WelcomeScreen';
import SignInScreen from '../screens/SignInScreen';
import RegisterScreen from '../screens/RegisterScreen';
import VerificationScreen from '../screens/VerificationScreen';
import FinalStepScreen from '../screens/FinalStepScreen';
import PasswordResetScreen from '../screens/PasswordResetScreen';
import DashboardScreen from '../screens/dashboard/dashboardScreen';
import MyQRCodeScreen from '../screens/dashboard/MyQrCodeScreen';
import ProfileScreen from '../screens/profile/ProfileScreen';
import AllStorePlacesScreen from '../screens/storeCredit/AllStorePlacesScreen';
import TransactionsScreen from '../screens/transactions/TransactionsScreen';

const Stack = createStackNavigator();

function AppNavigator() {
  return (
    <Stack.Navigator 
      initialRouteName="Welcome"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Verification" component={VerificationScreen} />
      <Stack.Screen name="FinalStep" component={FinalStepScreen} />
      <Stack.Screen name="PasswordReset" component={PasswordResetScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="MyQRCode" component={MyQRCodeScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="AllStoreCredit" component={AllStorePlacesScreen} />
      <Stack.Screen name="Transactions" component={TransactionsScreen} />

    </Stack.Navigator>
  );
}

export default AppNavigator;