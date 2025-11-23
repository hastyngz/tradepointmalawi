import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useAuth } from '@/src/context/AuthContext';

export default function UserHome({ navigation }: any) {
  const { profile } = useAuth();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome {profile?.email || 'User'}</Text>
      <Button title="Browse Listings" onPress={() => navigation.navigate('Browse')} />
      <View style={{ height: 12 }} />
      <Button title="Profile" onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}

const styles = StyleSheet.create({ container: { flex: 1, padding: 16 }, title: { fontSize: 20, marginBottom: 12 } });
