import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useAuth } from '../context/AuthContext';
import { colors } from '../theme';
import { Ionicons } from '@expo/vector-icons';

import { SignInScreen } from '../screens/auth/SignInScreen';
import { SignUpScreen } from '../screens/auth/SignUpScreen';
import { ForgotPasswordScreen } from '../screens/auth/ForgotPasswordScreen';
import { ChatScreen, HistoryScreen, SettingsScreen } from '../screens';

import type { RootStackParamList, AuthStackParamList, MainTabParamList } from './types';

const RootStack = createNativeStackNavigator<RootStackParamList>();
const AuthStack = createNativeStackNavigator<AuthStackParamList>();
const MainTab = createBottomTabNavigator<MainTabParamList>();

const AuthNavigator = () => (
  <AuthStack.Navigator
    screenOptions={{
      headerShown: false,
      animation: 'fade',
    }}
  >
    <AuthStack.Screen name="SignIn" component={SignInScreen} />
    <AuthStack.Screen name="SignUp" component={SignUpScreen} />
    <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
  </AuthStack.Navigator>
);

const MainNavigator = () => (
  <MainTab.Navigator
    screenOptions={{
      headerShown: false,
      tabBarStyle: {
        backgroundColor: colors.darkPurple,
        borderTopWidth: 1,
        borderTopColor: colors.whiteAlpha[10],
      },
      tabBarActiveTintColor: colors.rebeccaPurple,
      tabBarInactiveTintColor: colors.whiteAlpha[50],
    }}
  >
    <MainTab.Screen
      name="Chat"
      component={ChatScreen}
      options={{
        tabBarLabel: 'Chat',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="chatbubbles-outline" size={size} color={color} />
        ),
      }}
    />
    <MainTab.Screen
      name="History"
      component={HistoryScreen}
      options={{
        tabBarLabel: 'History',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="time-outline" size={size} color={color} />
        ),
      }}
    />
    <MainTab.Screen
      name="Settings"
      component={SettingsScreen}
      options={{
        tabBarLabel: 'Settings',
        tabBarIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
  </MainTab.Navigator>
);

export const AppNavigator = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return null;
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {user ? (
          <RootStack.Screen name="Main" component={MainNavigator} />
        ) : (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};