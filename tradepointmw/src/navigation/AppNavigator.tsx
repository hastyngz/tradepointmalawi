import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '@/src/context/AuthContext';
import LoginScreen from '@/src/screens/auth/LoginScreen';
import SignupScreen from '@/src/screens/auth/SignupScreen';
import RoleSelectionScreen from '@/src/screens/auth/RoleSelectionScreen';
import UserHome from '@/src/screens/user/UserHome';
import TraderHome from '@/src/screens/trader/TraderHome';
import BrowseListings from '@/src/screens/user/BrowseListings';
import ListingDetail from '@/src/screens/user/ListingDetail';
import CreateListing from '@/src/screens/trader/CreateListing';
import ProfileScreen from '@/src/screens/common/ProfileScreen';
import ChatList from '@/src/screens/common/ChatList';
import ChatScreen from '@/src/screens/common/ChatScreen';

const Stack = createNativeStackNavigator();

function AuthStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
      <Stack.Screen name="Role" component={RoleSelectionScreen} />
    </Stack.Navigator>
  );
}

function UserStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="UserHome" component={UserHome} />
      <Stack.Screen name="Browse" component={BrowseListings} />
      <Stack.Screen name="ListingDetail" component={ListingDetail} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="Chats" component={ChatList} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

function TraderStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="TraderHome" component={TraderHome} />
      <Stack.Screen name="CreateListing" component={CreateListing} />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen name="ListingDetail" component={ListingDetail} />
      <Stack.Screen name="Chats" component={ChatList} />
      <Stack.Screen name="Chat" component={ChatScreen} />
    </Stack.Navigator>
  );
}

export default function AppNavigator() {
  const { user, profile, loading } = useAuth();

  if (loading) return null;

  return (
    <NavigationContainer>
      {!user ? (
        <AuthStack />
      ) : profile?.role === 'trader' ? (
        <TraderStack />
      ) : (
        <UserStack />
      )}
    </NavigationContainer>
  );
}
